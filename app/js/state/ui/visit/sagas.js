import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { postData } from '../../../api';
import {
  ATTRIBUTE_REP,
  VISIT_REP,
  visitAttributeSchema,
  visitSchema,
} from '../../representations';
import { updateEntitiesDataAction } from '../../entities/actions';
import {
  saveVisitAttributeFailAction,
  saveVisitAttributeSuccessAction,
  saveVisitFailAction,
  saveVisitSuccessAction,
} from './actions';

export const getSaveVisitUrl = action => {
  const { url: baseUrl, visit = {} } = action;
  const { uuid } = visit;
  if (uuid) {
    return `${baseUrl}visit/${uuid}?v=custom:${VISIT_REP}`;
  }
  return `${baseUrl}visit?v=custom:${VISIT_REP}`;
};

/**
 * Save a visit
 * @param action the object describing the action to perform
 * @param action.type the action type
 * @param action.url the server url to sent the request to
 * @param action.visit the visit object to save
 * @returns
 */
export function* saveVisit(action) {
  const { visit } = action;
  const visitUuid = visit ? visit.uuid : undefined;
  try {
    if (!visit) {
      throw new Error('Visit is required');
    }
    const savedVisit = yield call(postData, getSaveVisitUrl(action), visit);
    const normalized = normalize({ ...savedVisit }, visitSchema);
    yield put(updateEntitiesDataAction(normalized));
    yield put(saveVisitSuccessAction(savedVisit.uuid, savedVisit));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(saveVisitFailAction(visitUuid, errorMessage));
  }
}

export const getVisitAttributeUrl = action => {
  const { url: baseUrl, visitAttribute = {}, visitUuid } = action;
  const { uuid } = visitAttribute;
  if (uuid) {
    return `${baseUrl}visit/${visitUuid}/attribute/${uuid}?v=custom:${ATTRIBUTE_REP}`;
  }
  return `${baseUrl}visit/${visitUuid}/attribute?v=custom:${ATTRIBUTE_REP}`;
};

/**
 * save a visitAttribute
 * @param action the action object
 * @param action.url the server base url
 * @param action.visitAttribute the visitAttribute data to save
 */
export function* saveVisitAttribute(action) {
  const { visitAttribute } = action;
  const uuid = visitAttribute ? visitAttribute.uuid : undefined;
  try {
    if (!visitAttribute) {
      throw new Error('Visit Attribute is required');
    }
    const attribute = yield call(
      postData,
      getVisitAttributeUrl(action),
      visitAttribute
    );
    const normalized = normalize({ ...attribute }, visitAttributeSchema);
    yield put(updateEntitiesDataAction(normalized));
    yield put(saveVisitAttributeSuccessAction(attribute.uuid, attribute));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(saveVisitAttributeFailAction(uuid, errorMessage));
  }
}
