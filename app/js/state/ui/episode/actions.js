/* FETCH AN EPISODES */
export const FETCH_EPISODES_ACTION = 'FETCH_EPISODES_ACTION';
export const FETCH_EPISODES_SUCCESS_ACTION = 'FETCH_EPISODES_SUCCESS_ACTION';
export const FETCH_EPISODES_FAIL_ACTION = 'FETCH_EPISODES_FAIL_ACTION';

export const fetchEpisodesAction = (url, query) => ({
  type: FETCH_EPISODES_ACTION,
  url,
  query,
});

export const fetchEpisodesSuccessAction = episodes => ({
  type: FETCH_EPISODES_SUCCESS_ACTION,
  episodes,
});

export const fetchEpisodesFailAction = error => ({
  type: FETCH_EPISODES_FAIL_ACTION,
  error,
});
