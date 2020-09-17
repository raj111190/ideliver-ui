export const FETCH_VISITS_SUCCEEDED = 'FETCH_VISITS_SUCCEEDED';

const fetchVisitsSuccessAction = value => ({
  type: FETCH_VISITS_SUCCEEDED,
  payload: value,
});

export default fetchVisitsSuccessAction;
