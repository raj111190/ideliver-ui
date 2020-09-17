import { fromJS } from 'immutable';
import { denormalize } from 'normalizr';
import { invert } from 'lodash';
import moment from 'moment';
import { FETCH_EPISODES_SUCCESS_ACTION } from '../episode/actions';
import { getEncountersForEpisode } from '../encounter/selectors';
import { formSchema, obsSchema, patientSchema } from '../../representations';
import {
  datetimeFormat,
  longDatetimeFormat,
} from '../../../components/vcDateTime/vcDateTime';
import {
  allForms,
  concept,
  conceptClass,
  form,
  formField,
  MULTIPLE_ENCOUNTER_FORMS,
  PATIENT_ATTRIBUTES_FIELD_TO_ATTRIBUTE_TYPES,
  PATIENT_IDENTIFIERS_FIELD_TO_IDENTIFIER_TYPES,
} from '../../../uuid';

const selectEncounterObservations = (state, encounter) => {
  const observationUuids = encounter.get('obs');
  return denormalize(observationUuids, [obsSchema], state.entities);
};

const formFieldToConceptUtil = metadata => {
  const result = {};
  let formUuid;
  metadata.forEach(formData => {
    formUuid = formData.get('uuid');
    result[formUuid] = {};
    formData.getIn(['formFields']).forEach(fField => {
      const conceptUuid = fField.getIn(['field', 'concept', 'uuid']);
      const fFieldUuid = fField.getIn(['uuid']);
      if (fFieldUuid) {
        result[formUuid][fFieldUuid] = conceptUuid;
      }
    });
    // Adds the form metadata uuid to the map
    result[formUuid][concept.FORM_METADATA] = concept.FORM_METADATA;
  });
  return result;
};

const conceptToFormFieldUtil = metadata => {
  const conceptToFF = {};
  metadata.forEach(formData => {
    conceptToFF[formData.get('uuid')] = {};
    formData.getIn(['formFields']).forEach(fField => {
      const conceptId = fField.getIn(['field', 'concept', 'uuid']);
      const fFieldId = fField.getIn(['uuid']);
      if (conceptId) {
        conceptToFF[formData.get('uuid')][conceptId] = fFieldId;
      }
    });
  });
  return conceptToFF;
};

const formFieldToFieldUtil = metadata => {
  const ffToField = {};
  metadata.forEach(formData => {
    ffToField[formData.get('uuid')] = {};
    formData.getIn(['formFields']).forEach(fField => {
      const fieldId = fField.getIn(['field', 'uuid']);
      const fFieldId = fField.getIn(['uuid']);
      if (fFieldId) {
        ffToField[formData.get('uuid')][fFieldId] = fieldId;
      }
    });
  });
  return ffToField;
};

const fieldToFormFieldUtil = metadata => {
  const fTofField = {};
  metadata.forEach(formData => {
    fTofField[formData.get('uuid')] = {};
    formData.getIn(['formFields']).forEach(fField => {
      const fieldId = fField.getIn(['field', 'uuid']);
      const fFieldId = fField.getIn(['uuid']);
      if (fFieldId) {
        fTofField[formData.get('uuid')][fieldId] = fFieldId;
      }
    });
  });
  return fTofField;
};

const isiDeliverForm = formUuid => Object.values(allForms).includes(formUuid);

export function getAddressString(person) {
  if (!person) return '';
  let fullAddress = person.getIn(['preferredAddress', 'address1'], '');
  fullAddress += person.getIn(['preferredAddress', 'address2'])
    ? ` ${person.getIn(['preferredAddress', 'address2'], '')}`
    : '';
  fullAddress += person.getIn(['preferredAddress', 'cityVillage'])
    ? `, ${person.getIn(['preferredAddress', 'cityVillage'], '')}`
    : '';
  fullAddress += person.getIn(['preferredAddress', 'stateProvince'])
    ? `, ${person.getIn(['preferredAddress', 'stateProvince'], '')}`
    : '';
  fullAddress += person.getIn(['preferredAddress', 'country'])
    ? `, ${person.getIn(['preferredAddress', 'country'], '')}`
    : '';
  fullAddress += person.getIn(['preferredAddress', 'postalCode'])
    ? `, ${person.getIn(['preferredAddress', 'postalCode'], '')}`
    : '';

  return fullAddress;
}

