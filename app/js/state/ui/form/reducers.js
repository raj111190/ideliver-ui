import { fromJS, Map, List } from 'immutable';
import { isObjectLike } from 'lodash';
import {
  FETCH_FORM_ACTION,
  FETCH_FORM_FAIL_ACTION,
  FETCH_FORM_SUCCESS_ACTION,
  SELECT_FORM_ACTION,
  SET_FORM_DATA_ACTION,
  SUBMIT_FORM_ACTION,
  SUBMIT_FORM_FAILED,
  SUBMIT_FORM_SUCCEEDED,
} from './actions';

export const defaultState = {
  selectedForm: undefined,
  selectedFormIndex: 0,
  fetching: false,
  submitting: false,
  formData: {},
  requiredFormFields: {},
  formFieldToConcept: {},
  formFieldToField: {},
};

const markRequiredFields = (state, action) => {
  const formData = action.form;
  let formRequiredFields = Map();
  if (formData && !formData.retired && formData.formFields) {
    formData.formFields.forEach(ff => {
      const desc = JSON.parse(ff.field.description);
      if (desc.validation.required) {
        formRequiredFields = formRequiredFields.set(
          ff.uuid,
          fromJS(desc.validation.conditions || {})
        );
      }
    });
  }

  let requiredFields = state.get('requiredFormFields');
  requiredFields = requiredFields.set(formData.uuid, formRequiredFields);
  return state.set('requiredFormFields', requiredFields);
};

const setFormData = (state, action) => {
  const listValue =
    action.value && action.value.value ? fromJS(action.value.value) : undefined;
  if (
    List.isList(listValue) &&
    List.isList(listValue.getIn([0, 'groupMembers']))
  ) {
    // lab set
    let mergedValues = state.getIn(
      ['formData', ...action.path, 'value'],
      List()
    );
    listValue.forEach((value, index) => {
      const currentValue = mergedValues.get(index, Map());
      mergedValues = mergedValues.set(index, currentValue.merge(value));
    });
    return state.setIn(['formData', ...action.path, 'value'], mergedValues);
  } else if (!Array.isArray(action.value) && isObjectLike(action.value)) {
    return state.mergeIn(['formData', ...action.path], fromJS(action.value));
  }
  return state.setIn(['formData', ...action.path], fromJS(action.value));
};

const formReducer = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case FETCH_FORM_ACTION:
      return state.setIn(['fetching'], true);
    case FETCH_FORM_FAIL_ACTION:
      return state.setIn(['fetching'], false);
    case FETCH_FORM_SUCCESS_ACTION:
      return markRequiredFields(state, action).setIn(['fetching'], false);
    case SET_FORM_DATA_ACTION:
      return setFormData(state, action);
    case SELECT_FORM_ACTION:
      return state
        .set('selectedForm', action.formId)
        .set('selectedFormIndex', action.formIndex);
    case SUBMIT_FORM_ACTION:
      return state.set('submitting', true);
    case SUBMIT_FORM_SUCCEEDED:
      return state.set('submitting', false);
    case SUBMIT_FORM_FAILED:
      return state.set('submitting', false);

    default:
      return state;
  }
};

export default formReducer;
