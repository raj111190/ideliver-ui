import { fromJS } from 'immutable';
import visitReducer, {
  defaultState,
} from '../../../../js/state/ui/visit/reducers';
import selectVisitAction from '../../../../js/features/visits/actions/selectVisitAction';

describe('visits reducers', () => {
  it('should have an initial state', () => {
    const newState = visitReducer(undefined, {});
    expect(newState).toEqual(fromJS(defaultState));
  });

  it('should set current visit', () => {
    const newState = visitReducer(
      fromJS(defaultState),
      selectVisitAction('123', '456')
    );
    const updatedState = fromJS(defaultState).setIn(['currentVisit'], '123');
    expect(newState).toEqual(updatedState);
  });
});
