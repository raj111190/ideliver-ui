import 'regenerator-runtime/runtime';
import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { FORM_RESOURCE, formResourceSchema } from '../../representations';
import { getData } from '../../../api';
import { updateEntitiesDataAction } from '../../entities/actions';
import {
  fetchFormResourceFailAction,
  fetchFormResourceSuccessAction,
} from './actions';

export const getFormResourceUrl = action => {
  const { url: baseUrl, uuid } = action;
  return `${baseUrl}form/${uuid}/resource`;
};

/**
 * Fetch form
 * @param action the object describing the action to perform
 * @param action.type the action type
 * @param action.url the server url to sent the request to
 * @param action.uuid the uuid of the form
 * @returns
 */
export function* fetchFormResource(action) {
  const { uuid } = action;
  try {
    if (!uuid) {
      throw new Error('FormResource uuid is required');
    }
    const formResource = yield call(getData, getFormResourceUrl(action));
    const normalized = normalize(
      { ...formResource.results[0] },
      formResourceSchema
    );
    yield put(updateEntitiesDataAction(normalized));
    yield put(fetchFormResourceSuccessAction(uuid, formResource));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(fetchFormResourceFailAction(uuid, errorMessage));
  }
}
