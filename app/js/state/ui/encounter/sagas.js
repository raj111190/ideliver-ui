import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { get } from 'lodash';
import moment from 'moment';
import {
  ENCOUNTER_REP,
  encounterSchema,
  encountersSchema,
} from '../../representations';
import {
  fetchEncounterFailAction,
  fetchEncounterSuccessAction,
  fetchPatientEncountersFailAction,
  fetchPatientEncountersSuccessAction,
  saveEncounterFailAction,
  saveEncounterSuccessAction,
} from './actions';

import { getData, postData } from '../../../api';
import {
  addEntityAction,
  updateEntitiesDataAction,
} from '../../entities/actions';
import { programs, encounterType } from '../../../uuid';
import { fetchEpisodesAction } from '../episode/actions';
import { REST_API_PATHNAME } from '../../../paths';
import { fetchEpisodes } from '../episode/sagas';
import { submitFormFailAction, submitFormSuccessAction } from '../form/actions';
import { saveVisitAction } from '../visit/actions';

export const getEncounterUrl = action => {
  const { url: baseUrl, uuid } = action;
  return `${baseUrl}encounter/${uuid}?v=custom:${ENCOUNTER_REP}`;
};

/**
 * Fetch patient encounters
 * @param action the object describing the action to perform
 * @param action.type the action type
 * @param action.url the server url to sent the request to
 * @param action.uuid the uuid of the encounter
 * @returns
 */
export function* fetchEncounter(action) {
  const { uuid } = action;
  try {
    if (!uuid) {
      throw new Error('Encounter uuid is required');
    }
    const encounter = yield call(getData, getEncounterUrl(action));
    const normalized = normalize({ ...encounter }, encounterSchema);
    yield put(updateEntitiesDataAction(normalized));
    yield put(fetchEncounterSuccessAction(uuid, encounter));
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(fetchEncounterFailAction(uuid, errorMessage));
  }
}

export const getSaveEncounterUrl = action => {
  const { url: baseUrl, encounter = {} } = action;
  const { uuid } = encounter;
  if (uuid) {
    return `${baseUrl}encounter/${uuid}?v=custom:${ENCOUNTER_REP}`;
  }
  return `${baseUrl}encounter?v=custom:${ENCOUNTER_REP}`;
};

/**
 * Save an encounter
 * @param action the object describing the action to perform
 * @param action.type the action type
 * @param action.url the server url to sent the request to
 * @param action.encounter the encounter object to save
 * @returns
 */
export function* saveEncounter(action) {
  const { encounter } = action;
  let episodeAction;
  const { options } = action;
  const encounterUuid = encounter ? encounter.uuid : undefined;
  const isFormSubmission = get(options, ['isFormSubmission'], false);
  try {
    if (!encounter) {
      throw new Error('Encounter is required');
    }
    const savedEncounter = yield call(
      postData,
      getSaveEncounterUrl(action),
      encounter
    );
    const normalized = normalize({ ...savedEncounter }, encounterSchema);
    yield put(updateEntitiesDataAction(normalized));
    const episodeUuid = get(options, ['episodeUuid'], undefined);
    const patientUuid = options.patient
      ? get(options, ['patient'], false)
      : get(options, ['patientUuid'], false);

    // if it's a new encounter that belongs to the episode, add it to the store
    if (!encounterUuid && episodeUuid) {
      yield put(
        addEntityAction(['episodes', episodeUuid, 'encounters'], normalized)
      );
    }
    episodeAction = fetchEpisodesAction(REST_API_PATHNAME, {
      patientUuid,
      programUuid: programs.PREGNANCY_PROGRAM,
    });
    yield call(fetchEpisodes, episodeAction);

    yield put(
      saveEncounterSuccessAction(savedEncounter.uuid, savedEncounter, options)
    );

    if (isFormSubmission) {
      // This is required because we want to re-fetch diagnosis and acuity when
      // data has changed.
      // TODO: Figure out a way to fetch that information without re-fetching
      // the entire episode
      episodeAction = fetchEpisodesAction(REST_API_PATHNAME, {
        patientUuid,
        programUuid: programs.PREGNANCY_PROGRAM,
      });
      yield call(fetchEpisodes, episodeAction);
      yield put(submitFormSuccessAction(savedEncounter));
    }

    if (
      encounter.encounterType === encounterType.REFERRAL_ENCOUNTER_TYPE_UUID &&
      options.onRefer
    ) {
      const stopDatetime = moment.utc().format();
      const visit = { stopDatetime, uuid: encounter.visit };
      yield put(saveVisitAction(REST_API_PATHNAME, visit));
    }
    if (
      encounter.encounterType === encounterType.DISCHARGE_ENCOUNTER_TYPE_UUID &&
      options.onDischarge
    ) {
      const stopDatetime = moment.utc().format();
      const visit = { stopDatetime, uuid: encounter.visit };
      yield put(saveVisitAction(REST_API_PATHNAME, visit));
    }
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(saveEncounterFailAction(encounterUuid, errorMessage));
    if (isFormSubmission) {
      yield put(submitFormFailAction(errorMessage));
    }
  }
}

export const getPatientEncountersUrl = action => {
  const { url: baseUrl, patientUuid } = action;
  return `${baseUrl}encounter?patient=${patientUuid}&v=custom:${ENCOUNTER_REP}`;
};

/**
 * Fetch patient encounters
 * @param action the object describing the action to perform
 * @param action.type the action type
 * @param action.url the server url to sent the request to
 * @param action.patientUuid the uuid of the patient
 * @returns
 */
export function* fetchPatientEncounters(action) {
  const { patientUuid } = action;
  try {
    if (!patientUuid) {
      throw new Error('Patient uuid is required');
    }

    const encounters = yield call(getData, getPatientEncountersUrl(action));
    const { results } = encounters;
    const normalized = normalize(results, encountersSchema);
    yield put(updateEntitiesDataAction(normalized));
    yield put(
      fetchPatientEncountersSuccessAction(patientUuid, normalized.result)
    );
  } catch (e) {
    console.error(e);
    const errorMessage = e.error ? e.error : e.message;
    yield put(fetchPatientEncountersFailAction(patientUuid, errorMessage));
  }
}
