import fetchVisitsFailAction, {
  FETCH_VISITS_FAILED,
} from '../../../../js/features/visits/actions/fetchVisitsFailAction';

describe('fetchVisitsFailAction', () => {
  it('should return the correct action', () => {
    const result = fetchVisitsFailAction('test');
    expect(result).toEqual({
      type: FETCH_VISITS_FAILED,
      payload: 'test',
    });
  });
});
