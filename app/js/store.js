import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default state => {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const storeEnhancers = composeEnhancers(applyMiddleware(...middleware));

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    rootReducer /* preloadedState, */,
    state,
    storeEnhancers
  );
  /* eslint-enable */
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  store.runSaga(rootSaga);

  return store;
};
