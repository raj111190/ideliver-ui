import { fromJS } from 'immutable';
import errorsReducer, {
  defaultState,
} from '../../../js/state/error/errorReducer';
import {
  FETCH_ENCOUNTER_ACTION,
  FETCH_PATIENT_ENCOUNTERS_ACTION,
  fetchEncounterFailAction,
  fetchEncounterSuccessAction,
  fetchPatientEncountersFailAction,
  fetchPatientEncountersSuccessAction,
  SAVE_ENCOUNTER_ACTION,
  saveEncounterFailAction,
} from '../../../js/state/ui/encounter/actions';
import { dismissErrorAction } from '../../../js/state/error/actions';

describe('Error reducers', () => {
  it('should have an initial state', () => {
    const newState = errorsReducer(undefined, {});
    expect(newState).toEqual(fromJS(defaultState));
  });

  it('should handle fetch encounter actions', () => {
    let newState = errorsReducer(
      fromJS(defaultState),
      fetchEncounterFailAction('123', 'test')
    );
    expect(newState).toEqual(
      fromJS([
        { type: FETCH_ENCOUNTER_ACTION, uuid: '123', errorMessage: 'test' },
      ])
    );

    newState = errorsReducer(newState, fetchEncounterSuccessAction('123', {}));
    expect(newState).toEqual(fromJS([]));
  });

  it('should handle fetch patient encounters actions', () => {
    let newState = errorsReducer(
      fromJS(defaultState),
      fetchPatientEncountersFailAction('123', 'test')
    );
    expect(newState).toEqual(
      fromJS([
        {
          type: FETCH_PATIENT_ENCOUNTERS_ACTION,
          uuid: '123',
          errorMessage: 'test',
        },
      ])
    );

    newState = errorsReducer(
      newState,
      fetchPatientEncountersSuccessAction('123', {})
    );
    expect(newState).toEqual(fromJS([]));
  });

  it('should dismiss error', () => {
    let newState = errorsReducer(
      fromJS(defaultState),
      saveEncounterFailAction('123', 'test')
    );
    expect(newState).toEqual(
      fromJS([
        {
          type: SAVE_ENCOUNTER_ACTION,
          uuid: '123',
          errorMessage: 'test',
        },
      ])
    );

    newState = errorsReducer(
      newState,
      dismissErrorAction({
        type: SAVE_ENCOUNTER_ACTION,
        uuid: '123',
        errorMessage: 'test',
      })
    );
    expect(newState).toEqual(fromJS([]));
  });
});