function addAttributesToForm(patient, formMetadata) {
  const identifiers = patient.get('identifiers');
  const person = patient.get('person');
  const attribute = {};
  const fields = formMetadata
    .get('formFields')
    .filter(
      ff =>
        ff.getIn(['field', 'fieldType', 'uuid']) === concept.DATABASE_ELEMENT
    );
  if (identifiers) {
    // Adding patient identifiers. New identifiers can be adding by updating
    // PATIENT_IDENTIFIERS_FIELD_TO_IDENTIFIER_TYPES
    identifiers.forEach(id => {
      const identifierUuid = id.getIn(['identifierType', 'uuid']);
      if (
        Object.values(PATIENT_IDENTIFIERS_FIELD_TO_IDENTIFIER_TYPES).includes(
          identifierUuid
        )
      ) {
        const identifierFormUuid = invert(
          PATIENT_IDENTIFIERS_FIELD_TO_IDENTIFIER_TYPES
        )[identifierUuid];
        if (fields.find(f => f.get('uuid') === identifierFormUuid)) {
          attribute[identifierFormUuid] = {
            value: id.get('identifier'),
            uuid: id.get('uuid'),
          };
        }
      }
    });
  }

  const attributes = person.get('attributes');
  if (attributes) {
    // Adding patient attributes. New attributes can be adding by updating
    // PATIENT_ATTRIBUTES_FIELD_TO_ATTRIBUTE_TYPES
    attributes.forEach(attr => {
      const attributeUuid = attr.getIn(['attributeType', 'uuid']);
      if (
        Object.values(PATIENT_ATTRIBUTES_FIELD_TO_ATTRIBUTE_TYPES).includes(
          attributeUuid
        )
      ) {
        const attributeFormUuid = invert(
          PATIENT_ATTRIBUTES_FIELD_TO_ATTRIBUTE_TYPES
        )[attributeUuid];
        if (fields.find(f => f.get('uuid') === attributeFormUuid)) {
          attribute[attributeFormUuid] = {
            value: attr.get('value'),
            uuid: attr.get('uuid'),
          };
        }
      }
    });
  }

  if (person) {
    // Adding Address to the General Info Form
    if (fields.find(f => f.get('uuid') === formField.ADDRESS_UUID)) {
      attribute[formField.ADDRESS_UUID] = {
        value: getAddressString(person),
      };
    }
  }
  return attribute;
}

export function addPopulateValueToForm(obsObj, forms, uuid) {
  const postDelData = forms[uuid] ? forms[uuid] : {};
  const populateData = {};
  if (postDelData && !postDelData.encounterUuid) {
    if (
      postDelData[formField.PD_DURATION_PREGNANCY_WEEKS_UUID] === undefined &&
      obsObj[formField.OB_GESTATIONAL_AGE_UUID] !== undefined
    ) {
      populateData[formField.PD_DURATION_PREGNANCY_WEEKS_UUID] = {
        value: obsObj[formField.OB_GESTATIONAL_AGE_UUID].value,
      };
    }
    if (
      postDelData[formField.PD_BABY_WEIGHT_UUID] === undefined &&
      obsObj[formField.LS_BABY_WEIGHT_UUID] !== undefined
    ) {
      populateData[formField.PD_BABY_WEIGHT_UUID] = {
        value: obsObj[formField.LS_BABY_WEIGHT_UUID].value,
      };
    }
    if (
      postDelData[formField.PD_MODE_OF_DELIVERY_UUID] === undefined &&
      obsObj[formField.AS_MODE_OF_DELIVERY_UUID] !== undefined
    ) {
      populateData[formField.PD_MODE_OF_DELIVERY_UUID] = {
        value: obsObj[formField.AS_MODE_OF_DELIVERY_UUID].value,
      };
    }
    if (
      postDelData[formField.PD_RESUSCITATION_UUID] === undefined &&
      obsObj[formField.LS_RESUSCITATION_UUID] !== undefined
    ) {
      populateData[formField.PD_RESUSCITATION_UUID] = {
        value: obsObj[formField.LS_RESUSCITATION_UUID].value,
      };
    }
    return populateData;
  }
  return populateData;
}

