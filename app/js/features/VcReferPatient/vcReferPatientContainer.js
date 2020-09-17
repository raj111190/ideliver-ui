import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import { REST_API_PATHNAME } from '../../paths';
import {
  selectVisitNotesContainerData,
  selectReferralContainerData,
} from '../../state/ui/obs/selectors';
import { saveObservationAction } from '../../state/ui/obs/actions';
import { saveEncounterAction } from '../../state/ui/encounter/actions';
import { getCurrentEpisodeUuid } from '../../state/ui/episode/selectors';
import { getReferralEncounterUuidsForVisit } from '../../state/ui/encounter/selectors';
import { createReferPatientEncounter } from './vcReferPatientHelpers';
import VcReferPatient from './vcReferPatient';

const mapStateToProps = state => {
  const episodeUuid = getCurrentEpisodeUuid(state);
  const referralEncounters = getReferralEncounterUuidsForVisit(state);
  const encounterUuid =
    referralEncounters && referralEncounters.size > 0
      ? referralEncounters.get(0)
      : null;

  let patientNotes = selectVisitNotesContainerData(state);
  const referralNotes = selectReferralContainerData(state);
  patientNotes = patientNotes
    ? patientNotes.concat(referralNotes)
    : patientNotes;

  return {
    episodeUuid,
    encounterUuid,
    patientNotes,
    referralNotes,
  };
};

const mapDispatchToProps = dispatch => {
  const saveObservation = (patientNotes, options) => {
    dispatch(saveObservationAction(REST_API_PATHNAME, patientNotes, options));
  };

  const saveEncounter = (encounter, options) => {
    dispatch(saveEncounterAction(REST_API_PATHNAME, encounter, options));
  };

  const saveReferralNotes = (newNotes, uuids) => {
    if (newNotes) {
      const { encounterUuid } = uuids;
      // if there's already a Referral encounter, add observations to it
      if (encounterUuid) {
        saveObservation(newNotes, uuids);
      } else {
        // otherwise, create a new encounter
        const referralEncounter = createReferPatientEncounter(uuids, newNotes);
        saveEncounter(referralEncounter, uuids);
      }
    }
  };

  return {
    onSubmit: saveReferralNotes,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(VcReferPatient));
