import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { VcAlphaScrollList, VcDiagnosisCard } from '@vecnacares/vc-ui';
import { pick } from 'lodash';
import { conceptClass } from '../../uuid';
import VcDialog from '../../components/vcDialog/vcDialog';
import styles from './vcDiagnosis.scss';
import messages from '../../intl/messages';
import {
  confirmDiagnosis,
  createConfirmedDiagnosisObservation,
  resolveDiagnosis,
  voidDiagnosis,
} from './diagnosisHelpers';

const VcDiagnosis = props => {
  const [open, setOpen] = useState(false);
  const uuids = pick(props, [
    'patientUuid',
    'encounterUuid',
    'episodeUuid',
    'visitUuid',
  ]);
  const updateDiagnosis = diag => {
    const diagnosis = Object.values(props.conceptToObsMap).find(
      obs => obs.uuid === diag.uuid
    );
    const confirmedDiagnosis = confirmDiagnosis(diagnosis);
    props.saveObservation(confirmedDiagnosis, uuids);
  };
  const resolveConfirmedDiagnosis = diag => {
    const diagnosis = Object.values(props.conceptToObsMap).find(
      obs => obs.uuid === diag.uuid
    );
    if (diagnosis) {
      const problemGM = diagnosis.groupMembers.find(
        member =>
          member.concept.uuid === conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID
      );
      const problemUuid = problemGM
        ? problemGM.value
          ? problemGM.value.uuid
          : ''
        : '';
      const existingResolvedDiagnosis = Object.values(
        props.resolvedDiagnoses
      ).find(obs => obs.uuid === problemUuid);
      if (existingResolvedDiagnosis) {
        props.deleteDiagnosis(diagnosis, uuids);
      } else {
        const resolvedDiagnosis = resolveDiagnosis(diagnosis);
        props.saveObservation(resolvedDiagnosis, uuids);
      }
    }
  };

  const openDiagnosisDialog = () => {
    setOpen(true);
  };

  const navigateToManagementPlan = () => {
    const { visitUuid, patientUuid } = props;
    props.history.push(`/client/${visitUuid}/${patientUuid}/managementPlans`);
  };

  const currentDiagnosesDeleted = diag => {
    const diagnosis = Object.values(props.conceptToObsMap).find(
      obs => obs.uuid === diag.uuid
    );
    props.deleteDiagnosis(diagnosis, uuids);
  };

  const handleClose = () => {
    const newDiagnosesUuids = props.addedDiagnoses.filter(
      a => !props.conceptToObsMap[a]
    );

    const newDiagnoses = newDiagnosesUuids.map(uuid =>
      createConfirmedDiagnosisObservation(
        uuid,
        props.encounterUuid,
        props.patientUuid
      )
    );

    const confirmedDiagnoses = props.addedDiagnoses
      .filter(a => props.conceptToObsMap[a])
      .map(b => confirmDiagnosis(props.conceptToObsMap[b]));

    const removedDiagnoses = props.removedDiagnoses
      .filter(a => props.conceptToObsMap[a])
      .map(b => voidDiagnosis(props.conceptToObsMap[b]));

    props.saveDiagnoses(
      { newDiagnoses, confirmedDiagnoses, removedDiagnoses },
      uuids
    );
    setOpen(false);
  };

  const toggleDiagnosis = diagnosis => {
    const obs = props.conceptToObsMap[diagnosis.uuid];
    if (obs) {
      const isPossibleDiag = props.possibleDiagnoses.find(
        diag => diag.uuid === diagnosis.uuid
      );
      if (isPossibleDiag) {
        // confirm possible diagnosis
        props.addDiagnosis(diagnosis.uuid);
      } else {
        // remove confirmed diagnosis
        props.removeDiagnosis(diagnosis.uuid);
      }
    } else {
      // diagnosis does not exists, add it
      props.addDiagnosis(diagnosis.uuid);
    }
  };

  const { formatMessage } = props.intl;
  const saving =
    (!!props.addedDiagnoses.length || !!props.removedDiagnoses.length) && !open;
  return (
    <div>
      {saving ? (
        <div className={styles.progress}>
          <CircularProgress size={36} disableShrink />
        </div>
      ) : null}
      <VcDiagnosisCard
        diagnoses={props.patientDiagnoses}
        onConfirm={updateDiagnosis}
        onResolve={resolveConfirmedDiagnosis}
        onAddMore={openDiagnosisDialog}
        onConfirmedClick={navigateToManagementPlan}
        onDelete={currentDiagnosesDeleted}
      />
      <VcDialog
        type="Diagnoses"
        open={open}
        onToggle={handleClose}
        dialogContent={
          <VcAlphaScrollList
            title={formatMessage(messages.addDiagnoses)}
            onToggle={handleClose}
            toggleSelected={toggleDiagnosis}
            options={props.allDiagnoses}
            selectedOptions={props.confirmedDiagnoses}
            highlighted={props.possibleDiagnoses}
            buttonLabel={formatMessage(messages.close)}
            className={styles.diagnosisPicker}
          />
        }
      />
    </div>
  );
};

VcDiagnosis.propTypes = {
  // callback function to be fired on submitting the diagnosis
  addDiagnosis: PropTypes.func,
  saveDiagnoses: PropTypes.func,
  removeDiagnosis: PropTypes.func,
  saveObservation: PropTypes.func,

  encounterUuid: PropTypes.string,
  episodeUuid: PropTypes.string,
  patientUuid: PropTypes.string,
  visitUuid: PropTypes.string,

  addedDiagnoses: PropTypes.arrayOf(PropTypes.string),
  removedDiagnoses: PropTypes.arrayOf(PropTypes.string),
  deleteDiagnosis: PropTypes.func,

  conceptToObsMap: PropTypes.shape({}),
  allDiagnoses: PropTypes.arrayOf(PropTypes.shape({})),
  confirmedDiagnoses: PropTypes.arrayOf(PropTypes.shape({})),
  patientDiagnoses: PropTypes.arrayOf(PropTypes.shape({})),
  possibleDiagnoses: PropTypes.arrayOf(PropTypes.shape({})),
  resolvedDiagnoses: PropTypes.arrayOf(PropTypes.shape({})),
};

VcDiagnosis.defaultProps = {
  allDiagnoses: [],
  addedDiagnoses: [],
  removedDiagnoses: [],
  deleteDiagnosis: undefined,
};

export default injectIntl(VcDiagnosis);