const mapEncounterToForm = (state, action, enc, forms = {}) => {
  const formUuid = enc.getIn(['form', 'uuid']);
  if (!isiDeliverForm(formUuid)) {
    return;
  }
  const obsObj = {};
  const obs = selectEncounterObservations(state, enc);
  const formsMetadata = denormalize(
    state.entities.get('forms'),
    [formSchema],
    state.entities
  );

  // Creating metadata for getting formField ID from concept ID
  const conceptToFormField = conceptToFormFieldUtil(formsMetadata);

  obs.forEach(o => {
    const ob = o.toJS();
    let formFieldUuid;
    const conceptUuid = ob.concept.uuid;
    if (ob.concept.datatype.display === 'Datetime') {
      ob.value = `${moment(ob.value)
        .utcOffset(ob.value)
        .format(datetimeFormat)
        .toString()}.000+0000`;
      ob.value = moment(ob.value, longDatetimeFormat, true)
        .local()
        .format(longDatetimeFormat);
    }
    if (ob.comment && ob.comment.indexOf('formField') > -1) {
      // The comment contains the formField uuid
      formFieldUuid = JSON.parse(ob.comment).formField;
    } else if (ob.concept.uuid === concept.FORM_METADATA) {
      // This is a form metadata field
      formFieldUuid = concept.FORM_METADATA;
    } else {
      // No formField in the comment
      formFieldUuid = conceptToFormField[formUuid][ob.concept.uuid];
    }

    if (ob.groupMembers && ob.groupMembers.length > 0) {
      if (ob.concept.conceptClass.uuid === conceptClass.MULTI_SELECT_SET_UUID) {
        obsObj[formFieldUuid] = {
          value: ob.groupMembers.map(mem => ({
            ...mem.value,
            memUuid: mem.uuid,
          })),
          obsDatetime: ob.obsDatetime,
          comment: ob.comment,
          uuid: ob.uuid,
        };
      } else if (formFieldUuid) {
        obsObj[formFieldUuid] = obsObj[formFieldUuid] || {};
        const nestedValue = {
          value: {
            concept: conceptUuid,
            uuid: ob.uuid,
            comment: ob.comment,
            obsDatetime: ob.obsDatetime,
            groupMembers: ob.groupMembers.map(mem => ({
              concept: mem.concept.uuid,
              value:
                mem.concept.datatype.display === 'Datetime' && ob.value
                  ? moment(
                      `${moment(ob.value)
                        .utcOffset(ob.value)
                        .format(datetimeFormat)
                        .toString()}.000+0000`,
                      longDatetimeFormat,
                      true
                    )
                      .local()
                      .format(longDatetimeFormat)
                  : mem.value,
              memUuid: mem.uuid,
              uuid: mem.uuid,
            })),
          },
        };
        obsObj[formFieldUuid].value = obsObj[formFieldUuid].value || [];
        obsObj[formFieldUuid].value.push(nestedValue.value);
      }
    } else {
      obsObj[formFieldUuid] =
        ob.value && ob.value.uuid === concept.true
          ? {
              value: true,
              obsDatetime: ob.obsDatetime,
              comment: ob.comment,
              uuid: ob.uuid,
            }
          : ob.value && ob.value.uuid === concept.false
          ? {
              value: false,
              obsDatetime: ob.obsDatetime,
              comment: ob.comment,
              uuid: ob.uuid,
            }
          : {
              value: ob.value,
              obsDatetime: ob.obsDatetime,
              comment: ob.comment,
              uuid: ob.uuid,
            };
    }
  });
  obsObj.lastUpdated =
    enc.getIn(['auditInfo', 'dateChanged']) ||
    enc.getIn(['auditInfo', 'dateCreated']);
  obsObj.encounterUuid = enc.get('uuid');
  obsObj.encounterDatetime = enc.get('encounterDatetime');
  if (MULTIPLE_ENCOUNTER_FORMS.includes(formUuid)) {
    if (!forms[formUuid]) {
      forms[formUuid] = [];
    }
    forms[formUuid].push(obsObj);
  } else {
    forms[formUuid] = obsObj;
  }

  // add form data that's not coming from the encounter
  formsMetadata.keySeq().forEach(uuid => {
    if (uuid === form.GENERAL_INFO_FORM_UUID) {
      const formMetaData = formsMetadata.get(uuid);
      const patientUuid = enc.get('patient');
      const patient = state.entities.getIn(['patients', patientUuid]);
      if (patient) {
        const denormalizedPatient = denormalize(
          patient,
          patientSchema,
          state.entities
        );
        const attributes = addAttributesToForm(
          denormalizedPatient,
          formMetaData
        );
        forms[uuid] = { ...forms[uuid], ...attributes };
      }
    }
  });
  // Populate data in Post Delivery form that's coming from the encounter
  formsMetadata.keySeq().forEach(uuid => {
    if (uuid === form.DISCHARGE_FORM_UUID) {
      const populateData = addPopulateValueToForm(obsObj, forms, uuid);
      forms[uuid] = { ...forms[uuid], ...populateData };
    }
  });
};

