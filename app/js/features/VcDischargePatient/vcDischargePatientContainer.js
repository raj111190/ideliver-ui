import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import { REST_API_PATHNAME } from '../../paths';
import {
  selectVisitNotesContainerData,
  selectDischargeContainerData,
} from '../../state/ui/obs/selectors';
import { saveObservationAction } from '../../state/ui/obs/actions';
import { saveEncounterAction } from '../../state/ui/encounter/actions';
import { getCurrentEpisodeUuid } from '../../state/ui/episode/selectors';
import { getDischargeEncounterUuidsForVisit } from '../../state/ui/encounter/selectors';
import { createDischargePatientEncounter } from './vcDischargePatientHelpers';
import VcDischargePatient from './vcDischargePatient';

const mapStateToProps = state => {
  const episodeUuid = getCurrentEpisodeUuid(state);
  const dischargeEncounters = getDischargeEncounterUuidsForVisit(state);
  const encounterUuid =
    dischargeEncounters && dischargeEncounters.size > 0
      ? dischargeEncounters.get(0)
      : null;

  let patientNotes = selectVisitNotesContainerData(state);
  const dischargeNotes = selectDischargeContainerData(state);
  patientNotes = patientNotes
    ? patientNotes.concat(dischargeNotes)
    : patientNotes;

  return {
    episodeUuid,
    encounterUuid,
    patientNotes,
  };
};

const mapDispatchToProps = dispatch => {
  const saveObservation = (patientNotes, options) => {
    dispatch(saveObservationAction(REST_API_PATHNAME, patientNotes, options));
  };

  const saveEncounter = (encounter, options) => {
    dispatch(saveEncounterAction(REST_API_PATHNAME, encounter, options));
  };

  const saveDischargeNotes = (newNotes, uuids) => {
    if (newNotes) {
      const { encounterUuid } = uuids;
      // if there's already a Discharge encounter, add observations to it
      if (encounterUuid) {
        saveObservation(newNotes, uuids);
      } else {
        // otherwise, create a new encounter
        const dischargeEncounter = createDischargePatientEncounter(
          uuids,
          newNotes
        );
        saveEncounter(dischargeEncounter, uuids);
      }
    }
  };

  return {
    onSubmit: saveDischargeNotes,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(VcDischargePatient));
