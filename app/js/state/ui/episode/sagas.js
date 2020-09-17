import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { getData } from '../../../api';
import { EPISODE_REP, episodesSchema } from '../../representations';
import { updateEntitiesDataAction } from '../../entities/actions';
import { fetchEpisodesFailAction, fetchEpisodesSuccessAction } from './actions';

export const getEpisodeUrl = action => {
  const {
    url: baseUrl,
    query: { patientUuid, programUuid },
  } = action;
  return `${baseUrl}episode/episode?patient=${patientUuid}&program=${programUuid}&v=custom:${EPISODE_REP}`;
};

/**
 * Fetch episode
 * @param action the object describing the action to perform
 * @param action.type the action type
 * @param action.url the server url to sent the request to
 * @param action.query.patientUuid the uuid of the patient
 * @param action.query.programUuid the uuid of the program
 * @returns
 */
export function* fetchEpisodes(action) {
  const { query: { patientUuid, programUuid } = {} } = action;

  try {
    if (!patientUuid || !programUuid) {
      throw new Error('Patient uuid and program uuid are required');
    }
    const episodes = yield call(getData, getEpisodeUrl(action));
    const normalized = normalize(episodes.results, episodesSchema);
    yield put(updateEntitiesDataAction(normalized));
    yield put(fetchEpisodesSuccessAction(normalized.result));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(fetchEpisodesFailAction(errorMessage));
  }
}
