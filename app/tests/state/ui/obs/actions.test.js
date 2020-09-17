import {
  FETCH_OBSERVATION_ACTION,
  FETCH_OBSERVATION_FAIL_ACTION,
  FETCH_OBSERVATION_SUCCESS_ACTION,
  fetchObservationAction,
  fetchObservationFailAction,
  fetchObservationSuccessAction,
} from '../../../../js/state/ui/obs/actions';

describe('Observations action', () => {
  describe('fetch observation', () => {
    it('fetch observation action', () => {
      const result = fetchObservationAction('test', '123');
      expect(result).toEqual({
        type: FETCH_OBSERVATION_ACTION,
        url: 'test',
        uuid: '123',
      });
    });

    it('fetch observation success action', () => {
      const observation = {
        uuid: '123',
        display: 'test',
      };
      const result = fetchObservationSuccessAction('123', observation);
      expect(result).toEqual({
        type: FETCH_OBSERVATION_SUCCESS_ACTION,
        uuid: '123',
        observation,
      });
    });

    it('fetch observation fail action', () => {
      const error = 'Obs error';
      const result = fetchObservationFailAction('123', error);
      expect(result).toEqual({
        type: FETCH_OBSERVATION_FAIL_ACTION,
        uuid: '123',
        error,
      });
    });
  });
});
