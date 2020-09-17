import { encounterType } from '../../uuid';

export const createDischargePatientEncounter = (
  { encounterUuid, patientUuid, visitUuid },
  obs
) => {
  const encounter = {
    uuid: encounterUuid,
    encounterType: encounterType.DISCHARGE_ENCOUNTER_TYPE_UUID,
    patient: patientUuid,
    visit: visitUuid,
  };

  encounter.obs = [obs];

  return encounter;
};
