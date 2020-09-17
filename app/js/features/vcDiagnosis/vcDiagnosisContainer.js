import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import VcDiagnosis from './vcDiagnosis';
import { REST_API_PATHNAME } from '../../paths';
import { selectDiagnosisContainerData } from '../../state/ui/obs/selectors';

import {
  toggleAddDiagnosisAction,
  toggleRemoveDiagnosisAction,
  saveObservationAction,
} from '../../state/ui/obs/actions';
import { saveEncounterAction } from '../../state/ui/encounter/actions';
import { getCurrentEpisodeUuid } from '../../state/ui/episode/selectors';
import { createDiagnosisEncounter } from './diagnosisHelpers';

const mapStateToProps = state => {
  const episodeUuid = getCurrentEpisodeUuid(state);
  const diagnosisData = selectDiagnosisContainerData(state);
  return {
    episodeUuid,
    allDiagnoses: diagnosisData.get('allDiagnoses'),
    possibleDiagnoses: diagnosisData.get('possibleDiagnoses'),
    confirmedDiagnoses: diagnosisData.get('confirmedDiagnoses'),
    conceptToObsMap: diagnosisData.get('conceptToObsMap'),
    addedDiagnoses: diagnosisData.get('addedDiagnoses'),
    removedDiagnoses: diagnosisData.get('removedDiagnoses'),
    resolvedDiagnoses: diagnosisData.get('resolvedDiagnoses'),
    patientDiagnoses: diagnosisData.get('patientDiagnoses'),
  };
};

const mapDispatchToProps = dispatch => {
  const saveObservation = (diagnosis, uuids) => {
    dispatch(saveObservationAction(REST_API_PATHNAME, diagnosis, uuids));
  };

  const saveEncounter = (encounter, options) => {
    dispatch(saveEncounterAction(REST_API_PATHNAME, encounter, options));
  };

  const saveDiagnoses = (
    { newDiagnoses, confirmedDiagnoses, removedDiagnoses },
    uuids
  ) => {
    if (removedDiagnoses && removedDiagnoses.length) {
      removedDiagnoses.forEach(diagnosis => {
        saveObservation(diagnosis, uuids);
      });
    }

    if (confirmedDiagnoses && confirmedDiagnoses.length) {
      confirmedDiagnoses.forEach(diagnosis => {
        saveObservation(diagnosis, uuids);
      });
    }

    if (newDiagnoses) {
      const { encounterUuid } = uuids;
      // if there's already a diagnosis encounter, add observations to it
      if (encounterUuid) {
        newDiagnoses.forEach(diagnosis => {
          saveObservation(diagnosis, uuids);
        });
      } else {
        // otherwise, create a new encounter
        const diagnosisEncounter = createDiagnosisEncounter(
          uuids,
          newDiagnoses
        );
        saveEncounter(diagnosisEncounter, uuids);
        // this is needed to refresh the visit because we get
        // the current diagnosis encounter from the visit
      }
    }
  };
  const deleteDiagnosisAction = (diagnosis, uuids) => {
    const voidedDiagnosis = { uuid: diagnosis.uuid, voided: true };
    dispatch(saveObservationAction(REST_API_PATHNAME, voidedDiagnosis, uuids));
  };

  return {
    saveObservation,
    saveDiagnoses,
    onSubmit: saveDiagnoses,
    addDiagnosis: diagnosisUuid => {
      dispatch(toggleAddDiagnosisAction(diagnosisUuid));
    },
    removeDiagnosis: diagnosisUuid => {
      dispatch(toggleRemoveDiagnosisAction(diagnosisUuid));
    },
    deleteDiagnosis: (diagnosis, uuids) =>
      deleteDiagnosisAction(diagnosis, uuids),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(VcDiagnosis));
