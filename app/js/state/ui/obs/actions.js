/* FETCH AN OBSERVATION */
export const FETCH_OBSERVATION_ACTION = 'FETCH_OBSERVATION_ACTION';
export const FETCH_OBSERVATION_SUCCESS_ACTION =
  'FETCH_OBSERVATION_SUCCESS_ACTION';
export const FETCH_OBSERVATION_FAIL_ACTION = 'FETCH_OBSERVATION_FAIL_ACTION';

export const fetchObservationAction = (url, uuid) => ({
  type: FETCH_OBSERVATION_ACTION,
  url,
  uuid,
});

export const fetchObservationSuccessAction = (uuid, observation) => ({
  type: FETCH_OBSERVATION_SUCCESS_ACTION,
  uuid,
  observation,
});

export const fetchObservationFailAction = (uuid, error) => ({
  type: FETCH_OBSERVATION_FAIL_ACTION,
  uuid,
  error,
});

/* SAVE AN OBSERVATION */
export const SAVE_OBSERVATION_ACTION = 'SAVE_OBSERVATION_ACTION';
export const SAVE_OBSERVATION_SUCCESS_ACTION =
  'SAVE_OBSERVATION_SUCCESS_ACTION';
export const SAVE_OBSERVATION_FAIL_ACTION = 'SAVE_OBSERVATION_FAIL_ACTION';

export const saveObservationAction = (url, observation, options) => ({
  type: SAVE_OBSERVATION_ACTION,
  url,
  observation,
  options,
});

export const saveObservationSuccessAction = (uuid, observation, options) => ({
  type: SAVE_OBSERVATION_SUCCESS_ACTION,
  uuid,
  observation,
  options,
});

export const saveObservationFailAction = (uuid, error) => ({
  type: SAVE_OBSERVATION_FAIL_ACTION,
  uuid,
  error,
});

export const TOGGLE_ADD_DIAGNOSIS_ACTION = 'TOGGLE_ADD_DIAGNOSIS_ACTION';
export const toggleAddDiagnosisAction = conceptUuid => ({
  type: TOGGLE_ADD_DIAGNOSIS_ACTION,
  conceptUuid,
});

export const TOGGLE_REMOVE_DIAGNOSIS_ACTION = 'TOGGLE_REMOVE_DIAGNOSIS_ACTION';
export const toggleRemoveDiagnosisAction = conceptUuid => ({
  type: TOGGLE_REMOVE_DIAGNOSIS_ACTION,
  conceptUuid,
});
