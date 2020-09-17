import {
  SET_ENTITIES_DATA_ACTION,
  setEntitiesDataAction,
  UPDATE_ENTITIES_DATA_ACTION,
  updateEntitiesDataAction,
} from '../../../js/state/entities/actions';

describe('entities actions', () => {
  it('should return set entities data action', () => {
    const payload = {
      encounters: { '123': [2, 4] },
    };
    const result = setEntitiesDataAction(payload);
    expect(result).toEqual({
      type: SET_ENTITIES_DATA_ACTION,
      payload,
    });
  });

  it('should return update entities data action', () => {
    const payload = {
      encounters: { '123': [2, 4] },
    };
    const result = updateEntitiesDataAction(payload);
    expect(result).toEqual({
      type: UPDATE_ENTITIES_DATA_ACTION,
      payload,
    });
  });
});
