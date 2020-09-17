export const SAVE_VISIT_ACTION = 'SAVE_VISIT_ACTION';
export const SAVE_VISIT_SUCCESS_ACTION = 'SAVE_VISIT_SUCCESS_ACTION';
export const SAVE_VISIT_FAIL_ACTION = 'SAVE_VISIT_FAIL_ACTION';
export const SAVE_VISIT_ATTRIBUTE_ACTION = 'SAVE_VISIT_ATTRIBUTE_ACTION';
export const SAVE_VISIT_ATTRIBUTE_FAIL_ACTION =
  'SAVE_VISIT_ATTRIBUTE_FAIL_ACTION';
export const SAVE_VISIT_ATTRIBUTE_SUCCESS_ACTION =
  'SAVE_VISIT_ATTRIBUTE_SUCCESS_ACTION';

export const saveVisitAction = (url, visit) => ({
  type: SAVE_VISIT_ACTION,
  url,
  visit,
});

export const saveVisitSuccessAction = (uuid, visit) => ({
  type: SAVE_VISIT_SUCCESS_ACTION,
  uuid,
  visit,
});

export const saveVisitFailAction = (uuid, error) => ({
  type: SAVE_VISIT_FAIL_ACTION,
  uuid,
  error,
});

export const saveVisitAttributeAction = (url, visitAttribute, visitUuid) => ({
  type: SAVE_VISIT_ATTRIBUTE_ACTION,
  url,
  visitAttribute,
  visitUuid,
});

export const saveVisitAttributeSuccessAction = (
  uuid,
  visitAttribute,
  visitUuid
) => ({
  type: SAVE_VISIT_ATTRIBUTE_SUCCESS_ACTION,
  uuid,
  visitAttribute,
  visitUuid,
});

export const saveVisitAttributeFailAction = (uuid, error) => ({
  type: SAVE_VISIT_ATTRIBUTE_FAIL_ACTION,
  uuid,
  error,
});
