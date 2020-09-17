export const FETCH_VISITS_ACTION = 'FETCH_VISITS_ACTION';

const fetchVisitsAction = (url, options) => ({
  type: FETCH_VISITS_ACTION,
  url,
  options,
});

export default fetchVisitsAction;
