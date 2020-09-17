import fetchVisitsAction, {
  FETCH_VISITS_ACTION,
} from '../../../../js/features/visits/actions/fetchVisitsAction';

describe('fetchVisitsAction', () => {
  it('should return the correct action', () => {
    const options = { pageSize: 2, pageIndex: 3, searchText: '' };
    const result = fetchVisitsAction('test', options);
    expect(result).toEqual({
      type: FETCH_VISITS_ACTION,
      url: 'test',
      options,
    });
  });
});
