import { Map, fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { encountersSchema } from '../../../../js/state/representations';
import {
  getCurrentVisitUuid,
  getCurrentVisit,
  getVisitUuidForEncounter,
  getEncountersForVisit,
  getActiveVisitData,
} from '../../../../js/state/ui/visit/selectors';
import { encounterType, form, formField } from '../../../../js/uuid';

describe('visits selectors', () => {
  it('should select current visit uuid', () => {
    const state = {
      ui: {
        visit: fromJS({
          currentVisit: '123',
        }),
      },
    };

    expect(getCurrentVisitUuid(state)).toEqual('123');
  });

  it('should get the current visit', () => {
    const nullVisit = getCurrentVisit.resultFunc(undefined, '123');
    expect(nullVisit).toEqual(undefined);

    const visitsByUuid = {
      '123': {
        uuid: '123',
        encounters: ['enc_1', 'enc2'],
        startDateTime: new Date(),
      },
      '124': {
        uuid: '124',
        encounters: ['enc_3', 'enc_4'],
        patientPrograms: [],
      },
    };

    const currentVisit = getCurrentVisit.resultFunc(
      fromJS(visitsByUuid),
      '123'
    );
    expect(currentVisit).toEqual(fromJS(visitsByUuid['123']));
  });

  it('should get the visit off of the encounter', () => {
    const mockEncounters = [
      {
        uuid: 'enc_1',
        visit: '123',
        display: 'abc',
        encounterType: 'abc',
      },
      {
        uuid: 'enc_2',
        visit: '124',
        display: 'def',
        encounterType: 'xyz',
      },
      {
        uuid: 'enc_3',
        visit: '125',
        display: 'ghi',
        encounterType: 'xyz',
      },
    ];

    const normalized = normalize(mockEncounters, encountersSchema);
    const { entities } = normalized;
    const state = { entities: fromJS(entities) };

    const currentVisit = getVisitUuidForEncounter(state, fromJS('enc_1'));
    expect(currentVisit).toEqual('123');
  });

  it('should select the encounters in the current visit', () => {
    expect(getEncountersForVisit.resultFunc()).toEqual([]);
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
    const mockVisit = {
      uuid: 'visit_123',
      startDatetime: 'currentDate',
      visitType: {
        uuid: 'uuidVisitType',
        display: 'ideliver visit type',
      },
      encounters: ['123', '124', '125'],
    };

    const normalized = normalize(mockEncounters, encountersSchema);
    const { entities } = normalized;
    const { encounters } = entities;

    const selectedVisitEncounters = getEncountersForVisit.resultFunc(
      fromJS(mockVisit),
      fromJS(encounters)
    );
    expect(selectedVisitEncounters).toEqual(fromJS(mockEncounters));
  });

  it('get the active visit', () => {
    const mockVisit = {
      uuid: 'visit_123',
      startDatetime: '2018-08-19T12:35:35.000-0400',
      attributes: [],
    };
    const mockPatient = {
      uuid: '124',
      identifiers: [],
      address: {},
    };
    const mockEncounters = [
      {
        uuid: '123',
        display: 'abc',
        auditInfo: {
          creator: {
            uuid: '1c3db49d-440a-11e6-a65c-00e04c680037',
            display: 'admin',
          },
          dateCreated: '2018-09-13T16:36:46.000-0400',
          changedBy: null,
          dateChanged: null,
        },
        form: {
          uuid: form.VISIT_SUMMARY_FORM_UUID,
        },
        encounterType: {
          uuid: encounterType.VISIT_SUMMARY_ENCOUNTER_TYPE_UUID,
          display: 'abc',
        },
      },
      {
        uuid: '124',
        display: 'def',
        auditInfo: {
          creator: {
            uuid: '1c3db49d-440a-11e6-a65c-00e04c680037',
            display: 'admin',
          },
          dateCreated: '2018-09-13T16:46:46.000-0400',
          changedBy: null,
          dateChanged: null,
        },
        encounterType: {
          uuid: 'xyz',
          display: 'def-xyz',
        },
      },
      {
        uuid: '125',
        display: 'ghi',
        auditInfo: {
          creator: {
            uuid: '1c3db49d-440a-11e6-a65c-00e04c680037',
            display: 'admin',
          },
          dateCreated: '2018-09-13T16:26:46.000-0400',
          changedBy: null,
          dateChanged: null,
        },
        form: {
          uuid: form.OB_HISTORY_FORM_UUID,
        },
        encounterType: {
          uuid: encounterType.OB_HISTORY_ENCOUNTER_TYPE_UUID,
          display: '125-ghi',
        },
      },
    ];
    const mockOBHistory = {
      [formField.OB_GRAVIDITY_UUID]: fromJS({
        value: '1',
      }),
      [formField.OB_LIVE_UUID]: fromJS({
        value: '2',
      }),
      [formField.OB_GESTATIONAL_AGE_UUID]: fromJS({
        value: '3',
      }),
    };
    const mockGeneralInfo = {
      [formField.GI_BIRTH_COMPANION_NAME_UUID]: fromJS({
        value: 'Mock Person',
      }),
    };

    const result = getActiveVisitData.resultFunc(
      fromJS(mockVisit),
      fromJS({}),
      fromJS(mockPatient),
      fromJS(mockEncounters),
      fromJS({}),
      fromJS(mockOBHistory),
      fromJS(mockGeneralInfo),
      fromJS(mockEncounters)
    );
    const expected = {
      OBGravidity: '1',
      OBLive: '2',
      OBWeeks: '3',
      startDatetime: '2018-08-19T12:35:35.000-0400',
      stopDatetime: undefined,
      companionName: 'Mock Person',
      patientStatus: null,
      uuid: 'visit_123',
      timeline: [
        {
          message: '125-ghi',
          timeStamp: '2018-09-13T16:26:46.000-0400',
        },
        {
          message: 'abc',
          timeStamp: '2018-09-13T16:36:46.000-0400',
        },
      ],
    };
    expect(result).toEqual(Map(expected));
  });
});
