import { fromJS } from 'immutable';
import {
  FETCH_ENCOUNTER_ACTION,
  FETCH_ENCOUNTER_SUCCESS_ACTION,
  FETCH_PATIENT_ENCOUNTERS_ACTION,
  FETCH_PATIENT_ENCOUNTERS_SUCCESS_ACTION,
} from './actions';

export const defaultState = {
  currentEncounter: undefined,
  patientEncounters: {},
  fetching: false,
};

const encounterReducer = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case FETCH_ENCOUNTER_ACTION:
    case FETCH_PATIENT_ENCOUNTERS_ACTION:
      return state.setIn(['fetching'], true);

    case FETCH_ENCOUNTER_SUCCESS_ACTION:
      return state
        .setIn(['currentEncounter'], action.uuid)
        .setIn(['fetching'], false);

    case FETCH_PATIENT_ENCOUNTERS_SUCCESS_ACTION:
      return state
        .setIn(
          ['patientEncounters', action.patientUuid],
          fromJS(action.encounters)
        )
        .setIn(['fetching'], false);

    default:
      return state;
  }
};

export default encounterReducer;
