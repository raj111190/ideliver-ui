import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { normalize } from 'normalizr';
import { getData } from '../../../../js/api';
import {
  fetchEpisodesAction,
  fetchEpisodesFailAction,
  fetchEpisodesSuccessAction,
} from '../../../../js/state/ui/episode/actions';
import {
  fetchEpisodes,
  getEpisodeUrl,
} from '../../../../js/state/ui/episode/sagas';
import { episodesSchema } from '../../../../js/state/representations';
import { updateEntitiesDataAction } from '../../../../js/state/entities/actions';

describe('episodes sagas', () => {
  describe('fetch episodes saga', () => {
    test('missing required argument', () => {
      const action = fetchEpisodesAction('test', undefined);
      const generator = cloneableGenerator(fetchEpisodes)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(
          fetchEpisodesFailAction('Patient uuid and program uuid are required')
        )
      );
    });
    test('fetch episodes success', () => {
      const query = {
        patientUuid: '123',
        programUuid: '456',
      };
      const action = fetchEpisodesAction('test', query);

      const generator = cloneableGenerator(fetchEpisodes)(action);
      const clone = generator.clone();
      const expected = call(getData, getEpisodeUrl(action));
      expect(clone.next().value).toEqual(expected);
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
      const normalized = normalize(episodes.results, episodesSchema);
      expect(clone.next(episodes).value).toEqual(
        put(updateEntitiesDataAction(normalized))
      );
      expect(clone.next(episodes).value).toEqual(
        put(fetchEpisodesSuccessAction(normalized.result))
      );
      expect(clone.next().done).toEqual(true);
    });

    test('fetch episodes failure', () => {
      const query = {
        patientUuid: '123',
        programUuid: '456',
      };
      const action = fetchEpisodesAction('test', query);
      const generator = cloneableGenerator(fetchEpisodes)(action);
      const clone = generator.clone();
      clone.next();
      expect(clone.throw(new Error('fetch episodes failed')).value).toEqual(
        put(fetchEpisodesFailAction('fetch episodes failed'))
      );
    });

    test('fetch episodes server failure', () => {
      const query = {
        patientUuid: '123',
        programUuid: '456',
      };
      const action = fetchEpisodesAction('test', query);
      const generator = cloneableGenerator(fetchEpisodes)(action);
      const clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(fetchEpisodesFailAction(error)));
      expect(clone.next().done).toEqual(true);
    });
  });
});
