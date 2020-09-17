import { call, put } from 'redux-saga/effects';
import { ATTRIBUTE_REP } from '../../representations';
import { postData } from '../../../api';
import {
  savePatientAttributeFailAction,
  savePatientAttributeSuccessAction,
  savePatientIdentifierFailAction,
  savePatientIdentifierSuccessAction,
  savePatientImageFailAction,
  savePatientImageSuccessAction,
} from './actions';

export const getPatientAttributeUrl = action => {
  const { url: baseUrl, patientAttribute = {}, personUuid } = action;
  const { uuid } = patientAttribute;
  if (uuid) {
    return `${baseUrl}person/${personUuid}/attribute/${uuid}?v=custom:${ATTRIBUTE_REP}`;
  }
  return `${baseUrl}person/${personUuid}/attribute?v=custom:${ATTRIBUTE_REP}`;
};

export const getPatientIdentifierUrl = action => {
  const { url: baseUrl, patientIdentifier = {}, patientUuid } = action;
  const { uuid } = patientIdentifier;
  if (uuid) {
    return `${baseUrl}patient/${patientUuid}/identifier/${uuid}?v=custom:${ATTRIBUTE_REP}`;
  }
  return `${baseUrl}patient/${patientUuid}/identifier?v=custom:${ATTRIBUTE_REP}`;
};

export const getPersonImageUrl = action => {
  const { url: baseUrl, personUuid } = action;
  return `${baseUrl}personimage/${personUuid}`;
};

/**
 * save a patientAttribute
 * @param action the action object
 * @param action.url the server base url
 * @param action.patientAttribute the patientAttribute data to save
 */
export function* savePatientAttribute(action) {
  const { patientAttribute } = action;
  const uuid = patientAttribute ? patientAttribute.uuid : undefined;
  try {
    if (!patientAttribute) {
      throw new Error('Patient Attribute is required');
    }
    const attribute = yield call(
      postData,
      getPatientAttributeUrl(action),
      patientAttribute
    );
    yield put(savePatientAttributeSuccessAction(attribute.uuid, attribute));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(savePatientAttributeFailAction(uuid, errorMessage));
  }
}

/**
 * save a patientIdentifier
 * @param action the action object
 * @param action.url the server base url
 * @param action.patientIdentifier the patientIdentifier data to save
 */
export function* savePatientIdentifier(action) {
  const { patientIdentifier } = action;
  const uuid = patientIdentifier ? patientIdentifier.uuid : undefined;
  try {
    if (!patientIdentifier) {
      throw new Error('Patient Identifier is required');
    }
    const identifier = yield call(
      postData,
      getPatientIdentifierUrl(action),
      patientIdentifier
    );
    yield put(savePatientIdentifierSuccessAction(identifier.uuid, identifier));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(savePatientIdentifierFailAction(uuid, errorMessage));
  }
}

/**
 * save a patientImage
 * @param action the action object
 * @param action.url the server base url
 * @param action.personId the person id
 */
export function* savePatientImage(action) {
  const { personUuid, payload } = action;
  try {
    if (!personUuid) {
      throw new Error('Person uuid is required');
    }
    const imageData = yield call(postData, getPersonImageUrl(action), payload);
    yield put(savePatientImageSuccessAction(personUuid, imageData));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(savePatientImageFailAction(personUuid, errorMessage));
  }
}
