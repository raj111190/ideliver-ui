import { fromJS } from 'immutable';
import { SELECT_VISIT_ACTION } from '../../../features/visits/actions/selectVisitAction';

export const defaultState = {
  currentVisit: undefined,
  fetching: false,
};

const visitReducer = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case SELECT_VISIT_ACTION:
      return state
        .setIn(['currentVisit'], fromJS(action.visitUuid))
        .setIn(['fetching'], false);

    default:
      return state;
  }
};

export default visitReducer;
