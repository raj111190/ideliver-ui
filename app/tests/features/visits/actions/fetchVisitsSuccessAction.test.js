import fetchVisitsSuccessAction, {
  FETCH_VISITS_SUCCEEDED,
} from '../../../../js/features/visits/actions/fetchVisitsSuccessAction';

describe('fetchVisitsSuccessAction', () => {
  it('should return the correct action', () => {
    const result = fetchVisitsSuccessAction('test');
    expect(result).toEqual({
      type: FETCH_VISITS_SUCCEEDED,
      payload: 'test',
    });
  });
});
