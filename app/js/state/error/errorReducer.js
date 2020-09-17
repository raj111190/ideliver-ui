import { fromJS } from 'immutable';
import {
  FETCH_ENCOUNTER_ACTION,
  FETCH_ENCOUNTER_FAIL_ACTION,
  FETCH_ENCOUNTER_SUCCESS_ACTION,
  FETCH_PATIENT_ENCOUNTERS_ACTION,
  FETCH_PATIENT_ENCOUNTERS_FAIL_ACTION,
  FETCH_PATIENT_ENCOUNTERS_SUCCESS_ACTION,
  SAVE_ENCOUNTER_ACTION,
  SAVE_ENCOUNTER_FAIL_ACTION,
  SAVE_ENCOUNTER_SUCCESS_ACTION,
} from '../ui/encounter/actions';
import {
  SAVE_PATIENT_ATTRIBUTE_ACTION,
  SAVE_PATIENT_ATTRIBUTE_FAIL_ACTION,
  SAVE_PATIENT_ATTRIBUTE_SUCCESS_ACTION,
  SAVE_PATIENT_IDENTIFIER_ACTION,
  SAVE_PATIENT_IDENTIFIER_FAIL_ACTION,
  SAVE_PATIENT_IDENTIFIER_SUCCESS_ACTION,
} from '../ui/patient/actions';
import { DISMISS_ERROR_ACTION } from './actions';

export const defaultState = [];

const addErrorForEntity = (state, { type, errorMessage, uuid }) => {
  const error = {
    type,
    uuid,
    errorMessage,
  };
  return state.push(fromJS(error));
};

const removeErrorForEntity = (state, { type, uuid }) => {
  return state.filter(
    error => error.get('type') !== type || error.get('uuid') !== uuid
  );
};

/**
 * Global error handling reducer.
 * It stores errors that occurred when an action fails
 * and clears the error when the same action succeeds.
 * @param state the error state slice
 * @param action the action that occurred
 * @param action.type the action type
 * @param action.error the error that occurred
 * @return {any}
 */
const errorsReducer = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case DISMISS_ERROR_ACTION:
      return removeErrorForEntity(state, {
        type: action.message.type,
        uuid: action.message.uuid,
      });
    case FETCH_ENCOUNTER_SUCCESS_ACTION:
      return removeErrorForEntity(state, {
        type: FETCH_ENCOUNTER_ACTION,
        uuid: action.uuid,
      });

    case FETCH_ENCOUNTER_FAIL_ACTION:
      return addErrorForEntity(state, {
        type: FETCH_ENCOUNTER_ACTION,
        errorMessage: action.error,
        uuid: action.uuid,
      });

    case SAVE_ENCOUNTER_SUCCESS_ACTION:
      return removeErrorForEntity(state, {
        type: SAVE_ENCOUNTER_ACTION,
        uuid: action.uuid,
      });

    case SAVE_ENCOUNTER_FAIL_ACTION:
      return addErrorForEntity(state, {
        type: SAVE_ENCOUNTER_ACTION,
        errorMessage: action.error,
        uuid: action.uuid,
      });

    case FETCH_PATIENT_ENCOUNTERS_SUCCESS_ACTION:
      return removeErrorForEntity(state, {
        type: FETCH_PATIENT_ENCOUNTERS_ACTION,
        uuid: action.patientUuid,
      });
    case FETCH_PATIENT_ENCOUNTERS_FAIL_ACTION:
      return addErrorForEntity(state, {
        type: FETCH_PATIENT_ENCOUNTERS_ACTION,
        errorMessage: action.error,
        uuid: action.patientUuid,
      });

    case SAVE_PATIENT_IDENTIFIER_FAIL_ACTION:
      return addErrorForEntity(state, {
        type: SAVE_PATIENT_IDENTIFIER_ACTION,
        errorMessage: action.error,
        uuid: action.uuid,
      });
    case SAVE_PATIENT_IDENTIFIER_SUCCESS_ACTION:
      return removeErrorForEntity(state, {
        type: SAVE_PATIENT_IDENTIFIER_ACTION,
        uuid: action.uuid,
      });
    case SAVE_PATIENT_ATTRIBUTE_FAIL_ACTION:
      return addErrorForEntity(state, {
        type: SAVE_PATIENT_ATTRIBUTE_ACTION,
        errorMessage: action.error,
        uuid: action.uuid,
      });
    case SAVE_PATIENT_ATTRIBUTE_SUCCESS_ACTION:
      return removeErrorForEntity(state, {
        type: SAVE_PATIENT_ATTRIBUTE_ACTION,
        uuid: action.uuid,
      });

    default:
      return state;
  }
};

export default errorsReducer;
