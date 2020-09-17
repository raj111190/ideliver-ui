import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { get } from 'lodash';
import { OBS_REP, obsSchema } from '../../representations';
import moment from 'moment';
import {
  fetchObservationFailAction,
  fetchObservationSuccessAction,
  saveObservationFailAction,
  saveObservationSuccessAction,
} from './actions';
import { fetchEpisodesAction } from '../episode/actions';
import { fetchEpisodes } from '../episode/sagas';
import { REST_API_PATHNAME } from '../../../paths';
import { getData, postData } from '../../../api';
import { programs, encounterType } from '../../../uuid';
import {
  addEntityAction,
  updateEntitiesDataAction,
} from '../../entities/actions';
import { saveVisitAction } from '../visit/actions';

export const getObservationUrl = action => {
  const { url: baseUrl, uuid } = action;
  return `${baseUrl}obs/${uuid}?v=custom:${OBS_REP}`;
};

/**
 * Fetch an observation
 * @param action the action object
 * @param action.url the server base url
 * @param action.uuid the observation's uuid
 */
export function* fetchObservation(action) {
  const { uuid } = action;
  try {
    if (!uuid) {
      throw new Error('Observation uuid is required');
    }
    const obs = yield call(getData, getObservationUrl(action));
    const normalized = normalize({ ...obs }, obsSchema);
    yield put(updateEntitiesDataAction(normalized));
    yield put(fetchObservationSuccessAction(uuid, obs));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(fetchObservationFailAction(uuid, errorMessage));
  }
}

export const getSaveObservationUrl = action => {
  const { url: baseUrl, observation = {} } = action;
  const { uuid } = observation;
  if (uuid) {
    return `${baseUrl}obs/${uuid}?v=custom:${OBS_REP}`;
  }
  return `${baseUrl}obs?v=custom:${OBS_REP}`;
};

/**
 * save an observation
 * @param action the action object
 * @param action.url the server base url
 * @param action.observation the observation data to save
 */
export function* saveObservation(action) {
  const { observation, options } = action;
  const onRefer = options ? options.onRefer : undefined;
  const onDischarge = options ? options.onDischarge : undefined;
  const obsUuid = observation ? observation.uuid : undefined;
  const episodeUuid = get(options, ['episodeUuid'], undefined);
  const patientUuid = get(options, ['patientUuid'], false);
  try {
    if (!observation) {
      throw new Error('Observation is required');
    }
    const obs = yield call(
      postData,
      getSaveObservationUrl(action),
      observation
    );
    const normalized = normalize({ ...obs }, obsSchema);
    yield put(updateEntitiesDataAction(normalized));
    const encounterUuid =
      get(observation, ['encounter', 'uuid'], undefined) ||
      get(options, 'encounterUuid', undefined);
    // if it's a new observation that belongs to the encounter,
    // add it to the store
    if (!obsUuid && encounterUuid) {
      yield put(
        addEntityAction(['encounters', encounterUuid, 'obs'], normalized)
      );
    }
    const episodeAction = fetchEpisodesAction(REST_API_PATHNAME, {
      patientUuid,
      programUuid: programs.PREGNANCY_PROGRAM,
    });
    yield call(fetchEpisodes, episodeAction);

    if (onRefer !== undefined || onDischarge !== undefined) {
      const stopDatetime = moment.utc().format();
      const visit = { stopDatetime, uuid: options.visitUuid };
      yield put(saveObservationSuccessAction(obs.uuid, obs));
      yield put(saveVisitAction(REST_API_PATHNAME, visit));
    } else {
      yield put(saveObservationSuccessAction(obs.uuid, obs));
    }
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(saveObservationFailAction(obsUuid, errorMessage));
  }
}
