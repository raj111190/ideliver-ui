import { encounterType } from '../../uuid';

export const createObservation = (
  value,
  conceptUuid,
  encounterUuid,
  patientUuid
) => {
  const now = new Date();
  return {
    encounter: { uuid: encounterUuid },
    person: { uuid: patientUuid },
    obsDatetime: now,
    concept: {
      uuid: conceptUuid,
    },
    value,
  };
};

export const createVoidedObservation = (
  value,
  conceptUuid,
  encounterUuid,
  patientUuid,
  obsDatetime,
  uuid
) => {
  return {
    encounter: { uuid: encounterUuid },
    person: { uuid: patientUuid },
    obsDatetime,
    concept: {
      uuid: conceptUuid,
    },
    uuid,
    voided: true,
    value,
  };
};

export const createNotesObservation = (
  groupMembers,
  conceptUuid,
  encounterUuid,
  patientUuid
) => {
  const now = new Date();
  return {
    encounter: { uuid: encounterUuid },
    person: { uuid: patientUuid },
    obsDatetime: now,
    concept: {
      uuid: conceptUuid,
    },
    groupMembers,
  };
};

export const createVoidedNotesObservation = (
  groupMembers,
  conceptUuid,
  encounterUuid,
  patientUuid,
  obsDatetime,
  uuid
) => {
  return {
    encounter: { uuid: encounterUuid },
    person: { uuid: patientUuid },
    obsDatetime,
    concept: {
      uuid: conceptUuid,
    },
    groupMembers,
    uuid,
    voided: true,
  };
};

export const createPatientNotesEncounter = (
  { encounterUuid, patientUuid, visitUuid },
  obs
) => {
  const encounter = {
    uuid: encounterUuid,
    encounterType: encounterType.VISIT_NOTES_ENCOUNTER_TYPE_UUID,
    patient: patientUuid,
    visit: visitUuid,
  };

  encounter.obs = [obs];

  return encounter;
};
