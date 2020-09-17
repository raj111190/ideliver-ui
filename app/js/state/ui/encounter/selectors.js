import { List } from 'immutable';
import { createSelector } from 'reselect';
import { encounterType } from '../../../uuid';
import { getCurrentEpisode } from '../episode/selectors';
import { getEncounters } from '../../entities/selectors';
import { getCurrentVisit } from '../visit/selectors';

/**
 * Computes patient's program status based on the forms saved
 * @return {function} a memoized selector function
 */
export const getProgramStatus = createSelector([getEncounters], encounters => {
  if (!encounters) return 'Intake';
  if (
    encounters.find(encounter => {
      return (
        encounter.get('encounterType') ===
          encounterType.PNC_ENCOUNTER_TYPE_UUID ||
        encounter.get('encounterType') ===
          encounterType.DISCHARGE_ENCOUNTER_TYPE_UUID
      );
    })
  )
    return 'PNC';

  if (
    encounters.find(
      encounter =>
        encounter.get('encounterType') ===
          encounterType.LABOR_SIGNS_ENCOUNTER_TYPE_UUID ||
        encounter.get('encounterType') ===
          encounterType.FETUS_ASSESSMENT_ENCOUNTER_TYPE_UUID ||
        encounter.get('encounterType') ===
          encounterType.GENERAL_ASSESSMENT_ENCOUNTER_TYPE_UUID ||
        encounter.get('encounterType') ===
          encounterType.ACTIVE_LABOR_ENCOUNTER_TYPE_UUID ||
        encounter.get('encounterType') ===
          encounterType.LABOUR_SUMMARY_ENCOUNTER_TYPE_UUID
    )
  )
    return 'Labor';

  if (
    encounters.find(
      encounter =>
        encounter.get('encounterType') ===
          encounterType.ANC_ENCOUNTER_TYPE_UUID ||
        encounter.get('encounterType') ===
          encounterType.ANC_SUMMARY_ENCOUNTER_TYPE_UUID
    )
  )
    return 'ANC';

  return 'Intake';
});

/**
 * Get the encounters uuids for the current episode
 * @return {function} a memoized selector function
 */
export const getEncountersUuidsForEpisode = createSelector(
  [getCurrentEpisode],
  episode => {
    if (!episode) return [];
    return episode.get('encounters');
  }
);

/**
 * Get the encounters for the current episode
 * @return {function} a memoized selector function
 */
export const getEncountersForEpisode = createSelector(
  [getCurrentEpisode, getEncounters],
  (episode, encounters) => {
    if (!episode || !encounters) return [];
    const encounterUuids = episode.get('encounters');
    return encounterUuids.map(uuid => encounters.get(uuid));
  }
);

/**
 * Get the encounter uuids for the current visit
 * @return {function} a memoized selector function
 */
export const getEncountersUuidsForVisit = createSelector(
  [getCurrentVisit],
  visit => {
    if (!visit) return [];
    return visit.get('encounters');
  }
);

/**
 * Get the diagnosis encounter
 * @return {function} a memoized selector function
 */
export const getDiagnosisEncounterUuidsForEpisode = createSelector(
  [getEncountersUuidsForEpisode, getEncounters],
  (encountersUuids, encounters) => {
    if (!encountersUuids || !encounters) return List();
    return encountersUuids.filter(uuid => {
      const encounter = encounters.get(uuid);
      return (
        encounter &&
        encounter.get('encounterType') ===
          encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID
      );
    });
  }
);

/**
 * Get the Visit Notes encounter
 * @return {function} a memoized selector function
 */
export const getVisitNotesEncounterUuidsForVisit = createSelector(
  [getEncountersUuidsForVisit, getEncounters],
  (encountersUuids, encounters) => {
    if (!encountersUuids || !encounters) return List();
    return encountersUuids.filter(uuid => {
      const encounter = encounters.get(uuid);
      return (
        encounter &&
        encounter.get('encounterType') ===
          encounterType.VISIT_NOTES_ENCOUNTER_TYPE_UUID
      );
    });
  }
);

/**
 * Get the Referral encounter
 * @return {function} a memoized selector function
 */
export const getReferralEncounterUuidsForVisit = createSelector(
  [getEncountersUuidsForVisit, getEncounters],
  (encountersUuids, encounters) => {
    if (!encountersUuids || !encounters) return List();
    return encountersUuids.filter(uuid => {
      const encounter = encounters.get(uuid);
      return (
        encounter &&
        encounter.get('encounterType') ===
          encounterType.REFERRAL_ENCOUNTER_TYPE_UUID
      );
    });
  }
);

/**
 * Get the Referral encounter
 * @return {function} a memoized selector function
 */
export const getDischargeEncounterUuidsForVisit = createSelector(
  [getEncountersUuidsForVisit, getEncounters],
  (encountersUuids, encounters) => {
    if (!encountersUuids || !encounters) return List();
    return encountersUuids.filter(uuid => {
      const encounter = encounters.get(uuid);
      return (
        encounter &&
        encounter.get('encounterType') ===
          encounterType.DISCHARGE_ENCOUNTER_TYPE_UUID
      );
    });
  }
);
