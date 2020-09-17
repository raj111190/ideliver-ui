import 'regenerator-runtime/runtime';
import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import { FETCH_VISITS_ACTION } from './features/visits/actions/fetchVisitsAction';
import { FETCH_FORM_ACTION, SUBMIT_FORM_ACTION } from './state/ui/form/actions';
import { FETCH_FORM_RESOURCE_ACTION } from './state/ui/formResource/actions';
import fetchVisits from './features/visits/sagas/fetchVisitsSaga';
import { fetchForm, submitForm } from './state/ui/form/sagas';
import { fetchFormResource } from './state/ui/formResource/sagas';
import { saveObservation } from './state/ui/obs/sagas';
import { SAVE_OBSERVATION_ACTION } from './state/ui/obs/actions';
import { SAVE_ENCOUNTER_ACTION } from './state/ui/encounter/actions';
import { saveEncounter } from './state/ui/encounter/sagas';

import { FETCH_EPISODES_ACTION } from './state/ui/episode/actions';
import { fetchEpisodes } from './state/ui/episode/sagas';
import {
  SAVE_PATIENT_ATTRIBUTE_ACTION,
  SAVE_PATIENT_IDENTIFIER_ACTION,
  SAVE_PATIENT_IMAGE_ACTION,
} from './state/ui/patient/actions';
import {
  savePatientAttribute,
  savePatientIdentifier,
  savePatientImage,
} from './state/ui/patient/sagas';
import {
  SAVE_VISIT_ACTION,
  SAVE_VISIT_ATTRIBUTE_ACTION,
} from './state/ui/visit/actions';
import { saveVisit, saveVisitAttribute } from './state/ui/visit/sagas';

function* rootSaga() {
  yield all([
    takeEvery(FETCH_FORM_ACTION, fetchForm),
    takeEvery(FETCH_FORM_RESOURCE_ACTION, fetchFormResource),
    takeEvery(SAVE_ENCOUNTER_ACTION, saveEncounter),
    takeEvery(SAVE_OBSERVATION_ACTION, saveObservation),
    takeEvery(SAVE_PATIENT_ATTRIBUTE_ACTION, savePatientAttribute),
    takeEvery(SAVE_PATIENT_IDENTIFIER_ACTION, savePatientIdentifier),
    takeEvery(SAVE_PATIENT_IMAGE_ACTION, savePatientImage),
    takeEvery(SAVE_VISIT_ACTION, saveVisit),
    takeEvery(SAVE_VISIT_ATTRIBUTE_ACTION, saveVisitAttribute),
    takeEvery(SUBMIT_FORM_ACTION, submitForm),
    takeLatest(FETCH_EPISODES_ACTION, fetchEpisodes),
    takeLatest(FETCH_VISITS_ACTION, fetchVisits),
  ]);
}

export default rootSaga;
