/* FETCH ENCOUNTERS */
export const FETCH_PATIENT_ENCOUNTERS_ACTION =
  'FETCH_PATIENT_ENCOUNTERS_ACTION';
export const FETCH_PATIENT_ENCOUNTERS_SUCCESS_ACTION =
  'FETCH_PATIENT_ENCOUNTERS_SUCCESS_ACTION';
export const FETCH_PATIENT_ENCOUNTERS_FAIL_ACTION =
  'FETCH_PATIENT_ENCOUNTERS_FAIL_ACTION';

export const fetchPatientEncountersAction = (url, patientUuid) => ({
  type: FETCH_PATIENT_ENCOUNTERS_ACTION,
  url,
  patientUuid,
});

export const fetchPatientEncountersSuccessAction = (
  patientUuid,
  encounters
) => ({
  type: FETCH_PATIENT_ENCOUNTERS_SUCCESS_ACTION,
  patientUuid,
  encounters,
});

export const fetchPatientEncountersFailAction = (patientUuid, error) => ({
  type: FETCH_PATIENT_ENCOUNTERS_FAIL_ACTION,
  patientUuid,
  error,
});

/* FETCH AN ENCOUNTER */
export const FETCH_ENCOUNTER_ACTION = 'FETCH_ENCOUNTER_ACTION';
export const FETCH_ENCOUNTER_SUCCESS_ACTION = 'FETCH_ENCOUNTER_SUCCESS_ACTION';
export const FETCH_ENCOUNTER_FAIL_ACTION = 'FETCH_ENCOUNTER_FAIL_ACTION';

export const fetchEncounterAction = (url, uuid) => ({
  type: FETCH_ENCOUNTER_ACTION,
  url,
  uuid,
});

export const fetchEncounterSuccessAction = (uuid, encounter) => ({
  type: FETCH_ENCOUNTER_SUCCESS_ACTION,
  uuid,
  encounter,
});

export const fetchEncounterFailAction = (uuid, error) => ({
  type: FETCH_ENCOUNTER_FAIL_ACTION,
  uuid,
  error,
});

/* SAVE AN ENCOUNTER */
export const SAVE_ENCOUNTER_ACTION = 'SAVE_ENCOUNTER_ACTION';
export const SAVE_ENCOUNTER_SUCCESS_ACTION = 'SAVE_ENCOUNTER_SUCCESS_ACTION';
export const SAVE_ENCOUNTER_FAIL_ACTION = 'SAVE_ENCOUNTER_FAIL_ACTION';

export const saveEncounterAction = (url, encounter, options) => ({
  type: SAVE_ENCOUNTER_ACTION,
  url,
  encounter,
  options,
});

export const saveEncounterSuccessAction = (uuid, encounter, options) => ({
  type: SAVE_ENCOUNTER_SUCCESS_ACTION,
  uuid,
  encounter,
  options,
});

export const saveEncounterFailAction = (uuid, error) => ({
  type: SAVE_ENCOUNTER_FAIL_ACTION,
  uuid,
  error,
});
