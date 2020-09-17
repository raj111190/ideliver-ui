import { fromJS } from 'immutable';
import {
  TOGGLE_ADD_DIAGNOSIS_ACTION,
  FETCH_OBSERVATION_ACTION,
  FETCH_OBSERVATION_FAIL_ACTION,
  FETCH_OBSERVATION_SUCCESS_ACTION,
  TOGGLE_REMOVE_DIAGNOSIS_ACTION,
  SAVE_OBSERVATION_SUCCESS_ACTION,
} from './actions';
import { helper as obsHelper } from './selectors';
import { conceptClass } from '../../../uuid';
import { SAVE_ENCOUNTER_SUCCESS_ACTION } from '../encounter/actions';

export const defaultState = {
  fetching: false,
  addedDiagnoses: [],
  removedDiagnoses: [],
};

const toggleDiagnosis = (state, action, property) => {
  let diagnoses = state.get(property);
  const index = diagnoses.indexOf(action.conceptUuid);
  if (index !== -1) {
    diagnoses = diagnoses.delete(index);
  } else {
    diagnoses = diagnoses.push(action.conceptUuid);
  }
  return diagnoses;
};

const removeDiagnosis = (state, observation) => {
  const groupMembers = observation.get('groupMembers');
  if (!groupMembers) {
    return state;
  }
  const problem = obsHelper.getDiagnosisProperty(
    groupMembers,
    conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID
  );
  const diagnosisUuid = problem ? problem.getIn(['value', 'uuid']) : problem;
  const addedDiagnoses = state
    .get('addedDiagnoses')
    .filter(uuid => uuid !== diagnosisUuid);
  const removedDiagnoses = state
    .get('removedDiagnoses')
    .filter(uuid => uuid !== diagnosisUuid);
  return state
    .set('addedDiagnoses', addedDiagnoses)
    .set('removedDiagnoses', removedDiagnoses);
};

const removeDiagnoses = (state, encounter) => {
  const observations = encounter.get('obs');
  let newState = state;
  observations.forEach(obs => {
    newState = removeDiagnosis(newState, obs);
  });
  return newState;
};

const observationReducer = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case FETCH_OBSERVATION_ACTION:
      return state.setIn(['fetching'], true);

    case FETCH_OBSERVATION_SUCCESS_ACTION:
    case FETCH_OBSERVATION_FAIL_ACTION:
      return state.setIn(['fetching'], false);
    case SAVE_OBSERVATION_SUCCESS_ACTION:
      return removeDiagnosis(state, fromJS(action.observation)).set(
        'fetching',
        false
      );
    case SAVE_ENCOUNTER_SUCCESS_ACTION:
      return removeDiagnoses(state, fromJS(action.encounter)).set(
        'fetching',
        false
      );

    case TOGGLE_ADD_DIAGNOSIS_ACTION:
      return state.set(
        'addedDiagnoses',
        toggleDiagnosis(state, action, 'addedDiagnoses')
      );

    case TOGGLE_REMOVE_DIAGNOSIS_ACTION:
      return state.set(
        'removedDiagnoses',
        toggleDiagnosis(state, action, 'removedDiagnoses')
      );

    default:
      return state;
  }
};

export default observationReducer;
