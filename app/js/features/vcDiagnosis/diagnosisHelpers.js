import { pick } from 'lodash';
import { conceptClass, conceptDataType, encounterType } from '../../uuid';

export const voidDiagnosis = diagnosis => {
  const concept = pick(diagnosis.concept, ['uuid', 'display']);
  return { ...diagnosis, ...{ voided: true, concept } };
};

export const resolveDiagnosis = diagnosis => {
  const resolved = {
    uuid: conceptClass.RESOLVED_DIAGNOSIS_UUID,
    datatype: {
      uuid: conceptDataType.NA,
    },
    conceptClass: {
      uuid: conceptClass.MISC,
    },
    attributes: [],
  };

  const updatedMembers = diagnosis.groupMembers.map(member => {
    const { concept: certainty } = member;
    if (certainty && certainty.uuid === conceptClass.DIAGNOSIS_CERTAINTY_UUID) {
      return { ...member, ...{ value: resolved } };
    }
    return member;
  });

  const concept = pick(diagnosis.concept, ['uuid', 'display']);
  return {
    ...diagnosis,
    ...{ groupMembers: updatedMembers, concept },
  };
};

export const confirmDiagnosis = diagnosis => {
  if (!diagnosis) return {};
  const confirmed = {
    uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
    datatype: {
      uuid: conceptDataType.NA,
    },
    conceptClass: {
      uuid: conceptClass.MISC,
    },
    attributes: [],
  };

  const updatedMembers = diagnosis.groupMembers.map(member => {
    const { concept: certainty } = member;
    if (certainty && certainty.uuid === conceptClass.DIAGNOSIS_CERTAINTY_UUID) {
      return { ...member, ...{ value: confirmed } };
    }
    return member;
  });

  const concept = pick(diagnosis.concept, ['uuid', 'display']);
  return {
    ...diagnosis,
    ...{ groupMembers: updatedMembers, concept },
  };
};

export const createConfirmedDiagnosisObservation = (
  diagnosisConceptUuid,
  encounterUuid,
  patientUuid
) => {
  const now = new Date();
  return {
    encounter: { uuid: encounterUuid },
    person: { uuid: patientUuid },
    obsDatetime: now,
    concept: {
      uuid: conceptClass.VISIT_DIAGNOSIS_CONCEPT_UUID,
    },
    groupMembers: [
      {
        concept: {
          uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID,
        },
        value: {
          uuid: conceptClass.PRIMARY_DIAGNOSIS_VALUE_UUID,
        },
        encounter: { uuid: encounterUuid },
        person: { uuid: patientUuid },
        obsDatetime: now,
      },
      {
        concept: {
          uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID,
        },
        value: {
          uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
        },
        encounter: { uuid: encounterUuid },
        person: { uuid: patientUuid },
        obsDatetime: now,
      },
      {
        concept: {
          uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID,
        },
        value: {
          uuid: diagnosisConceptUuid,
        },
        encounter: { uuid: encounterUuid },
        person: { uuid: patientUuid },
        obsDatetime: now,
      },
    ],
  };
};

export const createDiagnosisEncounter = (
  { encounterUuid, patientUuid, visitUuid },
  obs
) => {
  const encounter = {
    uuid: encounterUuid,
    encounterType: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
    patient: patientUuid,
    visit: visitUuid,
  };

  encounter.obs = [...obs];

  return encounter;
};
