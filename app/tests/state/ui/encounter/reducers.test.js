import { fromJS } from 'immutable';
import encounterReducer, {
  defaultState,
} from '../../../../js/state/ui/encounter/reducers';
import {
  fetchEncounterAction,
  fetchEncounterSuccessAction,
  fetchPatientEncountersAction,
  fetchPatientEncountersSuccessAction,
} from '../../../../js/state/ui/encounter/actions';

describe('Encounter reducers', () => {
  it('should have an initial state', () => {
    const newState = encounterReducer(undefined, {});
    expect(newState).toEqual(fromJS(defaultState));
  });

  it('should handle fetch encounter', () => {
    let newState = encounterReducer(
      fromJS(defaultState),
      fetchEncounterAction('test', '123')
    );
    let updatedState = fromJS(defaultState).setIn(['fetching'], true);
    expect(newState).toEqual(updatedState);

    newState = encounterReducer(
      fromJS(defaultState),
      fetchPatientEncountersAction('test', '123')
    );
    updatedState = fromJS(defaultState).setIn(['fetching'], true);
    expect(newState).toEqual(updatedState);
  });

  it('should handle fetch encounter success action', () => {
    const newState = encounterReducer(
      fromJS(defaultState),
      fetchEncounterSuccessAction('123', {})
    );
    const expectedState = fromJS(defaultState)
      .setIn(['currentEncounter'], '123')
      .setIn(['fetching'], false);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch patient encounter success action', () => {
    const newState = encounterReducer(
      fromJS(defaultState),
      fetchPatientEncountersSuccessAction('123', [1, 2, 3, 4])
    );
    const expectedState = fromJS(defaultState)
      .setIn(['patientEncounters', '123'], fromJS([1, 2, 3, 4]))
      .setIn(['fetching'], false);
    expect(newState).toEqual(expectedState);
  });
});
