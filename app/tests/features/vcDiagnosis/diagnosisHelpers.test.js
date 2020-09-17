import {
  confirmDiagnosis,
  createConfirmedDiagnosisObservation,
  createDiagnosisEncounter,
  voidDiagnosis,
  resolveDiagnosis,
} from '../../../js/features/vcDiagnosis/diagnosisHelpers';
import { conceptClass, conceptDataType, encounterType } from '../../../js/uuid';

describe('Diagnosis helpers', () => {
  it('should create confirmed diagnosis', () => {
    const confirmedDiagnosis = createConfirmedDiagnosisObservation(
      '123',
      '124',
      '125'
    );
    expect(confirmedDiagnosis.encounter.uuid).toEqual('124');
    expect(confirmedDiagnosis.person.uuid).toEqual('125');
    expect(confirmedDiagnosis.concept.uuid).toEqual(
      conceptClass.VISIT_DIAGNOSIS_CONCEPT_UUID
    );
    expect(confirmedDiagnosis.groupMembers.length).toEqual(3);
    expect(confirmedDiagnosis.groupMembers[2].value.uuid).toEqual('123');
  });

  it('should void diagnosis', () => {
    const confirmedDiagnosis = createConfirmedDiagnosisObservation(
      '123',
      '124',
      '125'
    );
    const voidedDiagnosis = voidDiagnosis(confirmedDiagnosis);
    expect(voidedDiagnosis.voided).toBe(true);
  });

  it('should confirm diagnosis', () => {
    const diagnosisObservation = {
      uuid: 'a123',
      concept: {
        uuid: conceptClass.VISIT_DIAGNOSIS_CONCEPT_UUID,
      },
      groupMembers: [
        {
          concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
          value: { uuid: 'a13' },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
          value: {
            uuid: conceptClass.PRESUMED_DIAGNOSIS_UUID,
            datatype: {
              uuid: conceptDataType.NA,
            },
            conceptClass: {
              uuid: conceptClass.MISC,
            },
            attributes: [],
          },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID },
          value: { uuid: 'c123' },
        },
      ],
    };

    const diagnosisObservation2 = {
      uuid: 'a123',
      concept: {
        uuid: conceptClass.VISIT_DIAGNOSIS_CONCEPT_UUID,
      },
      groupMembers: [
        {
          concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
          value: { uuid: 'a13' },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID },
          value: { uuid: 'c123' },
        },
      ],
    };

    const expectedObservation = {
      uuid: 'a123',
      concept: {
        uuid: conceptClass.VISIT_DIAGNOSIS_CONCEPT_UUID,
      },
      groupMembers: [
        {
          concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
          value: { uuid: 'a13' },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
          value: {
            uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
            datatype: {
              uuid: conceptDataType.NA,
            },
            conceptClass: {
              uuid: conceptClass.MISC,
            },
            attributes: [],
          },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID },
          value: { uuid: 'c123' },
        },
      ],
    };

    expect(confirmDiagnosis(diagnosisObservation)).toEqual(expectedObservation);
    expect(confirmDiagnosis(diagnosisObservation2)).toEqual(
      diagnosisObservation2
    );
  });

  it('should resolve diagnosis', () => {
    const diagnosisObservation = {
      uuid: 'a123',
      concept: {
        uuid: conceptClass.VISIT_DIAGNOSIS_CONCEPT_UUID,
      },
      groupMembers: [
        {
          concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
          value: { uuid: 'a13' },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
          value: {
            uuid: conceptClass.PRESUMED_DIAGNOSIS_UUID,
            datatype: {
              uuid: conceptDataType.NA,
            },
            conceptClass: {
              uuid: conceptClass.MISC,
            },
            attributes: [],
          },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID },
          value: { uuid: 'c123' },
        },
      ],
    };

    const diagnosisObservation2 = {
      uuid: 'a123',
      concept: {
        uuid: conceptClass.VISIT_DIAGNOSIS_CONCEPT_UUID,
      },
      groupMembers: [
        {
          concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
          value: { uuid: 'a13' },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID },
          value: { uuid: 'c123' },
        },
      ],
    };

    const expectedObservation = {
      uuid: 'a123',
      concept: {
        uuid: conceptClass.VISIT_DIAGNOSIS_CONCEPT_UUID,
      },
      groupMembers: [
        {
          concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
          value: { uuid: 'a13' },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
          value: {
            uuid: conceptClass.RESOLVED_DIAGNOSIS_UUID,
            datatype: {
              uuid: conceptDataType.NA,
            },
            conceptClass: {
              uuid: conceptClass.MISC,
            },
            attributes: [],
          },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID },
          value: { uuid: 'c123' },
        },
      ],
    };

    expect(resolveDiagnosis(diagnosisObservation)).toEqual(expectedObservation);
    expect(resolveDiagnosis(diagnosisObservation2)).toEqual(
      diagnosisObservation2
    );
  });

  it('should create a diagnosis encounter ', () => {
    const confirmedDiagnosis = createConfirmedDiagnosisObservation(
      '123',
      '124',
      '125'
    );

    const diagnosisEncounter = createDiagnosisEncounter(
      { encounterUuid: '123', patientUuid: '124', visitUuid: '125' },
      [confirmedDiagnosis]
    );
    expect(diagnosisEncounter.uuid).toBe('123');
    expect(diagnosisEncounter.patient).toBe('124');
    expect(diagnosisEncounter.visit).toBe('125');
    expect(diagnosisEncounter.encounterType).toBe(
      encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID
    );
    expect(diagnosisEncounter.obs).toEqual([confirmedDiagnosis]);
  });
});
