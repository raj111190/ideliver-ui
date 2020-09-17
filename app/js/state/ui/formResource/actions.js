/* FETCH AN FORM */
export const FETCH_FORM_RESOURCE_ACTION = 'FETCH_FORM_RESOURCE_ACTION';
export const FETCH_FORM_RESOURCE_SUCCESS_ACTION =
  'FETCH_FORM_RESOURCE_SUCCESS_ACTION';
export const FETCH_FORM_RESOURCE_FAIL_ACTION =
  'FETCH_FORM_RESOURCE_FAIL_ACTION';
export const SELECT_FORM_RESOURCE_ACTION = 'SELECT_FORM_RESOURCE_ACTION';
export const fetchFormResourceAction = (url, uuid) => ({
  type: FETCH_FORM_RESOURCE_ACTION,
  url,
  uuid,
});

export const fetchFormResourceSuccessAction = (uuid, formResource) => ({
  type: FETCH_FORM_RESOURCE_SUCCESS_ACTION,
  uuid,
  formResource,
});

export const fetchFormResourceFailAction = (uuid, error) => ({
  type: FETCH_FORM_RESOURCE_FAIL_ACTION,
  uuid,
  error,
});

export const selectFormResourceAction = (
  formResourceId,
  formResourceIndex
) => ({
  type: SELECT_FORM_RESOURCE_ACTION,
  formResourceId,
  formResourceIndex,
});
