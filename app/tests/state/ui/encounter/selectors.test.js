import { fromJS, List } from 'immutable';
import { normalize } from 'normalizr';

import {
  getReferralEncounterUuidsForVisit,
  getDischargeEncounterUuidsForVisit,
  getVisitNotesEncounterUuidsForVisit,
  getDiagnosisEncounterUuidsForEpisode,
  getEncountersUuidsForEpisode,
  getEncountersForEpisode,
  getEncountersUuidsForVisit,
  getProgramStatus,
} from '../../../../js/state/ui/encounter/selectors';
import {
  encountersSchema,
  episodesSchema,
} from '../../../../js/state/representations';
import { encounterType } from '../../../../js/uuid';

describe('encounter selector', () => {
  it('should return program status', () => {
    expect(getProgramStatus.resultFunc()).toEqual('Intake');
    const mockEncounters = [
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.PNC_ENCOUNTER_TYPE_UUID],
      ]),
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.LABOR_SIGNS_ENCOUNTER_TYPE_UUID],
      ]),
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID],
      ]),
    ];

    const programStatus = getProgramStatus.resultFunc(mockEncounters);
    expect(programStatus).toEqual('PNC');
  });

  it('should return program status', () => {
    expect(getProgramStatus.resultFunc()).toEqual('Intake');
    const mockEncounters = [
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.OB_HISTORY_ENCOUNTER_TYPE_UUID],
      ]),
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID],
      ]),
    ];

    const programStatus = getProgramStatus.resultFunc(mockEncounters);
    expect(programStatus).toEqual('Intake');
  });

  it('should return program status', () => {
    expect(getProgramStatus.resultFunc()).toEqual('Intake');
    const mockEncounters = [
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.LABOR_SIGNS_ENCOUNTER_TYPE_UUID],
      ]),
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID],
      ]),
    ];

    const programStatus = getProgramStatus.resultFunc(mockEncounters);
    expect(programStatus).toEqual('Labor');
  });

  it('should return program status', () => {
    expect(getProgramStatus.resultFunc()).toEqual('Intake');
    const mockEncounters = [
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.ACTIVE_LABOR_ENCOUNTER_TYPE_UUID],
      ]),
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID],
      ]),
    ];

    const programStatus = getProgramStatus.resultFunc(mockEncounters);
    expect(programStatus).toEqual('Labor');
  });

  it('should return program status', () => {
    expect(getProgramStatus.resultFunc()).toEqual('Intake');
    const mockEncounters = [
      new Map([
        ['uuid', 123],
        ['encounterType', encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID],
      ]),
    ];

    const programStatus = getProgramStatus.resultFunc(mockEncounters);
    expect(programStatus).toEqual('Intake');
  });

  it('should select uuids for encounter in the current episode', () => {
    expect(getEncountersUuidsForEpisode.resultFunc()).toEqual([]);
    const mockEncounters = [
      {
        uuid: '123',
        display: 'abc',
        encounterType: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
      },
      {
        uuid: '124',
        display: 'def',
        encounterType: 'xyz',
      },
      {
        uuid: '125',
        display: 'ghi',
        encounterType: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
      },
    ];
    const episodes = [{ uuid: 'ep123', encounters: mockEncounters }];
    const normalized = normalize(episodes, episodesSchema);
    const { entities } = normalized;
    const currentEpisode = entities.episodes.ep123;

    const encounters = getEncountersUuidsForEpisode.resultFunc(
      fromJS(currentEpisode)
    );
    expect(encounters).toEqual(fromJS(currentEpisode.encounters));
  });

  it('should select encounters in the current episode', () => {
    expect(getEncountersForEpisode.resultFunc()).toEqual([]);
    const mockEncounters = [
      {
        uuid: '123',
        display: 'abc',
        encounterType: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
      },
      {
        uuid: '124',
        display: 'def',
        encounterType: 'xyz',
      },
      {
        uuid: '125',
        display: 'ghi',
        encounterType: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
      },
    ];
    const episodes = [{ uuid: 'ep123', encounters: mockEncounters }];
    const normalized = normalize(episodes, episodesSchema);
    const { entities } = normalized;
    const currentEpisode = entities.episodes.ep123;
    const { encounters } = entities;

    const encountersFound = getEncountersForEpisode.resultFunc(
      fromJS(currentEpisode),
      fromJS(encounters)
    );
    expect(encountersFound).toEqual(fromJS(mockEncounters));
  });

  it('should select uuids for encounter in the current episode', () => {
    expect(getDiagnosisEncounterUuidsForEpisode.resultFunc()).toEqual(List());
    const mockEncounters = [
      {
        uuid: '123',
        display: 'abc',
        encounterType: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
      },
      {
        uuid: '124',
        display: 'def',
        encounterType: 'xyz',
      },
      {
        uuid: '125',
        display: 'ghi',
        encounterType: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
      },
    ];

    const normalized = normalize(mockEncounters, encountersSchema);
    const { entities } = normalized;
    const { encounters } = entities;

    const selectedDiagnosisEncountersUuids = getDiagnosisEncounterUuidsForEpisode.resultFunc(
      fromJS(['123', '124', '125', '126']),
      fromJS(encounters)
    );
    expect(selectedDiagnosisEncountersUuids).toEqual(fromJS(['123', '125']));
  });

  it('should select uuids for encounters in the current visit', () => {
    expect(getEncountersUuidsForVisit.resultFunc()).toEqual([]);
    const mockVisit = {
      uuid: 'visit_123',
      startDatetime: 'currentDate',
      visitType: {
        uuid: 'uuidVisitType',
        display: 'ideliver visit type',
      },
      encounters: ['123', '456'],
    };

    const selectedVisitEncountersUuids = getEncountersUuidsForVisit.resultFunc(
      fromJS(mockVisit)
    );
    expect(selectedVisitEncountersUuids).toEqual(fromJS(['123', '456']));
  });

  it('should select uuids for visit note encounter in the current visit', () => {
    expect(getVisitNotesEncounterUuidsForVisit.resultFunc()).toEqual(List());
    const mockEncounters = [
      {
        uuid: '123',
        display: 'abc',
        encounterType: encounterType.VISIT_NOTES_ENCOUNTER_TYPE_UUID,
      },
      {
        uuid: '124',
        display: 'def',
        encounterType: 'xyz',
      },
      {
        uuid: '125',
        display: 'ghi',
        encounterType: encounterType.VISIT_NOTES_ENCOUNTER_TYPE_UUID,
      },
    ];

    const normalized = normalize(mockEncounters, encountersSchema);
    const { entities } = normalized;
    const { encounters } = entities;

    const selectedVisitNoteEncountersUuids = getVisitNotesEncounterUuidsForVisit.resultFunc(
      fromJS(['123', '124', '125', '126']),
      fromJS(encounters)
    );
    expect(selectedVisitNoteEncountersUuids).toEqual(fromJS(['123', '125']));
  });

  it('should select uuids for referral encounter in the current visit', () => {
    expect(getReferralEncounterUuidsForVisit.resultFunc()).toEqual(List());
    const mockEncounters = [
      {
        uuid: '123',
        display: 'abc',
        encounterType: encounterType.REFERRAL_ENCOUNTER_TYPE_UUID,
      },
      {
        uuid: '124',
        display: 'def',
        encounterType: 'xyz',
      },
      {
        uuid: '125',
        display: 'ghi',
        encounterType: encounterType.REFERRAL_ENCOUNTER_TYPE_UUID,
      },
    ];

    const normalized = normalize(mockEncounters, encountersSchema);
    const { entities } = normalized;
    const { encounters } = entities;

    const selectedReferralEncountersUuids = getReferralEncounterUuidsForVisit.resultFunc(
      fromJS(['123', '124', '125', '126']),
      fromJS(encounters)
    );
    expect(selectedReferralEncountersUuids).toEqual(fromJS(['123', '125']));
  });

  it('should select uuids for discharge encounter in the current visit', () => {
    expect(getDischargeEncounterUuidsForVisit.resultFunc()).toEqual(List());
    const mockEncounters = [
      {
        uuid: '123',
        display: 'abc',
        encounterType: encounterType.DISCHARGE_ENCOUNTER_TYPE_UUID,
      },
      {
        uuid: '124',
        display: 'def',
        encounterType: 'xyz',
      },
      {
        uuid: '125',
        display: 'ghi',
        encounterType: encounterType.DISCHARGE_ENCOUNTER_TYPE_UUID,
      },
    ];

    const normalized = normalize(mockEncounters, encountersSchema);
    const { entities } = normalized;
    const { encounters } = entities;

    const selectedDischargeEncountersUuids = getDischargeEncounterUuidsForVisit.resultFunc(
      fromJS(['123', '124', '125', '126']),
      fromJS(encounters)
    );
    expect(selectedDischargeEncountersUuids).toEqual(fromJS(['123', '125']));
  });
});
