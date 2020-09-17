import { fromJS } from 'immutable';
import {
  getAddressString,
  addPopulateValueToForm,
  allPncFormDataSorting,
  sort,
  allVitalFormDataSorting,
} from '../../../../js/state/ui/form/formCrossSiteReducer';

describe('Form Cross Site Reducer', () => {
  it('should convert an address to a string', () => {
    let person = {
      preferredAddress: {
        address1: '123 ABC Street',
        cityVillage: 'CDE',
        stateProvince: 'FGH',
        country: 'IJ',
        postalCode: '45',
      },
    };
    expect(getAddressString(fromJS(person))).toEqual(
      '123 ABC Street, CDE, FGH, IJ, 45'
    );

    person = {
      preferredAddress: {
        address1: '123 ABC Street',
        stateProvince: 'FGH',
        country: 'IJ',
        postalCode: '45',
      },
    };
    expect(getAddressString(fromJS(person))).toEqual(
      '123 ABC Street, FGH, IJ, 45'
    );

    person = {
      preferredAddress: {
        address1: '123 ABC Street',
      },
    };
    expect(getAddressString(fromJS(person))).toEqual('123 ABC Street');

    expect(getAddressString(fromJS({}))).toEqual('');

    expect(getAddressString(null)).toEqual('');
  });

  it('should populate and return data to the form field if data already filled', () => {
    let uuid = 'b5f8ffd8-fbde-11e2-8ff2-fd54ab5fdb2a';
    let obsObj = {
      'ee038cc4-1a53-4738-8967-aaa000000055': {
        comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000055"}',
        obsDatetime: '2019-12-06T12:48:16.000+0530',
        uuid: '58fcfc71-2069-413e-9463-17ed39a16a35',
        value: 22,
      },
    };
    let forms = {
      'b5f8ffd8-fbde-11e2-8ff2-fd54ab5fdb2a': {
        '4ce2c685-32d5-499b-b044-982c7e73fe3b': {
          comment: '{"formField":"4ce2c685-32d5-499b-b044-982c7e73fe3b"}',
          obsDatetime: '2019-12-06T12:49:53.000+0530',
          uuid: '9f85d0fe-2a2e-48b6-b2ef-d8cae64c9bff',
          value: 44,
        },
      },
    };
    let resultMatch = {};
    expect(addPopulateValueToForm(uuid, obsObj, forms)).toEqual(resultMatch);
  });

  it('should populate all the pnc form data in sorted way', () => {
    let unSortedData = [
      {
        '23b2cab3-da98-4469-b7c9-3b2e77869e1b': [
          {
            0: {
              '7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd': {
                comment: '{"formField":"7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd"}',
                obsDatetime: '2020-03-16T15:38:13.000+0530',
                uuid: '7efd662d-a483-4bfb-a025-9f5fee8f638b',
                value: 'pelvic Exam 1',
              },
              encounterDatetime: '2020-03-16T15:38:51.000+0530',
              encounterUuid: 'c65b96bd-a4b4-4680-bcac-19d8ed040e78',
              lastUpdated: '2020-03-16T15:38:51.000+0530',
            },
            1: {
              '7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd': {
                comment: '{"formField":"7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd"}',
                obsDatetime: '2020-03-16T15:46:55.000+0530',
                uuid: '07a18074-abd1-499f-af1c-d686996ad3fa',
                value: 'Pelvic Exam 2',
              },
              encounterDatetime: '2020-03-16T15:47:23.000+0530',
              encounterUuid: '030c282c-56ec-4bfa-b295-48b9a2430d4d',
              lastUpdated: '2020-03-16T15:47:23.000+0530',
            },
          },
        ],
      },
    ];
    let sortData = [
      {
        '23b2cab3-da98-4469-b7c9-3b2e77869e1b': [
          {
            0: {
              '7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd': {
                value: 'pelvic Exam 1',
                obsDatetime: '2020-03-16T15:38:13.000+0530',
                comment: '{"formField":"7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd"}',
                uuid: '7efd662d-a483-4bfb-a025-9f5fee8f638b',
              },
              lastUpdated: '2020-03-16T15:38:51.000+0530',
              encounterDatetime: '2020-03-16T15:38:51.000+0530',
              encounterUuid: 'c65b96bd-a4b4-4680-bcac-19d8ed040e78',
            },
            1: {
              '7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd': {
                value: 'Pelvic Exam 2',
                obsDatetime: '2020-03-16T15:46:55.000+0530',
                comment: '{"formField":"7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd"}',
                uuid: '07a18074-abd1-499f-af1c-d686996ad3fa',
              },
              lastUpdated: '2020-03-16T15:47:23.000+0530',
              encounterUuid: '030c282c-56ec-4bfa-b295-48b9a2430d4d',
              encounterDatetime: '2020-03-16T15:47:23.000+0530',
            },
          },
        ],
      },
    ];
    expect(allPncFormDataSorting(unSortedData.sort())).toEqual(sortData);
  });

  it('should populate all the vital form data in sorted way', () => {
    let vitalUnSortedData = [
      {
        '23b2cab3-da98-4469-b7c9-3b2e77869e1b': [
          {
            0: {
              '7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd': {
                comment: '{"formField":"7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd"}',
                obsDatetime: '2020-03-16T15:38:13.000+0530',
                uuid: '7efd662d-a483-4bfb-a025-9f5fee8f638b',
                value: 'pelvic Exam 1',
              },
              encounterDatetime: '2020-03-16T15:38:51.000+0530',
              encounterUuid: 'c65b96bd-a4b4-4680-bcac-19d8ed040e78',
              lastUpdated: '2020-03-16T15:38:51.000+0530',
            },
            1: {
              '7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd': {
                comment: '{"formField":"7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd"}',
                obsDatetime: '2020-03-16T15:46:55.000+0530',
                uuid: '07a18074-abd1-499f-af1c-d686996ad3fa',
                value: 'Pelvic Exam 2',
              },
              encounterDatetime: '2020-03-16T15:47:23.000+0530',
              encounterUuid: '030c282c-56ec-4bfa-b295-48b9a2430d4d',
              lastUpdated: '2020-03-16T15:47:23.000+0530',
            },
          },
        ],
      },
    ];
    let vitalSortData = [
      {
        '23b2cab3-da98-4469-b7c9-3b2e77869e1b': [
          {
            0: {
              '7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd': {
                value: 'pelvic Exam 1',
                obsDatetime: '2020-03-16T15:38:13.000+0530',
                comment: '{"formField":"7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd"}',
                uuid: '7efd662d-a483-4bfb-a025-9f5fee8f638b',
              },
              lastUpdated: '2020-03-16T15:38:51.000+0530',
              encounterDatetime: '2020-03-16T15:38:51.000+0530',
              encounterUuid: 'c65b96bd-a4b4-4680-bcac-19d8ed040e78',
            },
            1: {
              '7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd': {
                value: 'Pelvic Exam 2',
                obsDatetime: '2020-03-16T15:46:55.000+0530',
                comment: '{"formField":"7feb5905-f4d4-42f8-a2d9-9b40f7ca9cbd"}',
                uuid: '07a18074-abd1-499f-af1c-d686996ad3fa',
              },
              lastUpdated: '2020-03-16T15:47:23.000+0530',
              encounterUuid: '030c282c-56ec-4bfa-b295-48b9a2430d4d',
              encounterDatetime: '2020-03-16T15:47:23.000+0530',
            },
          },
        ],
      },
    ];
    expect(allVitalFormDataSorting(vitalUnSortedData.sort())).toEqual(
      vitalSortData
    );
  });
});
