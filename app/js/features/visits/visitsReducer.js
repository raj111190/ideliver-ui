import { fromJS } from 'immutable';
import { FETCH_VISITS_SUCCEEDED } from './actions/fetchVisitsSuccessAction';
import { FETCH_VISITS_FAILED } from './actions/fetchVisitsFailAction';
import {
  SUBMIT_FORM_ACTION,
  SUBMIT_FORM_FAILED,
  SUBMIT_FORM_SUCCEEDED,
} from '../../state/ui/form/actions';

const visitsReducer = (
  state = fromJS({
    list: [],
    validation: [],
    data: {},
    metadata: {},
    submittingForm: false,
  }),
  action
) => {
  switch (action.type) {
    case FETCH_VISITS_SUCCEEDED:
      return state.setIn(['list'], fromJS(action.payload));

    case FETCH_VISITS_FAILED:
      return state.setIn(['validation'], fromJS(action.payload));

    case SUBMIT_FORM_ACTION:
      return state.set('submittingForm', true);

    case SUBMIT_FORM_SUCCEEDED:
      return state.set('submittingForm', false);

    case SUBMIT_FORM_FAILED:
      return state.set('submittingForm', false);

    default:
      return state;
  }
};

export default visitsReducer;
