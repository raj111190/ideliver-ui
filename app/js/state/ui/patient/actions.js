/* SAVE AN PERSON_ATTRIBUTE */

export const SAVE_PATIENT_ATTRIBUTE_ACTION = 'SAVE_PATIENT_ATTRIBUTE_ACTION';
export const SAVE_PATIENT_ATTRIBUTE_SUCCESS_ACTION =
  'SAVE_PATIENT_ATTRIBUTE_SUCCESS_ACTION';
export const SAVE_PATIENT_ATTRIBUTE_FAIL_ACTION =
  'SAVE_PATIENT_ATTRIBUTE_FAIL_ACTION';

export const SAVE_PATIENT_IDENTIFIER_ACTION = 'SAVE_PATIENT_IDENTIFIER_ACTION';
export const SAVE_PATIENT_IDENTIFIER_SUCCESS_ACTION =
  'SAVE_PATIENT_IDENTIFIER_SUCCESS_ACTION';
export const SAVE_PATIENT_IDENTIFIER_FAIL_ACTION =
  'SAVE_PATIENT_IDENTIFIER_FAIL_ACTION';

export const SAVE_PATIENT_IMAGE_ACTION = 'SAVE_PATIENT_IMAGE_ACTION';
export const SAVE_PATIENT_IMAGE_SUCCESS_ACTION =
  'SAVE_PATIENT_IMAGE_SUCCESS_ACTION';
export const SAVE_PATIENT_IMAGE_FAIL_ACTION = 'SAVE_PATIENT_IMAGE_FAIL_ACTION';

export const savePatientAttributeAction = (
  url,
  patientAttribute,
  personUuid
) => ({
  type: SAVE_PATIENT_ATTRIBUTE_ACTION,
  url,
  patientAttribute,
  personUuid,
});

export const savePatientAttributeSuccessAction = (
  uuid,
  patientAttribute,
  personUuid
) => ({
  type: SAVE_PATIENT_ATTRIBUTE_SUCCESS_ACTION,
  uuid,
  patientAttribute,
  personUuid,
});

export const savePatientAttributeFailAction = (uuid, error) => ({
  type: SAVE_PATIENT_ATTRIBUTE_FAIL_ACTION,
  uuid,
  error,
});

export const savePatientIdentifierAction = (
  url,
  patientIdentifier,
  patientUuid
) => ({
  type: SAVE_PATIENT_IDENTIFIER_ACTION,
  url,
  patientIdentifier,
  patientUuid,
});

export const savePatientIdentifierSuccessAction = (
  uuid,
  patientIdentifier,
  patientUuid
) => ({
  type: SAVE_PATIENT_IDENTIFIER_SUCCESS_ACTION,
  uuid,
  patientIdentifier,
  patientUuid,
});

export const savePatientIdentifierFailAction = (uuid, error) => ({
  type: SAVE_PATIENT_IDENTIFIER_FAIL_ACTION,
  uuid,
  error,
});

export const savePatientImageAction = (url, personUuid, payload) => ({
  type: SAVE_PATIENT_IMAGE_ACTION,
  url,
  personUuid,
  payload,
});

export const savePatientImageSuccessAction = (personUuid, payload) => ({
  type: SAVE_PATIENT_IMAGE_SUCCESS_ACTION,
  personUuid,
  payload,
});

export const savePatientImageFailAction = (personUuid, error) => ({
  type: SAVE_PATIENT_IMAGE_FAIL_ACTION,
  personUuid,
  error,
});
