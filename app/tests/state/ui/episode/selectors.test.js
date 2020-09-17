import { fromJS } from 'immutable';
import {
  getCurrentEpisode,
  getCurrentEpisodeUuid,
} from '../../../../js/state/ui/episode/selectors';

describe('episodes selectors', () => {
  it('should select current episode uuid', () => {
    const state = {
      ui: {
        episode: fromJS({
          currentEpisode: '123',
        }),
      },
    };

    expect(getCurrentEpisodeUuid(state)).toEqual('123');
  });

  it('should get the current episode', () => {
    const nullEpisode = getCurrentEpisode.resultFunc(undefined, '123');
    expect(nullEpisode).toEqual(undefined);

    const episodesByUuid = {
      '123': { uuid: '123', encounters: [], patientPrograms: undefined },
      '124': { uuid: '124', encounters: [], patientPrograms: [] },
    };

    const currentEpisode = getCurrentEpisode.resultFunc(
      fromJS(episodesByUuid),
      '123'
    );
    expect(currentEpisode).toEqual(fromJS(episodesByUuid['123']));
  });
});
