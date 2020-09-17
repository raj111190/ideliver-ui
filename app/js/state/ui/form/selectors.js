import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import { getEntities, getForms } from '../../entities/selectors';
import { formSchema } from '../../representations';
import { MENU_STATUS } from '../../../features/clientSidebar/clientSidebar';
import { form, formField } from '../../../uuid';

export const getSelectedFormUuid = state => state.ui.form.get('selectedForm');
export const getSelectedFormIndex = state =>
  state.ui.form.get('selectedFormIndex');
export const isSubmitting = state => state.ui.form.get('submitting');

export const getFormData = (state, formPath) =>
  state.ui.form ? state.ui.form.getIn(['formData', ...formPath]) : undefined;

export const getAllFormData = state => state.ui.form.get('formData');

export const getSelectedFormPath = createSelector(
  [getSelectedFormUuid, getSelectedFormIndex],
  (formUuid, formIndex) => {
    if (!formUuid) return [];
    return formIndex === undefined ? [formUuid] : [formUuid, formIndex];
  }
);

export const getSelectedFormData = createSelector(
  [getAllFormData, getSelectedFormPath],
  (formData, formPath) => {
    if (!formData || !formPath) return undefined;
    return formData.getIn(formPath);
  }
);

export const getAllSelectedFormData = createSelector(
  [getAllFormData, getSelectedFormUuid],
  (formData, formUuid) => {
    if (!formUuid) return [];
    return formData.getIn([formUuid]);
  }
);

export const getSelectedForm = createSelector(
  [getForms, getSelectedFormUuid],
  (forms, selectedFormUuid) => {
    if (!forms || !selectedFormUuid) return undefined;
    return forms.get(selectedFormUuid);
  }
);

export const getRequiredField = (state, formUUid) =>
  state.ui.form.getIn(['requiredFormFields', formUUid]);

export const getRequiredFields = state =>
  state.ui.form.getIn(['requiredFormFields']);

export const getFormFieldToConcepts = state =>
  state.ui.form.getIn(['formFieldToConcept']);

export const getFormFieldToConcept = (state, formUuid) =>
  state.ui.form
    ? state.ui.form.getIn(['formFieldToConcept', formUuid])
    : undefined;

export const getFormFieldToFields = state =>
  state.ui.form.getIn(['formFieldToField']);

export const getFormFieldToField = (state, formUuid) =>
  state.ui.form
    ? state.ui.form.getIn(['formFieldToField', formUuid])
    : undefined;

export const getFieldToFormFields = state =>
  state.ui.form.getIn(['fieldToFormField']);

export const getFieldToFormField = (state, formUuid) =>
  state.ui.form
    ? state.ui.form.getIn(['fieldToFormField', formUuid])
    : undefined;

export const getRequiredFieldsForSelectedForm = createSelector(
  [getRequiredFields, getSelectedFormUuid],
  (requiredFields, selectedFormUuid) => {
    if (!requiredFields || !selectedFormUuid) return undefined;
    return requiredFields.get(selectedFormUuid);
  }
);

export const getFormFieldToFormFieldForSelectedForm = createSelector(
  [getFieldToFormFields, getSelectedFormUuid],
  (fieldToFormFields, selectedFormUuid) => {
    if (!fieldToFormFields || !selectedFormUuid) return undefined;
    return fieldToFormFields.get(selectedFormUuid);
  }
);

export const getFormStatus = (state, formPath) => {
  const path = Array.isArray(formPath) ? formPath : [formPath];
  const formData = getFormData(state, path);
  const selectedFormPath = getSelectedFormPath(state);
  if (
    selectedFormPath &&
    path &&
    selectedFormPath.join(',') === path.join(',')
  ) {
    return MENU_STATUS.STARTED;
  }
  if (!formData) {
    return MENU_STATUS.NOT_STARTED;
  }
  return MENU_STATUS.COMPLETED;
};

export const selectFormMetadata = (state, formUuid) => {
  const forms = getForms(state);
  const entities = getEntities(state);
  if (!forms || !entities) return undefined;
  const formMeta = forms.get(formUuid);
  let denormalized = denormalize(formMeta, formSchema, entities);
  const requiredFields = getRequiredField(state, formUuid);
  const fieldToFormField = getFieldToFormField(state, formUuid);
  denormalized = Map(denormalized)
    .set('requiredFormFields', requiredFields)
    .set('fieldToFormFields', fieldToFormField);

  return denormalized;
};

export const getSelectedFormMetaData = createSelector(
  [
    getEntities,
    getSelectedForm,
    getRequiredFieldsForSelectedForm,
    getFormFieldToFormFieldForSelectedForm,
  ],
  (entities, selectedForm, requiredFields, fieldToFormField) => {
    if (!entities || !selectedForm) return undefined;
    let denormalized = denormalize(selectedForm, formSchema, entities);
    denormalized = Map(denormalized)
      .set('requiredFormFields', requiredFields)
      .set('fieldToFormFields', fieldToFormField);
    return denormalized;
  }
);

export const getUuidsFromUrl = props => {
  const urlParts = props.location.pathname.split('/');
  const visitId = urlParts.length > 2 ? urlParts[2] : undefined;
  const patientId = urlParts.length > 3 ? urlParts[3] : undefined;
  const formId = urlParts.length > 4 ? urlParts[4] : undefined;
  const formIndex = urlParts.length > 5 ? +urlParts[5] : undefined;
  return {
    visitId,
    patientId,
    formId,
    formIndex,
  };
};

export const getGeneralInfoData = state =>
  getFormData(state, [form.GENERAL_INFO_FORM_UUID]);

export const getOBHistoryData = state =>
  getFormData(state, [form.OB_HISTORY_FORM_UUID]);

export const getRiskfactors = createSelector([getOBHistoryData], obHistory => {
  if (!obHistory) return [];
  const existingConditions = obHistory.get(formField.EXISTING_CONDITIONS_UUID);
  if (!existingConditions) return [];
  return existingConditions
    .get('value')
    .map(condition => condition.get('display'));
});
