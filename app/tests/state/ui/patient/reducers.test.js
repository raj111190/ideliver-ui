import { fromJS } from 'immutable';
import patientReducer, {
  defaultState,
} from '../../../../js/state/ui/patient/reducers';
import selectVisitAction from '../../../../js/features/visits/actions/selectVisitAction';

describe('patient reducers', () => {
  it('should have an initial state', () => {
    const newState = patientReducer(undefined, {});
    expect(newState).toEqual(fromJS(defaultState));
  });

  it('should set current patient', () => {
    const newState = patientReducer(
      fromJS(defaultState),
      selectVisitAction('123', '456')
    );
    const updatedState = fromJS(defaultState).setIn(['currentPatient'], '456');
    expect(newState).toEqual(updatedState);
  });
});
