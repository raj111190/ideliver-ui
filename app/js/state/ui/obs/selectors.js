import { fromJS, List, Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import {
  getDiagnosisEncounterUuidsForEpisode,
  getVisitNotesEncounterUuidsForVisit,
  getReferralEncounterUuidsForVisit,
  getDischargeEncounterUuidsForVisit,
} from '../encounter/selectors';
import { obsSchema } from '../../representations';
import {
  getEncounters,
  getEntities,
  getObservations,
} from '../../entities/selectors';
import moment from 'moment-timezone';
import {
  conceptAttributeType,
  conceptClass,
  validDiagnoses,
  concept,
} from '../../../uuid';
import { longDatetimeFormatWithT } from '../../../components/vcDateTime/vcDateTime';

export const helper = {
  getDiagnosisProperty: (groupMembers, uuid) => {
    if (!groupMembers) return undefined;
    return groupMembers.find(
      member => member.getIn(['concept', 'uuid']) === uuid
    );
  },

  getAttributeProperty: (attributes, uuid) => {
    if (!attributes) return undefined;
    return attributes.find(
      attribute => attribute.getIn(['attributeType', 'uuid']) === uuid
    );
  },
};

export const getAddedDiagnosisUuids = state =>
  state.ui.observation.get('addedDiagnoses');
export const getRemovedDiagnosisUuids = state =>
  state.ui.observation.get('removedDiagnoses');

/**
 * Get uuids of diagnosis observations in the selected episode
 * @return {function} a memoized selector function
 */

export const getDiagnosisObservationsUuids = createSelector(
  [getDiagnosisEncounterUuidsForEpisode, getEncounters, getObservations],
  (diagnosisEncountersUuids, encounters, observations) => {
    const observationsByEncounters = diagnosisEncountersUuids.map(
      encounterUuid => {
        const encounter = encounters.get(encounterUuid);
        return (
          encounter
            .get('obs')
            // remove voided obs
            .filter(obsUuid => !observations.getIn([obsUuid, 'voided']))
        );
      }
    );
    return List(observationsByEncounters).flatten(true);
  }
);

/**
 * Get denormalized diagnosis observation
 * @return {function} a memoized selector function
 */
export const selectDiagnosisObservations = createSelector(
  [getDiagnosisObservationsUuids, getEntities],
  (diagnosisObservationsUuids, entities) => {
    return denormalize(diagnosisObservationsUuids, [obsSchema], entities);
  }
);

export const selectResolvedDiagnoses = createSelector(
  [selectDiagnosisObservations],
  diagnosisObservations => {
    if (!diagnosisObservations) return undefined;
    // contains a list of resolved diagnosis
    let resolvedDiagnoses = List();
    diagnosisObservations.forEach(diagnosis => {
      const groupMembers = diagnosis.get('groupMembers');
      const certainty = helper.getDiagnosisProperty(
        groupMembers,
        conceptClass.DIAGNOSIS_CERTAINTY_UUID
      );

      if (
        certainty.getIn(['value', 'uuid']) ===
        conceptClass.RESOLVED_DIAGNOSIS_UUID
      ) {
        const problem = helper.getDiagnosisProperty(
          groupMembers,
          conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID
        );
        const diagnosisConcept = problem.get('value');
        resolvedDiagnoses = resolvedDiagnoses.push(diagnosisConcept);
      }
    });
    return resolvedDiagnoses.map(diagnosis => diagnosis.get('display'));
  }
);

/**
 * Select all data needed by the DiagnosisContainer
 * @return {function} a memoized selector function
 */
export const selectDiagnosisContainerData = createSelector(
  [
    selectDiagnosisObservations,
    getAddedDiagnosisUuids,
    getRemovedDiagnosisUuids,
  ],
  (diagnosisObservations, addedDiagnoses, removedDiagnoses) => {
    // contains a list of possible diagnosis
    let possibleDiagnoses = List();
    // contains a list of confirmed diagnosis
    let confirmedDiagnoses = List();
    // contains a list of resolved diagnosis
    let resolvedDiagnoses = List();
    // a mapping of concept to obs to make it look up faster
    let conceptToObsMap = Map();
    // list all of patient diagnosis
    let patientDiagnoses = List();

    let allDiagnoses = fromJS(validDiagnoses);

    diagnosisObservations.forEach(diagnosis => {
      const groupMembers = diagnosis.get('groupMembers');
      const certainty = helper.getDiagnosisProperty(
        groupMembers,
        conceptClass.DIAGNOSIS_CERTAINTY_UUID
      );
      const problem = helper.getDiagnosisProperty(
        groupMembers,
        conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID
      );
      const diagnosisConcept = problem.get('value');

      if (
        certainty.getIn(['value', 'uuid']) ===
        conceptClass.RESOLVED_DIAGNOSIS_UUID
      ) {
        resolvedDiagnoses = resolvedDiagnoses.push(diagnosisConcept);
      } else {
        let patientDiagnosis = Map({ uuid: diagnosis.get('uuid') });
        patientDiagnosis = patientDiagnosis.set(
          'name',
          problem.getIn(['value', 'display'], '')
        );
        conceptToObsMap = conceptToObsMap.set(
          diagnosisConcept.get('uuid'),
          diagnosis
        );
        if (
          certainty.getIn(['value', 'uuid']) ===
          conceptClass.PRESUMED_DIAGNOSIS_UUID
        ) {
          possibleDiagnoses = possibleDiagnoses.push(diagnosisConcept);
          patientDiagnosis = patientDiagnosis.set('certainty', 'Possible');
        }
        if (
          certainty.getIn(['value', 'uuid']) ===
          conceptClass.CONFIRMED_DIAGNOSIS_UUID
        ) {
          confirmedDiagnoses = confirmedDiagnoses.push(diagnosisConcept);
          patientDiagnosis = patientDiagnosis.set('certainty', 'Confirmed');
        }

        const conceptAttributes = problem.getIn(['value', 'attributes']);
        const acuityAttribute = helper.getAttributeProperty(
          conceptAttributes,
          conceptAttributeType.DIAGNOSIS_ACUITY_UUID
        );
        const acuity =
          acuityAttribute && acuityAttribute.get('value').length
            ? +acuityAttribute.get('value')
            : undefined;
        patientDiagnosis = patientDiagnosis.set('acuity', acuity);
        patientDiagnoses = patientDiagnoses.push(patientDiagnosis);
      }
    });

    allDiagnoses.forEach(ideliverDiagnosis => {
      if (
        addedDiagnoses &&
        addedDiagnoses.includes(ideliverDiagnosis.get('uuid'))
      ) {
        const index = confirmedDiagnoses.findIndex(
          diag => diag.get('uuid') === ideliverDiagnosis.get('uuid')
        );
        if (index === -1) {
          confirmedDiagnoses = confirmedDiagnoses.push(
            fromJS(ideliverDiagnosis)
          );
        }
      }
      if (
        removedDiagnoses &&
        removedDiagnoses.includes(ideliverDiagnosis.get('uuid'))
      ) {
        const index = confirmedDiagnoses.findIndex(
          diag => diag.get('uuid') === ideliverDiagnosis.get('uuid')
        );
        if (index !== -1) {
          confirmedDiagnoses = confirmedDiagnoses.delete(index);
        }
      }
    });

    // sort diagnosis for ui display
    patientDiagnoses = patientDiagnoses.sort((a, b) => {
      return a.get('name') > b.get('name') ? 1 : -1;
    });

    allDiagnoses = allDiagnoses.sort((a, b) => {
      return a.get('display') > b.get('display') ? 1 : -1;
    });

    return Map({
      allDiagnoses,
      conceptToObsMap,
      patientDiagnoses,
      possibleDiagnoses,
      confirmedDiagnoses,
      addedDiagnoses,
      removedDiagnoses,
      resolvedDiagnoses,
    });
  }
);

/**
 * Get uuids of Visit Notes observations in the current visit
 * @return {function} a memoized selector function
 */

export const getVisitNotesObservationsUuids = createSelector(
  [getVisitNotesEncounterUuidsForVisit, getEncounters, getObservations],
  (visitNotesEncountersUuids, encounters, observations) => {
    const observationsByEncounters = visitNotesEncountersUuids.map(
      encounterUuid => {
        const encounter = encounters.get(encounterUuid);
        return (
          encounter
            .get('obs')
            // remove voided obs
            .filter(obsUuid => !observations.getIn([obsUuid, 'voided']))
        );
      }
    );
    return List(observationsByEncounters).flatten(true);
  }
);

/**
 * Get denormalized visit notes observation
 * @return {function} a memoized selector function
 */
export const selectVisitNotesObservations = createSelector(
  [getVisitNotesObservationsUuids, getEntities],
  (visitNotesObservationsUuids, entities) => {
    return denormalize(visitNotesObservationsUuids, [obsSchema], entities);
  }
);

export const dateTimeUtcToLocal = dateTime => {
  if (moment(dateTime, longDatetimeFormatWithT, true).isValid()) {
    const utc = dateTime.substring(0, dateTime.length - 5);
    const utcTimeVal = moment.utc(utc).toString();
    const localTimeVal = moment(utcTimeVal)
      .local()
      .toString();
    return localTimeVal;
  }
  return '';
};
/**
 * Select all data needed by the VisitNotes Container
 * @return {function} a memoized selector function
 */
export const selectVisitNotesContainerData = createSelector(
  selectVisitNotesObservations,
  visitNotesObservations => {
    let latestNurseTime = 0;
    let latestDoctorTime = 0;
    visitNotesObservations.forEach(notes => {
      if (notes.get('concept').get('uuid') === concept.DOCTOR_NOTES)
        latestDoctorTime = moment.max(
          latestDoctorTime,
          moment(notes.get('obsDatetime').valueOf())
        );
      else
        latestNurseTime = moment.max(
          latestNurseTime,
          moment(notes.get('obsDatetime').valueOf())
        );
    });
    return visitNotesObservations.map(notes => {
      let hasEdit = false;
      if (notes.get('concept').get('uuid') === concept.DOCTOR_NOTES) {
        if (moment(notes.get('obsDatetime').valueOf()).isSame(latestDoctorTime))
          hasEdit = true;
      } else if (
        moment(notes.get('obsDatetime').valueOf()).isSame(latestNurseTime)
      )
        hasEdit = true;
      const notesObs = notes.get('groupMembers')
        ? notes
            .get('groupMembers')
            .find(obs => obs.get('concept').get('uuid') === concept.NOTES)
        : '';
      const notesValues = notesObs ? notesObs.get('display') : '';
      const notesConceptName = notesObs
        ? notesObs.get('concept').get('display')
        : '';
      const notesValue =
        notesConceptName.length + 2 < notesValues.length
          ? notesValues.substring(
              notesConceptName.length + 2,
              notesValues.length
            )
          : '';

      const timeObs = notes.get('groupMembers')
        ? notes
            .get('groupMembers')
            .find(obs => obs.get('concept').get('uuid') === concept.CARDEX_TIME)
        : '';
      const timeValues = timeObs ? timeObs.get('value') : '';

      const timeValue = dateTimeUtcToLocal(timeValues);

      return Map({
        uuid: notes.get('uuid'),
        concept: notes.get('concept').get('uuid'),
        notesValue,
        timeValue,
        timeDisplay: moment(timeValue).format('HH:mm'),
        obsDatetime: notes.get('obsDatetime'),
        hasEdit,
        voided: notes.get('voided'),
        type:
          notes.get('concept').get('uuid') === concept.DOCTOR_NOTES
            ? 'Doctor'
            : 'Nurse',
        groupMembers: notes.get('groupMembers'),
        encounter: notes.get('encounter'),
      });
    });
  }
);

/**
 * Get uuids of Referral observations in the current visit
 * @return {function} a memoized selector function
 */

export const getReferralObservationsUuids = createSelector(
  [getReferralEncounterUuidsForVisit, getEncounters, getObservations],
  (referralEncountersUuids, encounters, observations) => {
    const observationsByEncounters = referralEncountersUuids.map(
      encounterUuid => {
        const encounter = encounters.get(encounterUuid);
        return (
          encounter
            .get('obs')
            // remove voided obs
            .filter(obsUuid => !observations.getIn([obsUuid, 'voided']))
        );
      }
    );
    return List(observationsByEncounters).flatten(true);
  }
);

/**
 * Get denormalized referral observation
 * @return {function} a memoized selector function
 */
export const selectReferralObservations = createSelector(
  [getReferralObservationsUuids, getEntities],
  (referralObservationsUuids, entities) => {
    return denormalize(referralObservationsUuids, [obsSchema], entities);
  }
);
/**
 * Select all data needed by the Refer Patient Container
 * @return {function} a memoized selector function
 */
export const selectReferralContainerData = createSelector(
  selectReferralObservations,
  referralObservations => {
    return referralObservations.map(notes => {
      const notesObs = notes.get('groupMembers')
        ? notes
            .get('groupMembers')
            .find(
              obs =>
                obs.get('concept').get('uuid') === concept.REASON_FOR_REFERRAL
            )
        : '';
      const notesValues = notesObs ? notesObs.get('display') : '';
      const notesConceptName = notesObs
        ? notesObs.get('concept').get('display')
        : '';
      const notesValue =
        notesConceptName.length + 2 < notesValues.length
          ? notesValues.substring(
              notesConceptName.length + 2,
              notesValues.length
            )
          : '';

      const facilityObs = notes.get('groupMembers')
        ? notes
            .get('groupMembers')
            .find(
              obs =>
                obs.get('concept').get('uuid') === concept.REFERRAL_FACILITY
            )
        : '';
      const facilityValues = facilityObs ? facilityObs.get('display') : '';
      const facilityConceptName = facilityObs
        ? facilityObs.get('concept').get('display')
        : '';
      const facilityValue =
        facilityConceptName.length + 2 < facilityValues.length
          ? facilityValues.substring(
              facilityConceptName.length + 2,
              facilityValues.length
            )
          : '';

      const timeObs = notes.get('groupMembers')
        ? notes
            .get('groupMembers')
            .find(
              obs => obs.get('concept').get('uuid') === concept.REFERRAL_TIME
            )
        : '';
      const timeValues = timeObs ? timeObs.get('value') : '';

      const timeValue = dateTimeUtcToLocal(timeValues);

      return Map({
        uuid: notes.get('uuid'),
        concept: notes.get('concept').get('uuid'),
        notesValue: `${facilityValue} - ${notesValue}`,
        timeValue,
        timeDisplay: moment(timeValue).format('HH:mm'),
        obsDatetime: notes.get('obsDatetime'),
        voided: notes.get('voided'),
        groupMembers: notes.get('groupMembers'),
        encounter: notes.get('encounter'),
      });
    });
  }
);

/**
 * Get uuids of Discharge observations in the current visit
 * @return {function} a memoized selector function
 */

export const getDischargeObservationsUuids = createSelector(
  [getDischargeEncounterUuidsForVisit, getEncounters, getObservations],
  (dischargeEncountersUuids, encounters, observations) => {
    const observationsByEncounters = dischargeEncountersUuids.map(
      encounterUuid => {
        const encounter = encounters.get(encounterUuid);
        return (
          encounter
            .get('obs')
            // remove voided obs
            .filter(obsUuid => !observations.getIn([obsUuid, 'voided']))
        );
      }
    );
    return List(observationsByEncounters).flatten(true);
  }
);

/**
 * Get denormalized discharge observation
 * @return {function} a memoized selector function
 */
export const selectDischargeObservations = createSelector(
  [getDischargeObservationsUuids, getEntities],
  (dischargeObservationsUuids, entities) => {
    return denormalize(dischargeObservationsUuids, [obsSchema], entities);
  }
);
/**
 * Select all data needed by the Discharge Patient Container
 * @return {function} a memoized selector function
 */
export const selectDischargeContainerData = createSelector(
  selectDischargeObservations,
  dischargeObservations => {
    return dischargeObservations.map(notes => {
      const notesObs = notes.get('groupMembers')
        ? notes
            .get('groupMembers')
            .find(obs => obs.get('concept').get('uuid') === concept.NOTES)
        : '';
      const notesValues = notesObs ? notesObs.get('display') : '';
      const notesConceptName = notesObs
        ? notesObs.get('concept').get('display')
        : '';
      const notesValue =
        notesConceptName.length + 2 < notesValues.length
          ? notesValues.substring(
              notesConceptName.length + 2,
              notesValues.length
            )
          : '';

      const timeObs = notes.get('groupMembers')
        ? notes
            .get('groupMembers')
            .find(
              obs => obs.get('concept').get('uuid') === concept.DISCHARGE_TIME
            )
        : '';
      const timeValues = timeObs ? timeObs.get('value') : '';

      const timeValue = dateTimeUtcToLocal(timeValues);
      return Map({
        uuid: notes.get('uuid'),
        concept: notes.get('concept').get('uuid'),
        notesValue,
        timeValue,
        timeDisplay: moment(timeValue).format('HH:mm'),
        obsDatetime: notes.get('obsDatetime'),
        voided: notes.get('voided'),
        groupMembers: notes.get('groupMembers'),
        encounter: notes.get('encounter'),
      });
    });
  }
);
