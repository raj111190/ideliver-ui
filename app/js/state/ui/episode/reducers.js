import { fromJS } from 'immutable';
import {
  FETCH_EPISODES_ACTION,
  FETCH_EPISODES_FAIL_ACTION,
  FETCH_EPISODES_SUCCESS_ACTION,
} from './actions';

export const defaultState = {
  currentEpisode: undefined,
  fetching: false,
};

const getCurrentEpisode = episodes => {
  if (!episodes || !episodes.length) return undefined;
  // return the most recent episode
  return episodes[episodes.length - 1];
};

const episodeReducer = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case FETCH_EPISODES_ACTION:
      return state.setIn(['fetching'], true);

    case FETCH_EPISODES_FAIL_ACTION:
      return state.setIn(['fetching'], false);

    case FETCH_EPISODES_SUCCESS_ACTION:
      return state
        .setIn(['currentEpisode'], getCurrentEpisode(action.episodes))
        .setIn(['fetching'], false);

    default:
      return state;
  }
};

export default episodeReducer;
