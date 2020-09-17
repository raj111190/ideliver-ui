import { combineReducers } from 'redux';
import encounterReducer from './encounter/reducers';
import observationReducer from './obs/reducers';
import episodeReducer from './episode/reducers';
import patientReducer from './patient/reducers';
import visitReducer from './visit/reducers';
import formReducer from './form/reducers';
import formResourceReducer from './formResource/reducers';

const uiReducer = combineReducers({
  encounter: encounterReducer,
  observation: observationReducer,
  episode: episodeReducer,
  patient: patientReducer,
  visit: visitReducer,
  form: formReducer,
  formResource: formResourceReducer,
});

export default uiReducer;
