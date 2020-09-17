import { denormalize, normalize } from 'normalizr';
import { fromJS } from 'immutable';
import moment from 'moment-timezone';
import {
  conceptAttributeType,
  conceptClass,
  conceptDataType,
  encounterType,
  validDiagnoses,
  concept,
} from '../../../../js/uuid';
import {
  encountersSchema,
  obsSchema,
} from '../../../../js/state/representations';
import {
  getDiagnosisObservationsUuids,
  selectDiagnosisObservations,
  helper as obsHelper,
  selectDiagnosisContainerData,
  selectResolvedDiagnoses,
  getVisitNotesObservationsUuids,
  selectVisitNotesObservations,
  selectVisitNotesContainerData,
  getReferralObservationsUuids,
  selectReferralObservations,
  selectReferralContainerData,
  getDischargeObservationsUuids,
  selectDischargeObservations,
  selectDischargeContainerData,
  dateTimeUtcToLocal,
} from '../../../../js/state/ui/obs/selectors';
import {
  patientDiagnoses,
  possibleDiagnoses,
  conceptToObsMap,
} from '../../../features/vcDiagnosis/vcDiagnosis.test';

describe('observation selectors', () => {
  let patient1Encounters;
  const currentDateTime = moment().toString();
  beforeEach(() => {
    patient1Encounters = [
      {
        uuid: '123',
        display: 'test 1',
        patient: { uuid: '123', display: 'patient 123' },
        encounterType: {
          uuid: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
          display: 'diagnosis encounter',
        },
        obs: [
          { uuid: '456', display: 'obs1' },
          { uuid: '789', display: 'obs2' },
        ],
      },
      {
        uuid: '124',
        display: 'test 2',
        patient: { uuid: '123', display: 'patient 123' },
        encounterType: {
          uuid: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
          display: 'diagnosis encounter',
        },
        obs: [
          { uuid: '556', display: 'obs1' },
          { uuid: '589', display: 'obs2' },
        ],
      },
      {
        uuid: '555',
        display: 'test 3',
        patient: { uuid: '123', display: 'patient 123' },
        encounterType: {
          uuid: encounterType.VISIT_NOTES_ENCOUNTER_TYPE_UUID,
          display: 'visit note encounter',
        },
        obs: [
          { uuid: '6789', display: 'obs1' },
          { uuid: '2345', display: 'obs2' },
        ],
      },
      {
        uuid: '666',
        display: 'test 4',
        patient: { uuid: '123', display: 'patient 123' },
        encounterType: {
          uuid: encounterType.VISIT_NOTES_ENCOUNTER_TYPE_UUID,
          display: 'visit note encounter',
        },
        obs: [
          { uuid: '1234', display: 'obs1' },
          { uuid: '3456', display: 'obs2' },
        ],
      },
      {
        uuid: '777',
        display: 'test 5',
        patient: { uuid: '123', display: 'patient 123' },
        encounterType: {
          uuid: encounterType.REFERRAL_ENCOUNTER_TYPE_UUID,
          display: 'Referral encounter',
        },
        obs: [
          { uuid: '12345', display: 'obs11' },
          { uuid: '34567', display: 'obs21' },
        ],
      },
    ];
  });

  it('should select uuids of diagnosis observations', () => {
    const diagnosisEncounters = normalize(patient1Encounters, encountersSchema);
    const { encounters } = diagnosisEncounters.entities;
    const diagnosisEncounterUuids = Object.keys(encounters);

    const obsUuids = fromJS(
      Object.keys(diagnosisEncounters.entities.observations)
    );
    const diagnosisObservationsUuids = getDiagnosisObservationsUuids.resultFunc(
      fromJS(diagnosisEncounterUuids),
      fromJS(encounters),
      fromJS(diagnosisEncounters.entities.observations)
    );

    expect(diagnosisObservationsUuids.sort()).toEqual(obsUuids.sort());
  });

  it('should select denormalized diagnosis observations', () => {
    const diagnosisObservationsUuids = ['456', '556', '589'];
    const normalized = normalize(patient1Encounters, encountersSchema);

    const { entities } = normalized;
    const denormalized = denormalize(
      diagnosisObservationsUuids,
      [obsSchema],
      entities
    );

    const selectedDiagnosisObs = selectDiagnosisObservations.resultFunc(
      fromJS(diagnosisObservationsUuids),
      fromJS(entities)
    );

    expect(selectedDiagnosisObs).toEqual(fromJS(denormalized));
  });

  it('should select diagnosis data for the diagnosis container', () => {
    const allDiagnosis = validDiagnoses.sort((a, b) => {
      return a.display > b.display ? 1 : -1;
    });
    const sortedPatientDiagnoses = patientDiagnoses.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    const diagnosisObservations = Object.values(conceptToObsMap);
    const diagnosisData = selectDiagnosisContainerData.resultFunc(
      fromJS(diagnosisObservations),
      fromJS([allDiagnosis[5].uuid]),
      fromJS([allDiagnosis[0].uuid, allDiagnosis[6].uuid])
    );

    expect(diagnosisData.get('conceptToObsMap')).toEqual(
      fromJS(conceptToObsMap)
    );
    expect(diagnosisData.get('patientDiagnoses')).toEqual(
      fromJS(sortedPatientDiagnoses)
    );
    expect(diagnosisData.get('possibleDiagnoses')).toEqual(
      fromJS(possibleDiagnoses)
    );

    expect(diagnosisData.get('confirmedDiagnoses')).toEqual(
      fromJS([validDiagnoses[5]])
    );
    expect(diagnosisData.get('addedDiagnoses')).toEqual(
      fromJS([validDiagnoses[5].uuid])
    );
    expect(diagnosisData.get('removedDiagnoses')).toEqual(
      fromJS([validDiagnoses[0].uuid, validDiagnoses[6].uuid])
    );
  });

  it('should select resolved diagnosis problem names from the diagnosis container', () => {
    const diagnosisConceptToObsMap = {
      '190019DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
        uuid: 'fc583dcf-4cbc-4d35-96e1-71f629a5a2ec',
        display: 'Visit Diagnoses: Confirmed diagnosis, Active Labor, Primary',
        voided: false,
        obsDatetime: '2019-08-20T17:28:47.000-0400',
        concept: {
          uuid: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Visit Diagnoses',
          datatype: {
            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
            display: 'N/A',
          },
          conceptClass: {
            uuid: '8d492594-c2cc-11de-8d13-0010c6dffd0f',
            display: 'ConvSet',
          },
          attributes: [],
        },
        value: null,
        groupMembers: [
          {
            uuid: '695fdfec-3417-4437-be6e-9ca637f3b413',
            display: 'Diagnosis certainty: Confirmed diagnosis',
            voided: false,
            obsDatetime: '2019-08-20T17:28:47.000-0400',
            concept: {
              uuid: '159394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Diagnosis certainty',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Finding',
              },
              attributes: [],
            },
            value: {
              uuid: '159392AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Confirmed diagnosis',
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Misc',
              },
              attributes: [],
            },
            encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
          },
          {
            uuid: 'dd1b3c17-ce87-4841-8b01-60a91aa54361',
            display: 'PROBLEM LIST: Active Labor',
            voided: false,
            obsDatetime: '2019-08-20T17:28:47.000-0400',
            concept: {
              uuid: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'PROBLEM LIST',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Finding',
              },
              attributes: [],
            },
            value: {
              uuid: '190019DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Active Labor',
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '0211893d-98df-41ab-8df7-6999f2a3ec45',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
            },
            encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
          },
          {
            uuid: '206d1f1e-66cf-4693-a5ef-153537f5fd45',
            display: 'Diagnosis order: Primary',
            voided: false,
            obsDatetime: '2019-08-20T17:28:47.000-0400',
            concept: {
              uuid: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Diagnosis order',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Finding',
              },
              attributes: [],
            },
            value: {
              uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Primary',
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Misc',
              },
              attributes: [],
            },
            encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
          },
        ],
        encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
      },
      '190021DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
        uuid: 'b145af94-7777-4ae2-aa09-e72af8758a77',
        display: 'Visit Diagnoses: Resolved diagnosis, Primary, Anemia',
        voided: false,
        obsDatetime: '2019-08-20T17:28:47.000-0400',
        concept: {
          uuid: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Visit Diagnoses',
          datatype: {
            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
            display: 'N/A',
          },
          conceptClass: {
            uuid: '8d492594-c2cc-11de-8d13-0010c6dffd0f',
            display: 'ConvSet',
          },
          attributes: [],
        },
        value: null,
        groupMembers: [
          {
            uuid: 'de1e5b8f-d08b-4c64-821c-313be17a5344',
            display: 'Diagnosis certainty: Resolved diagnosis',
            voided: false,
            obsDatetime: '2019-08-20T17:28:47.000-0400',
            concept: {
              uuid: '159394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Diagnosis certainty',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Finding',
              },
              attributes: [],
            },
            value: {
              uuid: 'f2b20b71-f2a1-4e39-9e88-cb18ed44ff1b',
              display: 'Resolved diagnosis',
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Misc',
              },
              attributes: [],
            },
            encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
          },
          {
            uuid: 'dd0ac468-76af-4bae-b767-71a69cb387aa',
            display: 'Diagnosis order: Primary',
            voided: false,
            obsDatetime: '2019-08-20T17:28:47.000-0400',
            concept: {
              uuid: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Diagnosis order',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Finding',
              },
              attributes: [],
            },
            value: {
              uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Primary',
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Misc',
              },
              attributes: [],
            },
            encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
          },
          {
            uuid: 'bbde5bb0-a249-4b28-9f50-c01fffc90f8c',
            display: 'PROBLEM LIST: Anemia',
            voided: false,
            obsDatetime: '2019-08-20T17:28:47.000-0400',
            concept: {
              uuid: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'PROBLEM LIST',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Finding',
              },
              attributes: [],
            },
            value: {
              uuid: '190021DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Anemia',
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: 'ec44bb06-d502-4fc7-8857-03eb117f769f',
                  display: 'Diagnosis Acuity: 2',
                  value: '2',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
            },
            encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
          },
        ],
        encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
      },
    };
    const diagnosisObservations = Object.values(diagnosisConceptToObsMap);
    const results = selectResolvedDiagnoses.resultFunc(
      fromJS(diagnosisObservations)
    );

    expect(results).toEqual(fromJS(['Anemia']));
  });

  describe('observation helpers', () => {
    it('should get the diagnosis property', () => {
      const diagnosisObservation = {
        uuid: 'a123',
        groupMembers: [
          {
            concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
            value: { uuid: 'a13' },
          },
          {
            concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
            value: {
              uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
              display: 'Confirmed diagnosis',
              datatype: {
                uuid: conceptDataType.NA,
                display: 'N/A',
              },
              conceptClass: {
                uuid: conceptClass.MISC,
                display: 'Misc',
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

      const noGroupMembers = obsHelper.getDiagnosisProperty(
        undefined,
        conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID
      );
      expect(noGroupMembers).toEqual(undefined);

      const problem = obsHelper.getDiagnosisProperty(
        fromJS(diagnosisObservation.groupMembers),
        conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID
      );
      expect(problem).toEqual(fromJS(diagnosisObservation.groupMembers[0]));

      const certainty = obsHelper.getDiagnosisProperty(
        fromJS(diagnosisObservation.groupMembers),
        conceptClass.DIAGNOSIS_CERTAINTY_UUID
      );
      expect(certainty).toEqual(fromJS(diagnosisObservation.groupMembers[1]));

      const order = obsHelper.getDiagnosisProperty(
        fromJS(diagnosisObservation.groupMembers),
        conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID
      );
      expect(order).toEqual(fromJS(diagnosisObservation.groupMembers[2]));
    });

    it('should get the attribute property', () => {
      const conceptProperties = [
        {
          uuid: '162b981b-53f0-4afe-add4-b3698b275fc5',
          display: 'Diagnosis Acuity: 2',
          value: '2',
          attributeType: {
            uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
            display: 'Diagnosis Acuity',
          },
          voided: false,
        },
      ];

      const emptyAttributes = obsHelper.getAttributeProperty(
        fromJS(undefined),
        conceptAttributeType.DIAGNOSIS_ACUITY_UUID
      );
      expect(emptyAttributes).toEqual(undefined);

      const problem = obsHelper.getAttributeProperty(
        fromJS(conceptProperties),
        conceptAttributeType.DIAGNOSIS_ACUITY_UUID
      );
      expect(problem).toEqual(fromJS(conceptProperties[0]));
    });
  });

  it('should select uuids of visit note observations', () => {
    const allEncounters = normalize(patient1Encounters, encountersSchema);
    const { encounters } = allEncounters.entities;
    const allEncounterUuids = Object.keys(encounters);

    const obsUuids = fromJS(Object.keys(allEncounters.entities.observations));
    const allObservationsUuids = getVisitNotesObservationsUuids.resultFunc(
      fromJS(allEncounterUuids),
      fromJS(encounters),
      fromJS(allEncounters.entities.observations)
    );

    expect(allObservationsUuids.sort()).toEqual(obsUuids.sort());
  });

  it('should select denormalized visitNotes observations', () => {
    const visitNoteObservationsUuids = ['1234', '3456', '6789'];
    const normalized = normalize(patient1Encounters, encountersSchema);

    const { entities } = normalized;
    const denormalized = denormalize(
      visitNoteObservationsUuids,
      [obsSchema],
      entities
    );

    const selectedVisitNoteObs = selectVisitNotesObservations.resultFunc(
      fromJS(visitNoteObservationsUuids),
      fromJS(entities)
    );

    expect(selectedVisitNoteObs).toEqual(fromJS(denormalized));
  });

  it('should select data for the visit notes container', () => {
    const visitNoteObservations = [
      {
        concept: {
          uuid: concept.DOCTOR_NOTES,
        },
        uuid: '987654321',
        obsDatetime: currentDateTime,
        voided: false,
        encounter: {
          uuid: 'encounter123',
        },
        groupMembers: [
          {
            concept: {
              uuid: concept.NOTES,
              display: 'Notes',
            },
            uuid: '987654321',
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            value: 'notesValue',
            display: 'Notes: notesValue',
          },
          {
            concept: {
              uuid: concept.CARDEX_TIME,
              display: 'Cardex Time',
            },
            uuid: 'timeObs123',
            value: currentDateTime,
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            display: `Cardex Time: ${currentDateTime}`,
          },
        ],
      },
    ];
    const localTime = dateTimeUtcToLocal(currentDateTime);
    const output = [
      {
        concept: concept.DOCTOR_NOTES,
        uuid: '987654321',
        notesValue: 'notesValue',
        timeValue: localTime,
        timeDisplay: moment(localTime).format('LT'),
        hasEdit: true,
        type: 'Doctor',
        obsDatetime: currentDateTime,
        voided: false,
        encounter: {
          uuid: 'encounter123',
        },
        groupMembers: [
          {
            concept: {
              uuid: concept.NOTES,
              display: 'Notes',
            },
            uuid: '987654321',
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            value: 'notesValue',
            display: 'Notes: notesValue',
          },
          {
            concept: {
              uuid: concept.CARDEX_TIME,
              display: 'Cardex Time',
            },
            uuid: 'timeObs123',
            value: currentDateTime,
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            display: `Cardex Time: ${currentDateTime}`,
          },
        ],
      },
    ];

    const visitNotesData = selectVisitNotesContainerData.resultFunc(
      fromJS(visitNoteObservations)
    );

    expect(fromJS(visitNotesData)).toEqual(fromJS(output));
  });

  it('should select uuids of referral observations', () => {
    const allEncounters = normalize(patient1Encounters, encountersSchema);
    const { encounters } = allEncounters.entities;
    const allEncounterUuids = Object.keys(encounters);

    const obsUuids = fromJS(Object.keys(allEncounters.entities.observations));
    const allObservationsUuids = getReferralObservationsUuids.resultFunc(
      fromJS(allEncounterUuids),
      fromJS(encounters),
      fromJS(allEncounters.entities.observations)
    );

    expect(allObservationsUuids.sort()).toEqual(obsUuids.sort());
  });

  it('should select denormalized referral observations', () => {
    const visitNoteObservationsUuids = ['1234', '3456', '6789'];
    const normalized = normalize(patient1Encounters, encountersSchema);

    const { entities } = normalized;
    const denormalized = denormalize(
      visitNoteObservationsUuids,
      [obsSchema],
      entities
    );

    const selectedVisitNoteObs = selectReferralObservations.resultFunc(
      fromJS(visitNoteObservationsUuids),
      fromJS(entities)
    );

    expect(selectedVisitNoteObs).toEqual(fromJS(denormalized));
  });

  it('should select data for the referral container', () => {
    const visitNoteObservations = [
      {
        concept: {
          uuid: concept.REFERRAL_NOTES,
        },
        uuid: '987654321',
        obsDatetime: currentDateTime,
        voided: false,
        encounter: {
          uuid: 'encounter123',
        },
        groupMembers: [
          {
            concept: {
              uuid: concept.REFERRAL_FACILITY,
              display: 'Referral Facility',
            },
            uuid: '987654321',
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            value: 'facility',
            display: 'Referral Facility: facility',
          },
          {
            concept: {
              uuid: concept.REASON_FOR_REFERRAL,
              display: 'Reason',
            },
            uuid: '987654321',
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            value: 'reason',
            display: 'Reason: reason',
          },
          {
            concept: {
              uuid: concept.REFERRAL_TIME,
              display: 'Referral Time',
            },
            uuid: 'timeObs123',
            value: currentDateTime,
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            display: `Referral Time: ${currentDateTime}`,
          },
        ],
      },
    ];
    const localTime = dateTimeUtcToLocal(currentDateTime);
    const output = [
      {
        concept: concept.REFERRAL_NOTES,
        uuid: '987654321',
        notesValue: 'facility - reason',
        timeValue: localTime,
        timeDisplay: moment(localTime).format('LT'),
        obsDatetime: currentDateTime,
        voided: false,
        encounter: {
          uuid: 'encounter123',
        },
        groupMembers: [
          {
            concept: {
              uuid: concept.REFERRAL_FACILITY,
              display: 'Referral Facility',
            },
            uuid: '987654321',
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            value: 'facility',
            display: 'Referral Facility: facility',
          },
          {
            concept: {
              uuid: concept.REASON_FOR_REFERRAL,
              display: 'Reason',
            },
            uuid: '987654321',
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            value: 'reason',
            display: 'Reason: reason',
          },
          {
            concept: {
              uuid: concept.REFERRAL_TIME,
              display: 'Referral Time',
            },
            uuid: 'timeObs123',
            value: currentDateTime,
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            display: `Referral Time: ${currentDateTime}`,
          },
        ],
      },
    ];

    const visitNotesData = selectReferralContainerData.resultFunc(
      fromJS(visitNoteObservations)
    );

    expect(fromJS(visitNotesData)).toEqual(fromJS(output));
  });

  it('should select uuids of discharge observations', () => {
    const allEncounters = normalize(patient1Encounters, encountersSchema);
    const { encounters } = allEncounters.entities;
    const allEncounterUuids = Object.keys(encounters);

    const obsUuids = fromJS(Object.keys(allEncounters.entities.observations));
    const allObservationsUuids = getDischargeObservationsUuids.resultFunc(
      fromJS(allEncounterUuids),
      fromJS(encounters),
      fromJS(allEncounters.entities.observations)
    );

    expect(allObservationsUuids.sort()).toEqual(obsUuids.sort());
  });

  it('should select denormalized discharge observations', () => {
    const visitNoteObservationsUuids = ['1234', '3456', '6789'];
    const normalized = normalize(patient1Encounters, encountersSchema);

    const { entities } = normalized;
    const denormalized = denormalize(
      visitNoteObservationsUuids,
      [obsSchema],
      entities
    );

    const selectedVisitNoteObs = selectDischargeObservations.resultFunc(
      fromJS(visitNoteObservationsUuids),
      fromJS(entities)
    );

    expect(selectedVisitNoteObs).toEqual(fromJS(denormalized));
  });

  it('should select data for the discharge container', () => {
    const visitNoteObservations = [
      {
        concept: {
          uuid: concept.DISCHARGE_NOTES,
        },
        uuid: '987654321',
        obsDatetime: currentDateTime,
        voided: false,
        encounter: {
          uuid: 'encounter123',
        },
        groupMembers: [
          {
            concept: {
              uuid: concept.NOTES,
              display: 'Notes',
            },
            uuid: '987654321',
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            value: 'facility',
            display: 'Notes: facility',
          },
          {
            concept: {
              uuid: concept.DISCHARGE_TIME,
              display: 'Discharge Time',
            },
            uuid: 'timeObs123',
            value: currentDateTime,
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            display: `Discharge Time: ${currentDateTime}`,
          },
        ],
      },
    ];
    const localTime = dateTimeUtcToLocal(currentDateTime);
    const output = [
      {
        concept: concept.DISCHARGE_NOTES,
        uuid: '987654321',
        notesValue: 'facility',
        timeValue: localTime,
        timeDisplay: moment(localTime).format('LT'),
        obsDatetime: currentDateTime,
        voided: false,
        encounter: {
          uuid: 'encounter123',
        },
        groupMembers: [
          {
            concept: {
              uuid: concept.NOTES,
              display: 'Notes',
            },
            uuid: '987654321',
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            value: 'facility',
            display: 'Notes: facility',
          },
          {
            concept: {
              uuid: concept.DISCHARGE_TIME,
              display: 'Discharge Time',
            },
            uuid: 'timeObs123',
            value: currentDateTime,
            obsDatetime: currentDateTime,
            voided: false,
            encounter: {
              uuid: 'encounter123',
            },
            display: `Discharge Time: ${currentDateTime}`,
          },
        ],
      },
    ];

    const visitNotesData = selectDischargeContainerData.resultFunc(
      fromJS(visitNoteObservations)
    );

    expect(fromJS(visitNotesData)).toEqual(fromJS(output));
  });
});
