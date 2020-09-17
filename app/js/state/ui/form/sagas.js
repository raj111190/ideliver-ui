import 'regenerator-runtime/runtime';
import moment from 'moment';
import { List, Map } from 'immutable';
import { call, put, select, all } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { pick, isPlainObject } from 'lodash';
import { FORM_REP, formSchema } from '../../representations';
import { getData } from '../../../api';
import { updateEntitiesDataAction } from '../../entities/actions';
import {
  fetchFormFailAction,
  fetchFormSuccessAction,
  setFormDataAction,
  submitFormFailAction,
} from './actions';
import {
  longDatetimeFormat,
  longDatetimeFormatWithT,
} from '../../../components/vcDateTime/vcDateTime';
import {
  getFormData,
  getFormFieldToConcept,
  getFormFieldToField,
  selectFormMetadata,
} from './selectors';
import { getCurrentPatient } from '../patient/selectors';
import { getCurrentVisit, getVisitUuidForEncounter } from '../visit/selectors';
import { saveEncounterAction } from '../encounter/actions';
import { getCurrentEpisodeUuid } from '../episode/selectors';
import {
  location as locationUuids,
  PATIENT_ATTRIBUTES_FIELD_TO_ATTRIBUTE_TYPES,
  PATIENT_IDENTIFIERS_FIELD_TO_IDENTIFIER_TYPES,
} from '../../../uuid';
import {
  savePatientAttributeAction,
  savePatientIdentifierAction,
} from '../patient/actions';

export const getFormUrl = action => {
  const { url: baseUrl, uuid } = action;
  return `${baseUrl}form/${uuid}?v=custom:${FORM_REP}`;
};

const flatten = ary =>
  ary.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const allMembersVoided = values =>
  List.isList(values)
    ? values
        .toJS()
        .map(val => val.voided)
        .reduce((accumulator, currentValue) => accumulator && currentValue)
    : undefined;

function getInvalidFormFields(
  formData,
  formMetadata,
  formFieldToField,
  formFieldToConcept,
  fieldParent,
  uuidToFormfield
) {
  // Check if all required fields have data
  const requiredFormFields =
    formMetadata.get('requiredFormFields') || new Map();
  const invalidFormFields = [];
  const isFFValid = (ff, data, required) => {
    const ffToBeSaved = [...data.keys()];
    const conceptUuid = formFieldToConcept.getIn([ff]);
    const parentUUID = fieldParent.get(conceptUuid);
    let parentValue;
    if (parentUUID) {
      const parent = formData.getIn([uuidToFormfield.get(parentUUID)]);
      parentValue = parent ? parent.get('value') : undefined;
    }
    if (
      ffToBeSaved.indexOf(ff) < 0 ||
      (!data.getIn([ff, 'value']) && !data.getIn([ff, 'groupMembers']))
    ) {
      // if it's child but the parent don't have a value
      if (parentUUID && !parentValue) {
        return true;
      }
      let conditionsOk = true;
      const fieldToFormField = formFieldToField.flip();
      [...required.get(ff).keys()].forEach(condition => {
        if (
          required.getIn([ff, condition]) === true &&
          (ffToBeSaved.indexOf(fieldToFormField.get(condition)) < 0 ||
            (!data.getIn([fieldToFormField.get(condition), 'value']) &&
              !data.getIn([fieldToFormField.get(condition), 'groupMembers'])))
        ) {
          conditionsOk = false;
        }
      });
      return !conditionsOk;
    }
    return true;
  };

  [...requiredFormFields.keys()].forEach(ff => {
    if (!isFFValid(ff, formData, requiredFormFields)) {
      invalidFormFields.push(ff);
    }
  });

  return invalidFormFields;
}

function getFieldParent(formFieldsMetadata, formFieldToConcept) {
  let fieldParent = new Map();
  let uuidToFormfield = new Map();
  formFieldsMetadata.forEach(currentField => {
    const parentID = formFieldToConcept.getIn([
      currentField.getIn(['parent', 'uuid']),
    ]);
    const currentFieldID = formFieldToConcept.getIn([
      currentField.getIn(['uuid']),
    ]);
    uuidToFormfield = uuidToFormfield.set(
      currentFieldID,
      currentField.getIn(['uuid'])
    );
    if (parentID) {
      fieldParent = fieldParent.set(currentFieldID, parentID);
    }
  });

  return { fieldParent, uuidToFormfield };
}

function tryConvertingToDate(
  value,
  from = longDatetimeFormat,
  to = longDatetimeFormat
) {
  const checkDate = moment(value, from, true);
  if (checkDate.isValid()) {
    return moment
      .parseZone(value)
      .utc()
      .format(to);
  }
  return value;
}

