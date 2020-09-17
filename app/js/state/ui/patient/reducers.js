import { fromJS } from 'immutable';
import { SELECT_VISIT_ACTION } from '../../../features/visits/actions/selectVisitAction';

export const defaultState = {
  currentPatient: undefined,
  fetching: false,
};

const patientReducer = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case SELECT_VISIT_ACTION:
      return state
        .setIn(['currentPatient'], action.patientUuid)
        .setIn(['fetching'], false);

    default:
      return state;
  }
};

export default patientReducer;
