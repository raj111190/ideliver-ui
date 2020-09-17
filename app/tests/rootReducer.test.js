import { createStore } from 'redux';
import RootReducer from '../js/rootReducer';

describe('RootReducer', () => {
  it('should return the initial state', () => {
    const store = createStore(RootReducer);
    expect(Object.keys(store.getState())).toEqual([
      'Visits',
      'entities',
      'ui',
      'errors',
    ]);
  });
});
