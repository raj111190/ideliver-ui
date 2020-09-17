import {
  FETCH_EPISODES_ACTION,
  FETCH_EPISODES_FAIL_ACTION,
  FETCH_EPISODES_SUCCESS_ACTION,
  fetchEpisodesAction,
  fetchEpisodesFailAction,
  fetchEpisodesSuccessAction,
} from '../../../../js/state/ui/episode/actions';

describe('Episodes action', () => {
  describe('fetch episodes', () => {
    it('fetch episode action', () => {
      const result = fetchEpisodesAction('test', '123');
      expect(result).toEqual({
        type: FETCH_EPISODES_ACTION,
        url: 'test',
        query: '123',
      });
    });

    it('fetch episode success action', () => {
      const episodes = [
        {
          uuid: '123',
          encounters: [],
        },
      ];
      const result = fetchEpisodesSuccessAction(episodes);
      expect(result).toEqual({
        type: FETCH_EPISODES_SUCCESS_ACTION,
        episodes,
      });
    });

    it('fetch episode fail action', () => {
      const error = 'Obs error';
      const result = fetchEpisodesFailAction(error);
      expect(result).toEqual({
        type: FETCH_EPISODES_FAIL_ACTION,
        error,
      });
    });
  });
});