function getComment(comment, key) {
  if (!comment) {
    return `{"formField":"${key}"}`;
  }
  return comment.indexOf('formField') > -1
    ? comment
    : `${comment.slice(0, -1)},"formField":"${key}"}`;
}

function getObservationValue(value) {
  if (List.isList(value)) {
    return value;
  }
  return tryConvertingToDate(value);
}

function getGroupMembersObservations(itm) {
  const groupMembers = itm.get('groupMembers').toJS();
  return groupMembers.map(val => {
    let memberValue = val.value;
    if (isPlainObject(memberValue)) {
      memberValue = pick(memberValue, ['uuid', 'display']);
    } else {
      memberValue = tryConvertingToDate(
        memberValue,
        longDatetimeFormatWithT,
        longDatetimeFormat
      );
    }
    return {
      concept: val.concept,
      value: memberValue,
      voided: val.voided,
      obsDatetime: val.obsDatetime,
      uuid: val.memUuid,
    };
  });
}

function getObservationValues(value, conceptUuid) {
  return List.isList(value) // if value is an immutable list put the answers as group members
    ? value.toJS().reduce((filtered, option) => {
        if (!(option.voided && !option.memUuid)) {
          filtered.push({
            concept: conceptUuid,
            value: {
              uuid: option.uuid,
              display: option.display,
            },
            uuid: option.memUuid,
            voided: option.voided,
            obsDatetime: option.obsDatetime,
          });
        }
        return filtered;
      }, [])
    : undefined;
}

function getFormFields(formData) {
  return formData
    .keySeq()
    .filter(
      key =>
        key !== 'lastUpdated' &&
        key !== 'encounterDatetime' &&
        key !== 'encounterUuid' &&
        key !== 'invalidFormFields'
    );
}

export function* saveAttributes(action, attrFields, formData, patient) {
  const identifierActions = attrFields
    .filter(attr =>
      Object.keys(PATIENT_IDENTIFIERS_FIELD_TO_IDENTIFIER_TYPES).includes(attr)
    )
    .map(attr => {
      const data = formData.get(attr);
      return {
        identifier: data.get('value'),
        uuid: data.get('uuid'),
        identifierType: PATIENT_IDENTIFIERS_FIELD_TO_IDENTIFIER_TYPES[attr],
        location: locationUuids.INPATIENT_WARD,
      };
    })
    .map(attr => put(savePatientIdentifierAction(action.url, attr, patient)));

  const attributeActions = attrFields
    .filter(attr =>
      Object.keys(PATIENT_ATTRIBUTES_FIELD_TO_ATTRIBUTE_TYPES).includes(attr)
    )
    .map(attr => {
      const data = formData.get(attr);
      return {
        attributeType: PATIENT_ATTRIBUTES_FIELD_TO_ATTRIBUTE_TYPES[attr],
        uuid: data.get('uuid'),
        value: data.get('value'),
      };
    })
    .map(attr => put(savePatientAttributeAction(action.url, attr, patient)));
  const allActions = [...identifierActions, ...attributeActions];

  if (allActions && allActions.length) {
    yield all(allActions);
  }
}

/**
 * Fetch form
 * @param action the object describing the action to perform
 * @param action.type the action type
 * @param action.url the server url to sent the request to
 * @param action.uuid the uuid of the form
 * @returns
 */
export function* fetchForm(action) {
  const { uuid } = action;
  try {
    if (!uuid) {
      throw new Error('Form uuid is required');
    }
    const form = yield call(getData, getFormUrl(action));
    const normalized = normalize({ ...form }, formSchema);
    yield put(updateEntitiesDataAction(normalized));
    yield put(fetchFormSuccessAction(uuid, form));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(fetchFormFailAction(uuid, errorMessage));
  }
}

/**
 * Submit form.
 * The function was copied from submitFormSaga.
 * It is complex and should be re-factored further to make it easy to read.
 * Generally, transformations should be done by the connected component and the saga
 * receives pre-formatted data to save.
 *
 * This saga reads data from the store directly and does transformations itself.
 *
 * @param action the object describing the action to perform
 * @param action.url the server url to sent the request to
 * @param action.encounterPath the encounter uuid and index as array
 * @param action.encounterTypeId the encounter type
 * @param action.visitId the visit id
 * @param action.fieldsToVoid fields to void
 * @returns
 */
