import { call, put, select, all } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import {
  fetchFormAction,
  fetchFormFailAction,
  fetchFormSuccessAction,
  submitFormAction,
  submitFormFailAction,
} from '../../../../js/state/ui/form/actions';
import {
  fetchForm,
  getFormUrl,
  saveAttributes,
  submitForm,
} from '../../../../js/state/ui/form/sagas';
import { formSchema } from '../../../../js/state/representations';
import { updateEntitiesDataAction } from '../../../../js/state/entities/actions';
import { getData } from '../../../../js/api';
import {
  getFormData,
  getFormFieldToConcept,
  getFormFieldToField,
  selectFormMetadata,
} from '../../../../js/state/ui/form/selectors';
import { getCurrentPatient } from '../../../../js/state/ui/patient/selectors';
import { getCurrentEpisodeUuid } from '../../../../js/state/ui/episode/selectors';
import {
  getCurrentVisit,
  getVisitUuidForEncounter,
} from '../../../../js/state/ui/visit/selectors';
import { saveEncounterAction } from '../../../../js/state/ui/encounter/actions';
import {
  generalInfoData,
  generalInfoMetaData,
  labResultFormData,
  labResultFormMetaData,
  medicalHistoryData,
  medicalHistoryFormMetaData,
} from './formTestData';
import {
  attributeType,
  identifierType,
  location as locationUuids,
} from '../../../../js/uuid';
import {
  savePatientAttributeAction,
  savePatientIdentifierAction,
} from '../../../../js/state/ui/patient/actions';

