import { encounterType } from '../../uuid';

export const createReferPatientEncounter = (
  { encounterUuid, patientUuid, visitUuid },
  obs
) => {
  const encounter = {
    uuid: encounterUuid,
    encounterType: encounterType.REFERRAL_ENCOUNTER_TYPE_UUID,
    patient: patientUuid,
    visit: visitUuid,
  };

  encounter.obs = [obs];

  return encounter;
};
