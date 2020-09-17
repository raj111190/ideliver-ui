import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { Map } from 'immutable';
import moment from 'moment';
import {
  getEncounters,
  getVisits,
  getEntities,
  getVisitAttributes,
} from '../../entities/selectors';
import { getCurrentPatient } from '../patient/selectors';
import { getOBHistoryData, getGeneralInfoData } from '../form/selectors';
import {
  obsSchema,
  encounterTypeSchema,
  personSchema,
} from '../../representations';
import {
  formField,
  encounterType,
  allForms,
  visitAttributeType,
} from '../../../uuid';

export const isAcuityEncounter = enc =>
  enc.get('encounterType') === encounterType.ACUITY_ENCOUNTER_TYPE_UUID;

export const isDiagnosisEncounter = enc =>
  enc.get('encounterType') === encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID;

export const isiDeliverForm = formUuid =>
  Object.values(allForms).includes(formUuid);

export const getCurrentVisitUuid = state =>
  state.ui.visit ? state.ui.visit.getIn(['currentVisit']) : undefined;

/**
 * Get the current visit
 * @return {function} a memoized selector function
 */
export const getCurrentVisit = createSelector(
  [getVisits, getCurrentVisitUuid],
  (visits, visitUuid) => {
    if (!visits || !visitUuid) return undefined;
    return visits.get(visitUuid);
  }
);

export const hasVisitEnded = createSelector([getCurrentVisit], currentVisit => {
  if (!currentVisit) return false;
  return !!currentVisit.get('stopDatetime');
});

export const getPatientStatus = visitAttributes => {
  if (!visitAttributes || !visitAttributes.size) return null;
  return visitAttributes.find(
    attribute =>
      attribute &&
      attribute.get('attributeType') === visitAttributeType.PATIENT_STATUS
  );
};

export const getVisitUuidForEncounter = (state, encounterUuid) => {
  if (encounterUuid) {
    const encounters = getEncounters(state);
    const currentEncounter = encounters.get(encounterUuid);
    return currentEncounter.get('visit');
  }
  return undefined;
};

/**
 * Get the encounters for the current episode
 * @return {function} a memoized selector function
 */
export const getEncountersForVisit = createSelector(
  [getCurrentVisit, getEncounters],
  (visit, encounters) => {
    if (!visit || !encounters) return [];
    const encounterUuids = visit.get('encounters');
    return encounterUuids.map(uuid => encounters.get(uuid));
  }
);

export const getActiveVisitData = createSelector(
  [
    getCurrentVisit,
    getVisitAttributes,
    getCurrentPatient,
    getEncountersForVisit,
    getEntities,
    getOBHistoryData,
    getGeneralInfoData,
    getEncounters,
  ],
  (
    visitData,
    visitAttributes,
    patientData,
    encounterData,
    entities,
    obhistory,
    generalInfo,
    savedEncounters
  ) => {
    const activeVisit = {};
    const timeline = [];
    if (patientData && entities) {
      const person = denormalize(
        patientData.get('person'),
        personSchema,
        entities
      );
      if (person) {
        activeVisit.person = {
          uuid: person.get('uuid'),
          age: person.get('age'),
          givenName: person.get('preferredName').get('givenName'),
          familyName: person.get('preferredName').get('familyName'),
        };
      }
    }
    if (encounterData && entities) {
      encounterData.forEach(enc => {
        if (isAcuityEncounter(enc)) {
          const obs = denormalize(enc.get('obs'), [obsSchema], entities);
          const acuityDisplay = obs
            .toArray()[0]
            .get('value')
            .get('display');
          activeVisit.acuity = parseInt(acuityDisplay.slice(-1), 10);
        } else if (isDiagnosisEncounter(enc)) {
          activeVisit.diagnosisEncounterUuid = enc.get('uuid');
        }
      });
    }
    if (savedEncounters) {
      savedEncounters.forEach(enc => {
        if (enc.get('form') && isiDeliverForm(enc.get('form').get('uuid'))) {
          const mssg = denormalize(
            enc.get('encounterType'),
            encounterTypeSchema,
            entities
          ).get('display');
          const tmstmp = enc.get('auditInfo').get('dateChanged')
            ? enc.get('auditInfo').get('dateChanged')
            : enc.get('auditInfo').get('dateCreated');
          timeline.push({
            message: mssg,
            timeStamp: tmstmp,
          });
        }
      });
    }
    activeVisit.timeline = timeline.sort(function(left, right) {
      return moment.utc(left.timeStamp).diff(moment.utc(right.timeStamp));
    });

    activeVisit.uuid = visitData ? visitData.get('uuid') : null;
    activeVisit.startDatetime = visitData
      ? visitData.get('startDatetime')
      : null;
    activeVisit.stopDatetime = visitData ? visitData.get('stopDatetime') : null;

    if (obhistory) {
      const gravidity = obhistory.get(formField.OB_GRAVIDITY_UUID);
      const live = obhistory.get(formField.OB_LIVE_UUID);
      const gestationalAge = obhistory.get(formField.OB_GESTATIONAL_AGE_UUID);
      const lmp = obhistory.get(formField.OB_LAST_MENSTRUAL_PERIOD_UUID);

      if (gestationalAge && gestationalAge.get('value')) {
        activeVisit.OBWeeks = gestationalAge.get('value');
      } else if (lmp && lmp.get('value')) {
        const today = moment.utc();
        const lmpDay = moment.utc(lmp.get('value'));
        const timeDiffInWeeks = today.diff(lmpDay, 'week');
        activeVisit.OBWeeks = Math.floor(timeDiffInWeeks);
      } else {
        activeVisit.OBWeeks = null;
      }

      activeVisit.OBGravidity = gravidity ? gravidity.get('value') : null;
      activeVisit.OBLive = live ? live.get('value') : null;
    }

    if (generalInfo) {
      const companionName = generalInfo.get(
        formField.GI_BIRTH_COMPANION_NAME_UUID
      );
      activeVisit.companionName = companionName
        ? companionName.get('value')
        : null;
    }

    const activeVisitAttributes =
      visitData && visitAttributes
        ? visitData.get('attributes').map(uuid => visitAttributes.get(uuid))
        : null;
    activeVisit.patientStatus = visitData
      ? getPatientStatus(activeVisitAttributes)
      : undefined;

    return Map(activeVisit);
  }
);