export function* submitForm(action) {
  try {
    const formFieldToConcept = yield select(
      getFormFieldToConcept,
      action.encounterPath[0]
    );
    const formFieldToField = yield select(
      getFormFieldToField,
      action.encounterPath[0]
    );
    const formMetadata = yield select(
      selectFormMetadata,
      action.encounterPath[0]
    );

    let formData = yield select(getFormData, action.encounterPath);
    formData = formData || new Map();

    const formFieldsMetadata = formMetadata.get('formFields');
    const { fieldParent, uuidToFormfield } = getFieldParent(
      formFieldsMetadata,
      formFieldToConcept
    );

    // Check if all required fields have data
    const invalidFormFields = getInvalidFormFields(
      formData,
      formMetadata,
      formFieldToField,
      formFieldToConcept,
      fieldParent,
      uuidToFormfield
    );

    if (invalidFormFields.length > 0) {
      yield put(
        setFormDataAction(
          [...action.encounterPath, 'invalidFormFields'],
          invalidFormFields
        )
      );
      yield put(
        submitFormFailAction(
          `The form it missing required fields: ${invalidFormFields.toString()}`
        )
      );
    } else {
      // No required fields are missing so continue
      const episodeUuid = yield select(getCurrentEpisodeUuid);
      const patientData = yield select(getCurrentPatient);
      const visitData = yield select(getCurrentVisit);
      const patient = patientData.get('uuid');
      const location = visitData.getIn(['location'])
        ? visitData.getIn(['location']).toJS()
        : undefined;
      const encounterUuid = formData.getIn(['encounterUuid']);
      let visitId = yield select(getVisitUuidForEncounter, encounterUuid);
      if (!visitId) {
        visitId = action.visitId;
      }

      const attrFields = [];
      const obs = formData
        ? getFormFields(formData)
            .map(key => {
              const conceptUuid = formFieldToConcept.getIn([key]);
              const fieldUuid = formFieldToField.get(key);
              if (conceptUuid) {
                // the FormField has an associated concept.
                const uuid = formData.getIn([key, 'uuid']);
                const obsTime = formData.getIn([key, 'obsDatetime']);
                const comment = formData.getIn([key, 'comment']);
                const value = getObservationValue(
                  formData.getIn([key, 'value'])
                );

                if (
                  List.isList(value) &&
                  List.isList(value.getIn([0, 'groupMembers']))
                ) {
                  // the FormField has an associated concept
                  // that is a set of other fields with their own values.
                  const result = [];
                  value.forEach(itm => {
                    result.push({
                      concept: conceptUuid,
                      comment: getComment(itm.get('comment'), key),
                      obsDatetime: obsTime,
                      voided:
                        itm.get('voided') ||
                        (!value && value !== false) ||
                        allMembersVoided(itm.getIn(['groupMembers'])) ||
                        action.fieldsToVoid.indexOf(fieldUuid) > -1,
                      uuid: itm.get('uuid'),
                      groupMembers: getGroupMembersObservations(itm),
                    });
                  });

                  return result;
                }
                // If the parent field is turned off,
                // the values in child fields should be voided
                const parentUUID = fieldParent.get(conceptUuid);
                let voidCurrentValue = false;
                if (parentUUID) {
                  const parent = formData.getIn([
                    uuidToFormfield.get(parentUUID),
                  ]);
                  const parentValue = parent ? parent.get('value') : undefined;
                  if (!parentValue) {
                    voidCurrentValue = true;
                  }
                }

                return {
                  concept: conceptUuid,
                  comment: getComment(comment, key),
                  obsDatetime: obsTime,
                  voided:
                    voidCurrentValue ||
                    (!value && value !== false) ||
                    (List.isList(value) && allMembersVoided(value)) ||
                    action.fieldsToVoid.indexOf(fieldUuid) > -1,
                  value: List.isList(value)
                    ? undefined
                    : value || (value === false ? false : undefined),
                  uuid,
                  // if value is an immutable list put
                  // the answers as group members
                  groupMembers: List.isList(value)
                    ? getObservationValues(value, conceptUuid)
                    : undefined,
                };
              }
              // the field doesn't have a concept
              // so it must be one of the attribute fields
              attrFields.push(key);
              return undefined;
            })
            .filter(ob => ob)
        : []; // remove the empty records that went into the attrFields array

      const encDateString = formData.getIn(['encounterDatetime']);
      const encDateTime = encDateString
        ? tryConvertingToDate(
            encDateString,
            longDatetimeFormatWithT,
            longDatetimeFormatWithT
          )
        : undefined;

      const encounter = {
        encounterDatetime: encDateTime,
        encounterType: action.encounterTypeId,
        patient,
        obs: flatten(obs),
        visit: visitId,
        form: action.encounterPath[0],
        location,
        uuid: encounterUuid,
      };

      if (attrFields && attrFields.length) {
        // handle attributes
        yield call(saveAttributes, action, attrFields, formData, patient);
      }

      yield put(
        saveEncounterAction(action.url, encounter, {
          episodeUuid,
          patient,
          isFormSubmission: true,
        })
      );
    }
  } catch (e) {
    console.error(e);
    yield put(submitFormFailAction(e.message));
  }
}
