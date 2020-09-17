import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { getData, postData } from '../../../../js/api';
import {
  fetchObservationAction,
  fetchObservationFailAction,
  fetchObservationSuccessAction,
  saveObservationAction,
  saveObservationFailAction,
  saveObservationSuccessAction,
} from '../../../../js/state/ui/obs/actions';
import {
  fetchObservation,
  getObservationUrl,
  getSaveObservationUrl,
  saveObservation,
} from '../../../../js/state/ui/obs/sagas';
import { obsSchema } from '../../../../js/state/representations';
import {
  addEntityAction,
  updateEntitiesDataAction,
} from '../../../../js/state/entities/actions';
import {
  fetchEpisodesAction,
  fetchEpisodesFailAction,
  fetchEpisodesSuccessAction,
} from '../../../../js/state/ui/episode/actions';
import {
  fetchEpisodes,
  getEpisodeUrl,
} from '../../../../js/state/ui/episode/sagas';
describe('observation sagas', () => {
  describe('fetch observation saga', () => {
    test('missing required argument', () => {
      const action = fetchObservationAction('test', undefined);
      const generator = cloneableGenerator(fetchObservation)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(
          fetchObservationFailAction(undefined, 'Observation uuid is required')
        )
      );
    });
    test('fetch observation success', () => {
      const observationUuid = '123';
      const action = fetchObservationAction('test', observationUuid);

      const generator = cloneableGenerator(fetchObservation)(action);
      const clone = generator.clone();
      const expected = call(getData, getObservationUrl(action));
      expect(clone.next().value).toEqual(expected);
      const observation = {
        uuid: '123',
        display: 'test',
        obs: [
          { uuid: '456', display: 'obs1' },
          { uuid: '789', display: 'obs2' },
        ],
      };
      const normalized = normalize(observation, obsSchema);
      expect(clone.next(observation).value).toEqual(
        put(updateEntitiesDataAction(normalized))
      );
      expect(clone.next(observation).value).toEqual(
        put(fetchObservationSuccessAction(observationUuid, observation))
      );
      expect(clone.next().done).toEqual(true);
    });

    test('fetch observation failure', () => {
      const action = fetchObservationAction('test', '123');
      let generator = cloneableGenerator(fetchObservation)(action);
      let clone = generator.clone();
      clone.next();
      expect(clone.throw(new Error('fetch observation failed')).value).toEqual(
        put(fetchObservationFailAction('123', 'fetch observation failed'))
      );

      generator = cloneableGenerator(fetchObservation)(action);
      clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(fetchObservationFailAction('123', error)));
    });
  });

  describe('save observation saga', () => {
    test('missing required argument', () => {
      const action = saveObservationAction('test', undefined);
      const generator = cloneableGenerator(saveObservation)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(saveObservationFailAction(undefined, 'Observation is required'))
      );
    });
    test('save observation success', () => {
      const newObservation = {
        concept: 'test',
        value: '123',
      };
      const action = saveObservationAction('test', newObservation);

      const generator = cloneableGenerator(saveObservation)(action);
      const clone = generator.clone();
      const expected = call(
        postData,
        getSaveObservationUrl(action),
        newObservation
      );
      expect(clone.next().value).toEqual(expected);
      const observation = {
        uuid: '123',
        concept: 'test',
        value: '123',
      };
      const normalized = normalize(observation, obsSchema);
      expect(clone.next(observation).value).toEqual(
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

    test('save observation with encounter success', () => {
      const newObservation = {
        concept: 'test',
        value: '123',
        encounter: {
          uuid: 'encounter123',
        },
      };
      const action = saveObservationAction('test', newObservation);

      const generator = cloneableGenerator(saveObservation)(action);
      const clone = generator.clone();
      const expected = call(
        postData,
        getSaveObservationUrl(action),
        newObservation
      );
      expect(clone.next().value).toEqual(expected);
      const observation = {
        uuid: '123',
        concept: 'test',
        value: '123',
      };
      const normalized = normalize(observation, obsSchema);
      expect(clone.next(observation).value).toEqual(
        put(updateEntitiesDataAction(normalized))
      );
      expect(clone.next(observation).value).toEqual(
        put(addEntityAction(['encounters', 'encounter123', 'obs'], normalized))
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

    test('save observation failure', () => {
      const newObservation = {
        concept: 'test',
        value: '123',
      };
      let action = saveObservationAction('test', newObservation);
      let generator = cloneableGenerator(saveObservation)(action);
      let clone = generator.clone();
      clone.next();
      expect(clone.throw(new Error('fetch observation failed')).value).toEqual(
        put(saveObservationFailAction(undefined, 'fetch observation failed'))
      );

      action = saveObservationAction('test', newObservation);
      generator = cloneableGenerator(saveObservation)(action);
      clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(saveObservationFailAction(undefined, error)));

      const existingObservation = {
        uuid: '123',
        concept: 'test',
        value: '123',
      };
      action = saveObservationAction('test', existingObservation);
      generator = cloneableGenerator(saveObservation)(action);
      clone = generator.clone();
      clone.next();
      expect(clone.throw(new Error('save observation failed')).value).toEqual(
        put(
          saveObservationFailAction(
            existingObservation.uuid,
            'save observation failed'
          )
        )
      );
    });
  });
});
