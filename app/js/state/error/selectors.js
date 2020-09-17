import { Map, List } from 'immutable';
import { createSelector } from 'reselect';

export const getErrors = state => state.errors;

const getValidationErrors = errors => {
  return errors
    .map(field => field.map(f => f.get('message')))
    .toList()
    .flatten(true);
};

export const getErrorMessages = createSelector([getErrors], errors => {
  if (!errors) return List();
  return errors.map(error => {
    const errorMessage = error.get('errorMessage');
    let messageText;
    let validationErrors = List();

    if (errorMessage.get('message')) {
      messageText = errorMessage.get('message');
    }

    if (errorMessage.get('fieldErrors')) {
      const fieldErrors = errorMessage.get('fieldErrors');
      const fieldValidationErrors = getValidationErrors(fieldErrors);
      if (fieldValidationErrors && fieldValidationErrors.size) {
        validationErrors = validationErrors.concat(fieldValidationErrors);
      }
    }

    if (errorMessage.get('globalErrors')) {
      const globalErrors = errorMessage.get('globalErrors');
      const globalValidationErrors = getValidationErrors(globalErrors);
      if (globalValidationErrors && globalValidationErrors.size) {
        validationErrors = validationErrors.concat(globalValidationErrors);
      }
    }

    return Map()
      .set('type', error.get('type'))
      .set('uuid', error.get('uuid'))
      .set('errorMessage', messageText)
      .set('errorDescription', validationErrors);
  });
});
