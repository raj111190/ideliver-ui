import { intersection, flatten, get } from 'lodash';
import { SUPPORTED_OPERATORS, form, field } from '../../uuid';
import messages from '../../intl/messages';
import { getUuidsFromUrl } from '../../state/ui/form/selectors';
import { selectFormAction } from '../../state/ui/form/actions';

export const getFormFieldValue = formFieldData => {
  if (formFieldData) {
    if (Array.isArray(formFieldData)) {
      return formFieldData.map(ffd => ffd.value);
    }
    if (formFieldData.value || formFieldData.value === false) {
      return formFieldData.value;
    }
    return formFieldData;
  }
  return undefined;
};

export const getFormFieldUuidOrRawValue = value => {
  if (value && value.uuid) {
    return value.uuid;
  }
  if (Array.isArray(value)) {
    return flatten(
      value.filter(v => !v.voided).map(v => getFormFieldUuidOrRawValue(v))
    );
  }
  return value;
};

const evaluateCondition = (condition, fieldToFormFieldMap, formData) => {
  const { field, operator, value } = condition;
  const formFieldUuid = fieldToFormFieldMap[field];
  const formFieldData = formData[formFieldUuid];
  const formFieldValue = getFormFieldValue(formFieldData);
  const rawValue = getFormFieldUuidOrRawValue(formFieldValue);
  // eslint-disable-next-line eqeqeq
  const isEqual = (a, b) => a == b; // shallow comparison so we don't have to worry about types
  const contains = (a, b) => {
    const aArray = Array.isArray(a) ? a : [a];
    const bArray = Array.isArray(b) ? b : [b];
    const common = intersection(aArray, bArray);
    return common.length > 0;
  };
  const greaterThanOrEqual = (a, b) => a >= b;

  switch (operator) {
    case SUPPORTED_OPERATORS.EQUALS:
      return isEqual(value, rawValue);
    case SUPPORTED_OPERATORS.NOT_EQUALS:
      return !isEqual(value, rawValue);
    case SUPPORTED_OPERATORS.IN:
      return contains(value, rawValue);
    case SUPPORTED_OPERATORS.NOT_IN:
      return !contains(value, rawValue);
    case SUPPORTED_OPERATORS.GREATER_THAN:
      return greaterThanOrEqual(Number(rawValue), Number(value));
    // TODO: handle other operations as needed
    default:
      return true; // default to showing a field instead of hiding it
  }
};

export const shouldFieldBeShown = (
  formField,
  fieldToFormFieldMap,
  formData
) => {
  const { field } = formField;
  const description = JSON.parse(field.description);
  if (description && description.showIf && fieldToFormFieldMap && formData) {
    const conditions = Array.isArray(description.showIf)
      ? description.showIf
      : [description.showIf];
    return conditions.reduce((showField, condition) => {
      return (
        showField && evaluateCondition(condition, fieldToFormFieldMap, formData)
      );
    }, true);
  }
  return true;
};

export const covidValidationForTemperature = (
  formData,
  fieldToFormFieldMap
) => {
  let flag = false;
  const temperatureVal = get(formData, [
    get(fieldToFormFieldMap, [field.COVID_TEMPREATURE_SCREENING_UUID]),
    'value',
  ]);
  if (temperatureVal >= 38) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
};

export const isDerived = formFieldDescription => {
  const description = JSON.parse(formFieldDescription);
  if (description && description.derivedFrom) {
    return true;
  }
  return false;
};

export const getDerivedValue = (
  formFieldDescription,
  formData,
  fieldToFormFieldMap
) => {
  const description = JSON.parse(formFieldDescription);
  if (formData && description && description.derivedFrom) {
    if (description.derivedFrom.sum) {
      const fields = description.derivedFrom.sum;
      const values = fields.map(field =>
        get(formData, [get(fieldToFormFieldMap, [field]), 'value'])
      );
      const getNumericValue = n => (isNaN(n) ? 0 : parseInt(n, 10));
      const sum = values.reduce((a, b) => a + getNumericValue(b), 0);
      return sum === 0 ? '' : sum;
    } // add other operations in else statement
  }
  return '';
};
//Default OpenMRS forms name update in front end side
export const defaultFormNameSet = (propsMetadata, formatMessage) => {
  const propsMetadataName = propsMetadata ? propsMetadata.name : null;
  if (propsMetadata && propsMetadata.uuid) {
    if (form.DISCHARGE_FORM_UUID === propsMetadata.uuid) {
      return formatMessage(messages.postDelivery);
    }
    return propsMetadataName;
  }
  return propsMetadataName;
};

export const redirectToNextForm = (nextFormId, propsInfo, nextFormIndex) => {
  const { visitId, formIndex, patientId } = getUuidsFromUrl(propsInfo);
  const nextFormurl =
    nextFormIndex === undefined
      ? `/client/${visitId}/${patientId}/${nextFormId}`
      : `/client/${visitId}/${patientId}/${nextFormId}/${nextFormIndex}`;
  selectFormAction(nextFormId, nextFormIndex);
  propsInfo.history.push(nextFormurl);
};
