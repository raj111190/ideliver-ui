import { createSelector } from 'reselect';
import { getEpisodes } from '../../entities/selectors';

export const getCurrentEpisodeUuid = state =>
  state.ui.episode.getIn(['currentEpisode']);

/**
 * Get the current episode
 * @return {function} a memoized selector function
 */
export const getCurrentEpisode = createSelector(
  [getEpisodes, getCurrentEpisodeUuid],
  (episodes, episodeUuid) => {
    if (!episodes || !episodeUuid) return undefined;
    return episodes.get(episodeUuid);
  }
);
