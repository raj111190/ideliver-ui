import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import VcPatientNotes from './vcPatientNotes';
import { REST_API_PATHNAME } from '../../paths';
import { selectVisitNotesContainerData } from '../../state/ui/obs/selectors';
import { saveObservationAction } from '../../state/ui/obs/actions';
import { saveEncounterAction } from '../../state/ui/encounter/actions';
import { getCurrentEpisodeUuid } from '../../state/ui/episode/selectors';
import { getVisitNotesEncounterUuidsForVisit } from '../../state/ui/encounter/selectors';
import { createPatientNotesEncounter } from './patientNotesHelpers';

const mapStateToProps = state => {
  const episodeUuid = getCurrentEpisodeUuid(state);
  const visitNoteEncounters = getVisitNotesEncounterUuidsForVisit(state);
  const encounterUuid =
    visitNoteEncounters && visitNoteEncounters.size > 0
      ? visitNoteEncounters.get(0)
      : null;

  const patientNotes = selectVisitNotesContainerData(state);
  return {
    episodeUuid,
    encounterUuid,
    patientNotes,
  };
};

const mapDispatchToProps = dispatch => {
  const saveObservation = patientNotes => {
    dispatch(saveObservationAction(REST_API_PATHNAME, patientNotes));
  };

  const saveEncounter = (encounter, options) => {
    dispatch(saveEncounterAction(REST_API_PATHNAME, encounter, options));
  };

  const savePatientNotes = (newNotes, uuids) => {
    if (newNotes) {
      const { encounterUuid } = uuids;
      // if there's already a Visit note encounter, add observations to it
      if (encounterUuid) {
        saveObservation(newNotes);
      } else {
        // otherwise, create a new encounter
        const patientNotesEncounter = createPatientNotesEncounter(
          uuids,
          newNotes
        );
        saveEncounter(patientNotesEncounter, uuids);
      }
    }
  };

  return {
    onSubmit: savePatientNotes,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(VcPatientNotes));
