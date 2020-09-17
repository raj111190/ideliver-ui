import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import {
  fetchEncounterAction,
  fetchEncounterFailAction,
  fetchEncounterSuccessAction,
  fetchPatientEncountersAction,
  fetchPatientEncountersFailAction,
  fetchPatientEncountersSuccessAction,
  saveEncounterAction,
  saveEncounterFailAction,
  saveEncounterSuccessAction,
} from '../../../../js/state/ui/encounter/actions';
import {
  fetchEncounter,
  fetchPatientEncounters,
  getEncounterUrl,
  getPatientEncountersUrl,
  getSaveEncounterUrl,
  saveEncounter,
} from '../../../../js/state/ui/encounter/sagas';
import { getData, postData } from '../../../../js/api';
import {
  addEntityAction,
  updateEntitiesDataAction,
} from '../../../../js/state/entities/actions';
import {
  encounterSchema,
  encountersSchema,
} from '../../../../js/state/representations';
import {
  fetchEpisodesAction,
  fetchEpisodesFailAction,
  fetchEpisodesSuccessAction,
} from '../../../../js/state/ui/episode/actions';
import {
  fetchEpisodes,
  getEpisodeUrl,
} from '../../../../js/state/ui/episode/sagas';
describe('encounter sagas', () => {
  describe('fetch encounter saga', () => {
    test('missing required argument', () => {
      const action = fetchEncounterAction('test', undefined);
      const generator = cloneableGenerator(fetchEncounter)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(fetchEncounterFailAction(undefined, 'Encounter uuid is required'))
      );
      expect(clone.next().done).toEqual(true);
    });
    test('fetch encounter success', () => {
      const encounterUuid = '123';
      const action = fetchEncounterAction('test', encounterUuid);

      const generator = cloneableGenerator(fetchEncounter)(action);
      const clone = generator.clone();
      const expected = call(getData, getEncounterUrl(action));
      expect(clone.next().value).toEqual(expected);
      const encounter = {
        uuid: '123',
        display: 'test',
        obs: [
          { uuid: '456', display: 'obs1' },
          { uuid: '789', display: 'obs2' },
        ],
      };
      const normalized = normalize(encounter, encounterSchema);
      expect(clone.next(encounter).value).toEqual(
        put(updateEntitiesDataAction(normalized))
      );
      expect(clone.next(encounter).value).toEqual(
        put(fetchEncounterSuccessAction(encounterUuid, encounter))
      );
      expect(clone.next().done).toEqual(true);
    });

    test('fetch encounter failure', () => {
      const action = fetchEncounterAction('test', '123');
      const generator = cloneableGenerator(fetchEncounter)(action);
      const clone = generator.clone();
      clone.next();
      expect(clone.throw(new Error('fetch encounter failed')).value).toEqual(
        put(fetchEncounterFailAction('123', 'fetch encounter failed'))
      );
      expect(clone.next().done).toEqual(true);
    });

    test('fetch encounter server failure', () => {
      const action = fetchEncounterAction('test', '123');
      const generator = cloneableGenerator(fetchEncounter)(action);
      const clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(fetchEncounterFailAction('123', error)));
      expect(clone.next().done).toEqual(true);
    });
  });

  describe('save encounter saga', () => {
    test('missing required argument', () => {
      const action = saveEncounterAction('test', undefined);
      const generator = cloneableGenerator(saveEncounter)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(saveEncounterFailAction(undefined, 'Encounter is required'))
      );
      expect(clone.next().done).toEqual(true);
    });

    test('save encounter success', () => {
      const encounter = {
        uuid: '123',
        display: 'test',
        obs: [
          { uuid: '456', display: 'obs1' },
          { uuid: '789', display: 'obs2' },
        ],
      };
      const episodes = {
        results: [
          {
            uuid: '123',
            encounters: [
              { uuid: '456', display: 'enc1' },
              { uuid: '789', display: 'enc2' },
            ],
            patientPrograms: [{ uuid: 'abc', display: 'Pregnancy program' }],
          },
        ],
      };
      const options = {
        patient: '123',
      };
      const action = saveEncounterAction('test', encounter, options);

      const generator = cloneableGenerator(saveEncounter)(action);
      const clone = generator.clone();
      const expected = call(postData, getSaveEncounterUrl(action), encounter);
      expect(clone.next().value).toEqual(expected);
      const normalized = normalize(encounter, encounterSchema);
      expect(clone.next(encounter).value).toEqual(
        put(updateEntitiesDataAction(normalized))
      );
      const query = {
        patientUuid: '123',
        programUuid: '456',
      };
      const action1 = fetchEpisodesAction('test', query);

      const generator1 = cloneableGenerator(fetchEpisodes)(action1);
      const clone1 = generator1.clone();
      const expected1 = call(getData, getEpisodeUrl(action1));
      expect(clone1.next().value).toEqual(expected1);
      expect(clone.next().done).toEqual(false);
    });

    test('save encounter success belonging to episode', () => {
      const encounter = {
        display: 'test',
        obs: [
          { uuid: '456', display: 'obs1' },
          { uuid: '789', display: 'obs2' },
        ],
      };
      const options = {
        episodeUuid: '456',
      };
      const action = saveEncounterAction('test', encounter, options);

      const generator = cloneableGenerator(saveEncounter)(action);
      const clone = generator.clone();
      const expected = call(postData, getSaveEncounterUrl(action), encounter);
      expect(clone.next().value).toEqual(expected);
      const normalized = normalize(encounter, encounterSchema);
      expect(clone.next(encounter).value).toEqual(
        put(updateEntitiesDataAction(normalized))
      );
      expect(clone.next(encounter).value).toEqual(
        put(addEntityAction(['episodes', '456', 'encounters'], normalized))
      );
      const query = {
        patientUuid: '123',
        programUuid: '456',
      };
      const action1 = fetchEpisodesAction('test', query);

      const generator1 = cloneableGenerator(fetchEpisodes)(action1);
      const clone1 = generator1.clone();
      const expected1 = call(getData, getEpisodeUrl(action1));
      expect(clone1.next().value).toEqual(expected1);
      expect(clone.next().done).toEqual(false);
    });

    test('save encounter failure', () => {
      const newEncounter = {
        display: 'test',
        obs: [
          { uuid: '456', display: 'obs1' },
          { uuid: '789', display: 'obs2' },
        ],
      };
      let action = saveEncounterAction('test', newEncounter);
      let generator = cloneableGenerator(saveEncounter)(action);
      let clone = generator.clone();
      clone.next();
      expect(clone.throw(new Error('save encounter failed')).value).toEqual(
        put(saveEncounterFailAction(undefined, 'save encounter failed'))
      );
      expect(clone.next().done).toEqual(true);

      const existingEncounter = {
        uuid: '123',
        display: 'test',
        obs: [
          { uuid: '456', display: 'obs1' },
          { uuid: '789', display: 'obs2' },
        ],
      };

      action = saveEncounterAction('test', existingEncounter);
      generator = cloneableGenerator(saveEncounter)(action);
      clone = generator.clone();
      clone.next();
      expect(clone.throw(new Error('save encounter failed')).value).toEqual(
        put(
          saveEncounterFailAction(
            existingEncounter.uuid,
            'save encounter failed'
          )
        )
      );
      expect(clone.next().done).toEqual(true);
    });

    test('save encounter server failure', () => {
      const encounter = {
        uuid: '123',
        display: 'test',
        obs: [
          { uuid: '456', display: 'obs1' },
          { uuid: '789', display: 'obs2' },
        ],
      };
      const action = saveEncounterAction('test', encounter);
      const generator = cloneableGenerator(saveEncounter)(action);
      const clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(saveEncounterFailAction(encounter.uuid, error)));
      expect(clone.next().done).toEqual(true);
    });
  });

  describe('fetch patient encounter saga', () => {
    test('missing required argument', () => {
      const action = fetchPatientEncountersAction('test', undefined);
      const generator = cloneableGenerator(fetchPatientEncounters)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(
          fetchPatientEncountersFailAction(
            undefined,
            'Patient uuid is required'
          )
        )
      );
      expect(clone.next().done).toEqual(true);
    });

    test('fetch patient encounter encounter success', () => {
      const patientUuid = '123';
      const action = fetchPatientEncountersAction('test', patientUuid);

      const generator = cloneableGenerator(fetchPatientEncounters)(action);
      const clone = generator.clone();
      const expected = call(getData, getPatientEncountersUrl(action));
      expect(clone.next().value).toEqual(expected);
      const encounters = {
        results: [
          {
            uuid: '123',
            display: 'test',
            obs: [
              { uuid: '456', display: 'obs1' },
              { uuid: '789', display: 'obs2' },
            ],
          },
        ],
      };

      const { results } = encounters;
      const normalized = normalize(results, encountersSchema);
      expect(clone.next(encounters).value).toEqual(
        put(updateEntitiesDataAction(normalized))
      );
      expect(clone.next(encounters).value).toEqual(
        put(fetchPatientEncountersSuccessAction(patientUuid, normalized.result))
      );
      expect(clone.next().done).toEqual(true);
    });

    test('fetch patient encounters failure', () => {
      const action = fetchPatientEncountersAction('test', '123');
      const generator = cloneableGenerator(fetchPatientEncounters)(action);
      const clone = generator.clone();
      clone.next();
      expect(
        clone.throw(new Error('fetch patient encounters failed')).value
      ).toEqual(
        put(
          fetchPatientEncountersFailAction(
            '123',
            'fetch patient encounters failed'
          )
        )
      );
      expect(clone.next().done).toEqual(true);
    });

    test('fetch patient encounters server failure', () => {
      const action = fetchPatientEncountersAction('test', '123');
      const generator = cloneableGenerator(fetchPatientEncounters)(action);
      const clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(fetchPatientEncountersFailAction('123', error)));
      expect(clone.next().done).toEqual(true);
    });
  });
});