const mapFormsToEncounters = (state, action) => {
  const encounters = getEncountersForEpisode(state);
  const forms = {};
  encounters.forEach(encounter => {
    mapEncounterToForm(state, action, encounter, forms);
  });

  const formsMetadata = denormalize(
    state.entities.get('forms'),
    [formSchema],
    state.entities
  );

  // Creating metadata for getting concept ID from formField ID
  const formFieldToConcept = formFieldToConceptUtil(formsMetadata);
  // Creating metadata for getting concept ID from formField ID
  const formFieldToField = formFieldToFieldUtil(formsMetadata);
  const fieldToFormField = fieldToFormFieldUtil(formsMetadata);

  allPncFormDataSorting(forms);
  allVitalFormDataSorting(forms);

  const formState = state.ui.form
    .set('formData', fromJS(forms))
    .set('formFieldToConcept', fromJS(formFieldToConcept))
    .set('formFieldToField', fromJS(formFieldToField))
    .set('fieldToFormField', fromJS(fieldToFormField));

  const newState = {
    ...state,
    ui: {
      ...state.ui,
      form: formState,
    },
  };
  return newState;
};

const formCrossSliceReducer = (state, action) => {
  switch (action.type) {
    case FETCH_EPISODES_SUCCESS_ACTION:
      return mapFormsToEncounters(state, action);
    default:
      return state;
  }
};
//PNC forms sorting
export const allPncFormDataSorting = forms => {
  if (forms && forms[form.PNC_FORM_UUID]) {
    return forms[form.PNC_FORM_UUID].sort(function(a, b) {
      return new Date(a.encounterDatetime) - new Date(b.encounterDatetime);
    });
  }
  return forms;
};
//VITALS forms sorting
export const allVitalFormDataSorting = forms => {
  if (
    forms &&
    forms[form.VITALS_FORM_UUID] &&
    forms[form.VITALS_FORM_UUID].length > 1
  ) {
    return forms[form.VITALS_FORM_UUID].sort(function(a, b) {
      return new Date(a.encounterDatetime) - new Date(b.encounterDatetime);
    });
  }
  return forms;
};
export default formCrossSliceReducer;
