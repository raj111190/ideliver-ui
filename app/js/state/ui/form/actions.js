/* FETCH AN FORM */
export const FETCH_FORM_ACTION = 'FETCH_FORM_ACTION';
export const FETCH_FORM_SUCCESS_ACTION = 'FETCH_FORM_SUCCESS_ACTION';
export const FETCH_FORM_FAIL_ACTION = 'FETCH_FORM_FAIL_ACTION';
export const SET_FORM_DATA_ACTION = 'SET_FORM_DATA_ACTION';
export const SELECT_FORM_ACTION = 'SELECT_FORM_ACTION';
export const SUBMIT_FORM_ACTION = 'SUBMIT_FORM_ACTION';
export const SUBMIT_FORM_FAILED = 'SUBMIT_FORM_FAILED';
export const SUBMIT_FORM_SUCCEEDED = 'SUBMIT_FORM_SUCCEEDED';

export const fetchFormAction = (url, uuid) => ({
  type: FETCH_FORM_ACTION,
  url,
  uuid,
});

export const fetchFormSuccessAction = (uuid, form) => ({
  type: FETCH_FORM_SUCCESS_ACTION,
  uuid,
  form,
});

export const fetchFormFailAction = (uuid, error) => ({
  type: FETCH_FORM_FAIL_ACTION,
  uuid,
  error,
});

export const setFormDataAction = (path, value) => ({
  type: SET_FORM_DATA_ACTION,
  path,
  value,
});

export const selectFormAction = (formId, formIndex) => ({
  type: SELECT_FORM_ACTION,
  formId,
  formIndex,
});

export const submitFormAction = (
  url,
  visitId,
  encounterPath,
  encounterTypeId,
  fieldsToVoid
) => ({
  type: SUBMIT_FORM_ACTION,
  url,
  visitId,
  encounterPath,
  encounterTypeId,
  fieldsToVoid: fieldsToVoid || [],
});

export const submitFormFailAction = payload => ({
  type: SUBMIT_FORM_FAILED,
  payload,
});

export const submitFormSuccessAction = payload => ({
  type: SUBMIT_FORM_SUCCEEDED,
  payload,
});
