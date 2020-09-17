import { fromJS } from 'immutable';
import {
  FETCH_FORM_RESOURCE_ACTION,
  FETCH_FORM_RESOURCE_FAIL_ACTION,
  FETCH_FORM_RESOURCE_SUCCESS_ACTION,
  SELECT_FORM_RESOURCE_ACTION,
} from './actions';

export const defaultState = {
  fetching: false,
  formResourceData: {},
  requiredFormFields: {},
  selectedFormResource: undefined,
  selectedFormResourceIndex: 0,
};

const setFormResourceData = (state, action) => {
  const formData = action.formResource;
  return state.set('formResourceData', formData);
};

const formResourceReducer = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case FETCH_FORM_RESOURCE_ACTION:
      return state.setIn(['fetching'], true);
    case FETCH_FORM_RESOURCE_FAIL_ACTION:
      return state.setIn(['fetching'], false);
    case FETCH_FORM_RESOURCE_SUCCESS_ACTION:
      return setFormResourceData(state, action).setIn(['fetching'], false);
    case SELECT_FORM_RESOURCE_ACTION:
      return state
        .set('selectedFormResource', action.formResourceId)
        .set('selectedFormResourceIndex', action.formResourceIndex);
    default:
      return state;
  }
};

export default formResourceReducer;
