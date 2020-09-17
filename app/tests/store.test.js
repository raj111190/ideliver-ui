import store from '../js/store';

describe('store', () => {
  it('should return the initial state', () => {
    const testStore = store();
    expect(testStore).toBeTruthy();
    expect(testStore.runSaga).toBeTruthy();
    testStore.close();
  });
});
