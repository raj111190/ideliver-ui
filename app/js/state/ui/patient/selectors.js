import { createSelector } from 'reselect';
import { getPatients } from '../../entities/selectors';

export const getCurrentPatientUuid = state =>
  state.ui.patient ? state.ui.patient.getIn(['currentPatient']) : undefined;

/**
 * Get the current patient
 * @return {function} a memoized selector function
 */
export const getCurrentPatient = createSelector(
  [getPatients, getCurrentPatientUuid],
  (patients, patientUuid) => {
    if (!patients || !patientUuid) return undefined;
    return patients.get(patientUuid);
  }
);