describe('forms saga', function() {
  describe('fetch form', function() {
    test('missing required argument', () => {
      const action = fetchFormAction('test', undefined);
      const generator = cloneableGenerator(fetchForm)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(fetchFormFailAction(undefined, 'Form uuid is required'))
      );
      expect(clone.next().done).toEqual(true);
    });
    test('fetch form success', () => {
      const formUuid = '123';
      const action = fetchFormAction('test', formUuid);

      const generator = cloneableGenerator(fetchForm)(action);
      const clone = generator.clone();
      const expected = call(getData, getFormUrl(action));
      expect(clone.next().value).toEqual(expected);
      const form = {
        uuid: '123',
        display: 'test',
        formFields: [
          { uuid: '456', display: 'obs1' },
          { uuid: '789', display: 'obs2' },
        ],
      };
      const normalized = normalize(form, formSchema);
      expect(clone.next(form).value).toEqual(
        put(updateEntitiesDataAction(normalized))
      );
      expect(clone.next(form).value).toEqual(
        put(fetchFormSuccessAction(formUuid, form))
      );
      expect(clone.next().done).toEqual(true);
    });

    test('fetch form failure', () => {
      const action = fetchFormAction('test', '123');
      const generator = cloneableGenerator(fetchForm)(action);
      const clone = generator.clone();
      clone.next();
      expect(clone.throw(new Error('fetch form failed')).value).toEqual(
        put(fetchFormFailAction('123', 'fetch form failed'))
      );
      expect(clone.next().done).toEqual(true);
    });

    test('fetch form server failure', () => {
      const action = fetchFormAction('test', '123');
      const generator = cloneableGenerator(fetchForm)(action);
      const clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(fetchFormFailAction('123', error)));
      expect(clone.next().done).toEqual(true);
    });
  });

  describe('fetch form', function() {
    it('should save simple forms', () => {
      const action = submitFormAction(
        'testUrl',
        'visitId',
        ['encounterPathId'],
        'encounterTypeId'
      );
      const generator = cloneableGenerator(submitForm)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        select(getFormFieldToConcept, action.encounterPath[0])
      );

      const formFieldToConcept = {
        'ee038cc4-1a53-4738-8967-aaa000000032':
          '51a83ef4-023f-4065-b055-20a99becba42',
        '200139DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD':
          '200139DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      };
      expect(clone.next(fromJS(formFieldToConcept)).value).toEqual(
        select(getFormFieldToField, action.encounterPath[0])
      );

      const formFieldToField = {
        'ee038cc4-1a53-4738-8967-aaa000000032':
          'fbdd4887-8f3b-414b-919d-7a9b27534401',
      };
      expect(clone.next(fromJS(formFieldToField)).value).toEqual(
        select(selectFormMetadata, action.encounterPath[0])
      );

      const formMetaData = {
        uuid: 'd2c7532c-fb01-11e2-8ff2-fd54ab5fdb2a',
        name: 'Admission (Simple)',
        description: null,
        retired: false,
        encounterType: {
          uuid: 'e22e39fd-7db2-45e7-80f1-60fa0d5a4378',
          display: 'Admission',
        },
        formFields: [
          {
            uuid: 'ee038cc4-1a53-4738-8967-aaa000000032',
            description: null,
            parent: null,
            field: {
              attributeName: null,
              concept: {
                set: false,
                display: 'Admission notes',
                datatype: {
                  uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
                  display: 'Text',
                },
                conceptClass: {
                  uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                  display: 'Finding',
                },
                answers: [],
                attributes: [],
                setMembers: [],
                uuid: '51a83ef4-023f-4065-b055-20a99becba42',
                description: null,
              },
              name: 'Admission notes',
              selectMultiple: false,
              defaultValue: 'Enter Notes',
              fieldType: {
                uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Concept',
              },
              tableName: null,
              uuid: 'fbdd4887-8f3b-414b-919d-7a9b27534401',
              description:
                '{"name":"VcTextField","props":{"vType":"text","multiline":true,"maxLength":500},"validation":{}}',
            },
            fieldNumber: 1,
            pageNumber: 1,
          },
        ],
        requiredFormFields: {},
        fieldToFormFields: {
          'fbdd4887-8f3b-414b-919d-7a9b27534401':
            'ee038cc4-1a53-4738-8967-aaa000000032',
        },
      };
      expect(clone.next(fromJS(formMetaData)).value).toEqual(
        select(getFormData, action.encounterPath)
      );

      const formData = {
        'ee038cc4-1a53-4738-8967-aaa000000032': {
          value: 'simple admission form testing again and again',
          obsDatetime: '2019-09-06T01:43:34.000-0400',
          comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000032"}',
          uuid: '36b0652b-a775-4a00-bae0-0cfc7a475edf',
        },
        lastUpdated: '2019-08-31T13:41:40.000-0400',
        encounterUuid: '321859cc-24c1-41db-9dbc-81949c6237e4',
        encounterDatetime: '2019-08-31T13:00:00.000-0400',
      };
      expect(clone.next(fromJS(formData)).value).toEqual(
        select(getCurrentEpisodeUuid)
      );

      const episodeUuid = 'testEpisodeUuid';
      expect(clone.next(fromJS(episodeUuid)).value).toEqual(
        select(getCurrentPatient)
      );

      const patientData = {
        uuid: 'patientUuid',
      };
      expect(clone.next(fromJS(patientData)).value).toEqual(
        select(getCurrentVisit)
      );

      const visitData = {
        uuid: 'visitUuid',
        location: {
          uuid: 'locationUuid',
          display: 'test location',
        },
      };
      expect(clone.next(fromJS(visitData)).value).toEqual(
        select(getVisitUuidForEncounter, formData.encounterUuid)
      );

      const encounter = {
        encounterDatetime: '2019-08-31T17:00:00.000+0000',
        encounterType: 'encounterTypeId',
        patient: 'patientUuid',
        obs: [
          {
            concept: '51a83ef4-023f-4065-b055-20a99becba42',
            comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000032"}',
            obsDatetime: '2019-09-06T01:43:34.000-0400',
            voided: false,
            value: 'simple admission form testing again and again',
            uuid: '36b0652b-a775-4a00-bae0-0cfc7a475edf',
            groupMembers: undefined,
          },
        ],
        visit: 'visitId',
        form: 'encounterPathId',
        location: { uuid: 'locationUuid', display: 'test location' },
        uuid: '321859cc-24c1-41db-9dbc-81949c6237e4',
      };

      expect(clone.next().value).toEqual(
        put(
          saveEncounterAction(action.url, encounter, {
            episodeUuid,
            isFormSubmission: true,
            patient: patientData.uuid,
          })
        )
      );

      expect(clone.next().done).toEqual(true);
    });
  });

  it('should save forms with group members', () => {
    const action = submitFormAction(
      'testUrl',
      'visitId',
      ['encounterPathId'],
      'encounterTypeId'
    );
    const generator = cloneableGenerator(submitForm)(action);
    const clone = generator.clone();
    expect(clone.next().value).toEqual(
      select(getFormFieldToConcept, action.encounterPath[0])
    );

    const formFieldToConcept = {
      '200117DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD':
        '200113DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      '200139DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD':
        '200139DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    };
    expect(clone.next(fromJS(formFieldToConcept)).value).toEqual(
      select(getFormFieldToField, action.encounterPath[0])
    );

    const formFieldToField = {
      '200117DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD':
        '200114DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    };
    expect(clone.next(fromJS(formFieldToField)).value).toEqual(
      select(selectFormMetadata, action.encounterPath[0])
    );

    expect(clone.next(fromJS(labResultFormMetaData)).value).toEqual(
      select(getFormData, action.encounterPath)
    );

    expect(clone.next(fromJS(labResultFormData)).value).toEqual(
      select(getCurrentEpisodeUuid)
    );

    const episodeUuid = 'testEpisodeUuid';
    expect(clone.next(fromJS(episodeUuid)).value).toEqual(
      select(getCurrentPatient)
    );

    const patientData = {
      uuid: 'patientUuid',
    };
    expect(clone.next(fromJS(patientData)).value).toEqual(
      select(getCurrentVisit)
    );

    const visitData = {
      uuid: 'visitUuid',
      location: {
        uuid: 'locationUuid',
        display: 'test location',
      },
    };
    expect(clone.next(fromJS(visitData)).value).toEqual(
      select(getVisitUuidForEncounter, labResultFormData.encounterUuid)
    );

    const encounter = {
      encounterDatetime: '2019-09-06T19:58:11.000+0000',
      encounterType: 'encounterTypeId',
      form: 'encounterPathId',
      location: {
        display: 'test location',
        uuid: 'locationUuid',
      },
      obs: [
        {
          comment: '{"formField":"200117DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"}',
          concept: '200113DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          groupMembers: [
            {
              concept: '200105DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              uuid: '5b0a695a-9a26-427c-a4f2-a61a15db09cb',
              value: '2019-09-06 19:57:00.000+0000',
            },
            {
              concept: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              uuid: 'f0ad0ef8-edf2-4d33-8002-cc8f6f3e2894',
              value: {
                display: 'B+',
                uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            },
            {
              concept: '200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              uuid: 'ad01cba7-4855-49c3-8d2c-fce68d464038',
              value: {
                display: 'Blood Group',
                uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            },
          ],
          uuid: 'bc46eca4-a497-41e7-9d3c-2e742c8245b9',
          voided: false,
        },
      ],
      patient: 'patientUuid',
      uuid: 'f6ccb04f-2dc9-48de-99e8-6b430f74ab05',
      visit: 'visitId',
    };

    expect(clone.next().value).toEqual(
      put(
        saveEncounterAction(action.url, encounter, {
          episodeUuid,
          isFormSubmission: true,
          patient: patientData.uuid,
        })
      )
    );

    expect(clone.next().done).toEqual(true);
  });

  it('should save forms with multi select values', () => {
    const action = submitFormAction(
      'testUrl',
      'visitId',
      ['encounterPathId'],
      'encounterTypeId'
    );
    const generator = cloneableGenerator(submitForm)(action);
    const clone = generator.clone();
    expect(clone.next().value).toEqual(
      select(getFormFieldToConcept, action.encounterPath[0])
    );

    const formFieldToConcept = {
      '200139DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD':
        '200139DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ee038cc4-1a53-4738-8967-aaa000000000':
        '200040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ee038cc4-1a53-4738-8967-aaa000000001':
        '200032DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ee038cc4-1a53-4738-8967-aaa000000002':
        '200033DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ee038cc4-1a53-4738-8967-aaa000000003':
        '200034DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ee038cc4-1a53-4738-8967-aaa000000004':
        '200035DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ee038cc4-1a53-4738-8967-aaa000000005':
        '200036DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ee038cc4-1a53-4738-8967-aaa000000006':
        '200037DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ee038cc4-1a53-4738-8967-aaa000000007':
        '200038DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ee038cc4-1a53-4738-8967-aaa000000008':
        '200039DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    };
    expect(clone.next(fromJS(formFieldToConcept)).value).toEqual(
      select(getFormFieldToField, action.encounterPath[0])
    );

    const formFieldToField = {
      'ee038cc4-1a53-4738-8967-aaa000000000':
        'fbdd4887-8f3b-414b-919d-aa0000000005',
      'ee038cc4-1a53-4738-8967-aaa000000001':
        'fbdd4887-8f3b-414b-919d-aa0000000000',
      'ee038cc4-1a53-4738-8967-aaa000000002':
        'fbdd4887-8f3b-414b-919d-aa0000000001',
      'ee038cc4-1a53-4738-8967-aaa000000003':
        'fbdd4887-8f3b-414b-919d-aa0000000006',
      'ee038cc4-1a53-4738-8967-aaa000000004':
        'fbdd4887-8f3b-414b-919d-aa0000000002',
      'ee038cc4-1a53-4738-8967-aaa000000005':
        'fbdd4887-8f3b-414b-919d-aa0000000007',
      'ee038cc4-1a53-4738-8967-aaa000000006':
        'fbdd4887-8f3b-414b-919d-aa0000000003',
      'ee038cc4-1a53-4738-8967-aaa000000007':
        'fbdd4887-8f3b-414b-919d-aa0000000004',
      'ee038cc4-1a53-4738-8967-aaa000000008':
        'fbdd4887-8f3b-414b-919d-aa0000000008',
    };
    expect(clone.next(fromJS(formFieldToField)).value).toEqual(
      select(selectFormMetadata, action.encounterPath[0])
    );

    expect(clone.next(fromJS(medicalHistoryFormMetaData)).value).toEqual(
      select(getFormData, action.encounterPath)
    );

    expect(clone.next(fromJS(medicalHistoryData)).value).toEqual(
      select(getCurrentEpisodeUuid)
    );

    const episodeUuid = 'testEpisodeUuid';
    expect(clone.next(fromJS(episodeUuid)).value).toEqual(
      select(getCurrentPatient)
    );

    const patientData = {
      uuid: 'patientUuid',
    };
    expect(clone.next(fromJS(patientData)).value).toEqual(
      select(getCurrentVisit)
    );

    const visitData = {
      uuid: 'visitUuid',
      location: {
        uuid: 'locationUuid',
        display: 'test location',
      },
    };
    expect(clone.next(fromJS(visitData)).value).toEqual(
      select(getVisitUuidForEncounter, medicalHistoryData.encounterUuid)
    );

    const encounter = {
      encounterDatetime: '2019-09-06T20:25:01.000+0000',
      encounterType: 'encounterTypeId',
      form: 'encounterPathId',
      location: {
        display: 'test location',
        uuid: 'locationUuid',
      },
      obs: [
        {
          comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000001"}',
          concept: '200032DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          groupMembers: [
            {
              concept: '200032DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              uuid: '9d694b4e-bc47-437e-963f-98f5dd14bad2',
              value: {
                display: 'Hypertension',
                uuid: '117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              },
            },
            {
              concept: '200032DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              uuid: '529310c0-c010-4432-80b5-6aba9e18c340',
              value: {
                display: 'Hepato-bilary disease',
                uuid: '190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            },
            {
              concept: '200032DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              uuid: '09b7e044-c656-43cc-bfd5-0499f3731e9f',
              value: {
                display: 'Malaria',
                uuid: '116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              },
            },
          ],
          obsDatetime: '2019-09-06T16:24:11.000-0400',
          uuid: '19719fad-614a-4e32-903f-0325d0282c11',
          voided: false,
        },
        {
          comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000002"}',
          concept: '200033DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          obsDatetime: '2019-09-06T16:24:18.000-0400',
          uuid: 'e3eb1593-ea05-4879-9618-196f4a4887d4',
          value: false,
          voided: false,
        },
        {
          comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000004"}',
          concept: '200035DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          obsDatetime: '2019-09-06T16:24:20.000-0400',
          uuid: 'c24f2753-62c1-49f7-b067-b5cf3ff2be54',
          value: true,
          voided: false,
        },
        {
          comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000005"}',
          concept: '200036DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          obsDatetime: '2019-09-06T16:24:29.000-0400',
          uuid: '6619ffab-53ce-4320-a117-33deead3c88f',
          value: 2007,
          voided: false,
        },
        {
          comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000006"}',
          concept: '200037DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          obsDatetime: '2019-09-06T16:24:37.000-0400',
          uuid: '36e0e3f4-8808-4df3-8b0d-8517edba0ec7',
          value: 'None',
          voided: false,
        },
        {
          comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000007"}',
          concept: '200038DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          obsDatetime: '2019-09-06T16:24:37.000-0400',
          uuid: '9e1f13ae-e6ba-48b4-bc68-c4ea029e7f74',
          value: true,
          voided: false,
        },
        {
          comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000008"}',
          concept: '200039DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          obsDatetime: '2019-09-06T16:24:57.000-0400',
          uuid: '2de0e024-30d1-450a-9d0f-98a41b06fe0e',
          value: 'Butt Implant',
          voided: false,
        },
      ],
      patient: 'patientUuid',
      uuid: 'acabffdd-6459-48cd-983a-8e3cdd0768a0',
      visit: 'visitId',
    };

    expect(clone.next().value).toEqual(
      put(
        saveEncounterAction(action.url, encounter, {
          episodeUuid,
          isFormSubmission: true,
          patient: patientData.uuid,
        })
      )
    );

    expect(clone.next().done).toEqual(true);
  });

  it('should save forms with patient attributes and identifiers', () => {
    const action = submitFormAction(
      'testUrl',
      'visitId',
      ['encounterPathId'],
      'encounterTypeId'
    );
    const generator = cloneableGenerator(submitForm)(action);
    const clone = generator.clone();
    expect(clone.next().value).toEqual(
      select(getFormFieldToConcept, action.encounterPath[0])
    );

    const formFieldToConcept = {
      'a8226268-25f7-4796-a02d-1bba1908f54f':
        '200091DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      '200139DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD':
        '200139DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      '97745d78-897c-402b-b647-a865d3d3d2a7':
        '200092DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      '162f31c9-64fa-42d9-972f-d38e8f98a141':
        '200086DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'eb569d3b-1441-46f2-9f31-2230f040bef1':
        '200087DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      '245f831d-46c5-4027-bc50-ba97c2d2c41b':
        '200090DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'f69636b0-b575-4fde-9397-834cb4e4b47c':
        '200088DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      '63b79a7f-068f-4677-9185-13c44c5a5934':
        '200084DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      '265e5a84-adc8-4353-8220-ebaa305281ca':
        '200089DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      '99fab54b-02f7-4782-81c8-ec16ae35f3f4':
        '200085DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      'ac8b1221-b1b7-4b50-a851-c6062848bf90':
        '200093DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    };
    expect(clone.next(fromJS(formFieldToConcept)).value).toEqual(
      select(getFormFieldToField, action.encounterPath[0])
    );

    const formFieldToField = {
      'a8226268-25f7-4796-a02d-1bba1908f54f':
        '7feba621-3dfe-437c-9203-60745cfef39a',
      '1b80414c-3ef8-4548-b0d1-cd533d02e1e3':
        'e16698ce-c292-4050-bf6c-278e43c2334a',
      '97745d78-897c-402b-b647-a865d3d3d2a7':
        '98dd8908-104b-4b16-a465-291f309dd1d9',
      '162f31c9-64fa-42d9-972f-d38e8f98a141':
        '379ec7dd-ae6b-4d9a-af10-eb2c2df79e34',
      'eb569d3b-1441-46f2-9f31-2230f040bef1':
        '22f8843b-f419-44de-98e3-7ed5259e66e3',
      '245f831d-46c5-4027-bc50-ba97c2d2c41b':
        'd98dd460-e9e7-40d7-b401-709a1f8f4505',
      'f69636b0-b575-4fde-9397-834cb4e4b47c':
        '3bf3e379-d004-4c20-9843-f2ae748aa8fc',
      '63b79a7f-068f-4677-9185-13c44c5a5934':
        'eb1499bd-fe91-4cb2-993e-3cd44f984e44',
      '770e1eb5-e4d7-4749-8940-c17fde1b3ef7':
        '0fc00f48-9590-4e57-a0b2-0be32091207e',
      '265e5a84-adc8-4353-8220-ebaa305281ca':
        '1f0785a5-e867-42fb-ac0a-b8a29b65a6ce',
      '2cdcbfb0-0c35-489f-bdb2-53a3ac3dd6a8':
        '72728d2f-7f0d-4d89-995f-b4793dfddaea',
      '99fab54b-02f7-4782-81c8-ec16ae35f3f4':
        'fbdd4887-8f3b-414b-919d-7a9b27534337',
      'ac8b1221-b1b7-4b50-a851-c6062848bf90':
        '6b807f18-81d9-409d-b823-83853758afb0',
    };
    expect(clone.next(fromJS(formFieldToField)).value).toEqual(
      select(selectFormMetadata, action.encounterPath[0])
    );

    expect(clone.next(fromJS(generalInfoMetaData)).value).toEqual(
      select(getFormData, action.encounterPath)
    );

    expect(clone.next(fromJS(generalInfoData)).value).toEqual(
      select(getCurrentEpisodeUuid)
    );

    const episodeUuid = 'testEpisodeUuid';
    expect(clone.next(fromJS(episodeUuid)).value).toEqual(
      select(getCurrentPatient)
    );

    const patientData = {
      uuid: 'patientUuid',
    };
    expect(clone.next(fromJS(patientData)).value).toEqual(
      select(getCurrentVisit)
    );

    const visitData = {
      uuid: 'visitUuid',
      location: {
        uuid: 'locationUuid',
        display: 'test location',
      },
    };
    expect(clone.next(fromJS(visitData)).value).toEqual(
      select(getVisitUuidForEncounter, generalInfoData.encounterUuid)
    );

    const attributes = [
      '2cdcbfb0-0c35-489f-bdb2-53a3ac3dd6a8',
      '770e1eb5-e4d7-4749-8940-c17fde1b3ef7',
      '1b80414c-3ef8-4548-b0d1-cd533d02e1e3',
    ];
    const v = clone.next().value;
    expect(v).toEqual(
      call(
        saveAttributes,
        action,
        attributes,
        fromJS(generalInfoData),
        patientData.uuid
      )
    );

    const encounter = {
      encounterDatetime: '2019-09-30T18:32:11.000+0000',
      encounterType: 'encounterTypeId',
      patient: 'patientUuid',
      obs: [
        {
          concept: '200085DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          comment: '{"formField":"99fab54b-02f7-4782-81c8-ec16ae35f3f4"}',
          obsDatetime: '2019-09-30T14:32:09.000-0400',
          voided: false,
          value: true,
          uuid: '41d87576-175b-405b-aa60-105246e711dd',
          groupMembers: undefined,
        },
      ],
      visit: 'visitId',
      form: 'encounterPathId',
      location: { uuid: 'locationUuid', display: 'test location' },
      uuid: '59c885c8-ae81-4b1a-b386-26b581ba0d58',
    };

    expect(clone.next().value).toEqual(
      put(
        saveEncounterAction(action.url, encounter, {
          episodeUuid,
          isFormSubmission: true,
          patient: patientData.uuid,
        })
      )
    );

    expect(clone.next().done).toEqual(true);
  });

  it('should save attributes', () => {
    const action = submitFormAction(
      'testUrl',
      'visitId',
      ['encounterPathId'],
      'encounterTypeId'
    );
    const attributes = [
      '2cdcbfb0-0c35-489f-bdb2-53a3ac3dd6a8',
      '770e1eb5-e4d7-4749-8940-c17fde1b3ef7',
      '1b80414c-3ef8-4548-b0d1-cd533d02e1e3',
    ];
    const patient = 'patientUuid';
    const generator = cloneableGenerator(saveAttributes)(
      action,
      attributes,
      fromJS(generalInfoData),
      patient
    );
    const clone = generator.clone();

    expect(clone.next().value).toEqual(
      all([
        put(
          savePatientIdentifierAction(
            action.url,
            {
              identifier: '1234',
              uuid: '9e58d02f-afe3-4f81-91ef-8244f87df419',
              identifierType: identifierType.FILE_NUMBER_TYPE_UUID,
              location: locationUuids.INPATIENT_WARD,
            },
            patient
          )
        ),
        put(
          savePatientAttributeAction(
            action.url,
            {
              value: '123456',
              uuid: '44fdbd82-82db-46bd-a713-55137ad91b05',
              attributeType: attributeType.PHONE_UUID,
            },
            patient
          )
        ),
      ])
    );

    expect(clone.next().done).toEqual(true);
  });

  it('should fails if there is an error', () => {
    const action = submitFormAction(
      'testUrl',
      'visitId',
      ['encounterPathId'],
      'encounterTypeId'
    );
    const generator = cloneableGenerator(submitForm)(action);
    const clone = generator.clone();
    expect(clone.next().value).toEqual(
      select(getFormFieldToConcept, action.encounterPath[0])
    );
    expect(clone.throw(new Error('submit form failed')).value).toEqual(
      put(submitFormFailAction('submit form failed'))
    );
    expect(clone.next().done).toEqual(true);
  });
});
