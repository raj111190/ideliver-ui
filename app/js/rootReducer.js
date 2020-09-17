import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import visitsReducer from './features/visits/visitsReducer';
import entitiesReducer from './state/entities/entitiesReducer';
import errorsReducer from './state/error/errorReducer';
import uiReducer from './state/ui/uiReducer';
import crossSliceReducer from './state/crossSliceReducer';

// Use ES6 object literal shorthand syntax to define the object shape
const sliceReducer = combineReducers({
  Visits: visitsReducer,
  entities: entitiesReducer,
  ui: uiReducer,
  errors: errorsReducer,
});

const rootReducer = reduceReducers(sliceReducer, crossSliceReducer);

export default rootReducer;
