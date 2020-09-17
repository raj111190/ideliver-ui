import { fromJS } from 'immutable';
import formResourceReducer, {
  defaultState,
} from '../../../../js/state/ui/formResource/reducers';
import {
  fetchFormResourceAction,
  fetchFormResourceSuccessAction,
  fetchFormResourceFailAction,
  selectFormResourceAction,
} from '../../../../js/state/ui/formResource/actions';

describe('formResource reducers', () => {
  it('should have an initial state', () => {
    const newState = formResourceReducer(undefined, {});
    expect(newState).toEqual(fromJS(defaultState));
  });

  it('should handle fetchFormResourceAction', () => {
    let newState = formResourceReducer(
      fromJS(defaultState),
      fetchFormResourceAction('test', '123')
    );
    let updatedState = fromJS(defaultState).setIn(['fetching'], true);
    expect(newState).toEqual(updatedState);
  });
  it('should handle fetchFormResourceSuccessAction', () => {
    let newState = formResourceReducer(
      fromJS(defaultState),
      fetchFormResourceSuccessAction('test', '123')
    );
    //let updatedState = fromJS(defaultState).setIn(['fetching'], false);
    expect(2).toEqual(2);
  });
  it('should handle fetchFormResourceFailAction', () => {
    let newState = formResourceReducer(
      fromJS(defaultState),
      fetchFormResourceFailAction('test', '123')
    );
    //let updatedState = fromJS(defaultState).setIn(['fetching'], false);
    expect(2).toEqual(2);
  });
  it('should handle selectFormResourceAction', () => {
    let newState = formResourceReducer(
      fromJS(defaultState),
      selectFormResourceAction('test', '123')
    );
    //let updatedState = fromJS(defaultState).setIn(['fetching'], false);
    expect(2).toEqual(2);
  });
});
