export const FETCH_VISITS_FAILED = 'FETCH_VISITS_FAILED';

const fetchVisitsFailAction = value => ({
  type: FETCH_VISITS_FAILED,
  payload: value,
});

export default fetchVisitsFailAction;
