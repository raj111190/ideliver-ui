import React from 'react';
import { FormattedDate } from 'react-intl';
import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import fetchVisitsSaga, {
  getUrlQuery,
} from '../../../../js/features/visits/sagas/fetchVisitsSaga';
import fetchVisitsSuccessAction from '../../../../js/features/visits/actions/fetchVisitsSuccessAction';
import fetchVisitsFailAction from '../../../../js/features/visits/actions/fetchVisitsFailAction';
import fetchVisitsAction, {
  FETCH_VISITS_ACTION,
} from '../../../../js/features/visits/actions/fetchVisitsAction';
import { getData } from '../../../../js/api';
import VcAcuity from '../../../../js/components/vcAcuity/vcAcuity';
import VcDiagnosisDisplay from '../../../../js/components/vcDiagnosisDisplay/vcDiagnosisDisplay';

const options = {
  pageSize: 1,
  pageIndex: 0,
  searchText: '',
  sortKey: 'startDatetime',
  sortOrder: 'desc',
  filters: {
    acuity: {
      labels: ['1', '2', '3', '4', '5'],
      selected: [1, 3, 4],
    },
    status: {
      labels: ['Waiting', 'Assessment', 'Admitted', 'Postpartum', 'Referral'],
      selected: [0, 2],
    },
  },
};
const action = fetchVisitsAction('test', options);

describe('Fetch Visits flow', () => {
  const urlQuery = getUrlQuery({
    url: 'test',
    type: FETCH_VISITS_ACTION,
    options,
  });
  const generator = cloneableGenerator(fetchVisitsSaga)(action);
  expect(generator.next().value).toEqual(call(getData, urlQuery));

  test('fetch success with 3 names', () => {
    const clone = generator.clone();
    expect(
      clone.next({
        totalCount: 3,
        results: [
          {
            uuid: '30a3e000-473b-4274-bdac-c9df86648cca',
            startDatetime: '2018-03-29T11:11:55.000-0400',
            patient: {
              uuid: '01ec3837-3c19-4a5c-aa6b-cca2157e9083',
              patientIdentifier: { identifier: '10006H' },
              person: {
                uuid: '123',
                attributes: [
                  {
                    attributeType: {
                      uuid: '204c7234-88fb-4bb0-ae97-df6fd52de05f',
                      display: 'Person Status',
                    },
                    display: 'Person Status',
                    uuid: '204c7234-88fb-4bb0-ae97-df6fd52de05f',
                    display: 'Person Status = Labor',
                    uuid: '61f5ad5f-772b-4fa8-b25a-54e8a92aeaa3',
                    value: 'Intake',
                    voided: false,
                  },
                ],
                personName: {
                  givenName: 'firstName',
                  familyName: 'lastName',
                },
              },
            },
            encounters: [
              {
                uuid: '0aaa7f15-4ece-47e7-9204-609992bb57fc',
                encounterType: {
                  display: 'Acuity',
                  uuid: '92f48d4d-01f5-426d-a7e9-fae8047e257d',
                },
                obs: [
                  {
                    uuid: 'b66b80ad-6d7a-4c2b-afe9-0a9ba064ba86',
                    concept: {
                      display: 'Acuity Level',
                      uuid: '300000DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    value: {
                      uuid: '180050DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'L1',
                    },
                  },
                ],
              },
              {
                uuid: '0aaa7f15-4ece-47e7-9204-609992bc57fc',
                encounterType: {
                  display: 'History',
                  uuid: '9e846e8b-e685-484c-b999-fadc73bf9242',
                },
                obs: [
                  {
                    uuid: 'b66c80ad-6d7a-4c2b-afe9-0a9ba064ba89',
                    concept: {
                      display: 'Last menstrual period date',
                      uuid: 'f05edc5c-c9c1-4574-80b0-032e8e14ee02',
                    },
                    value: '2018-03-29T11:11:55.000-0400',
                  },
                ],
              },
              {
                uuid: '73507441-2a76-4b16-a098-256b385ec2ea',
                encounterType: {
                  uuid: '698b3ab5-ff32-4120-a1fd-7375748ea3a1',
                  display: 'Diagnosis',
                },
                obs: [
                  {
                    uuid: 'd7a4dd92-4757-4818-a746-75b0c850a2fc',
                    concept: {
                      uuid: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      display: 'Visit Diagnoses',
                    },
                    groupMembers: [
                      {
                        concept: {
                          uuid: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        },
                        value: {
                          uuid: '116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                          display: 'Malaria',
                        },
                      },
                      {
                        concept: {
                          uuid: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        },
                        value: {
                          uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                          display: 'Primary',
                        },
                      },
                      {
                        concept: {
                          uuid: '159394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        },
                        value: {
                          uuid: '159393AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                          display: 'Presumed diagnosis',
                        },
                      },
                    ],
                    value: null,
                  },
                ],
              },
            ],
            attributes: [
              {
                uuid: 'b55d85db-272f-46d5-9314-be19bf92de9d',
                display: 'Patient Status: Waiting',
                value: 'Waiting',
                attributeType: {
                  uuid: '4402828d-2b88-48f6-ba25-1ba866aa11e2',
                  name: 'Patient Status',
                },
              },
            ],
          },
        ],
      }).value
    ).toEqual(
      put(
        fetchVisitsSuccessAction({
          totalCount: 3,
          results: [
            {
              id: '30a3e000-473b-4274-bdac-c9df86648cca',
              patient: '01ec3837-3c19-4a5c-aa6b-cca2157e9083',
              mrn: '10006H',
              edd: 'January 3, 2019',
              givenName: 'firstName',
              familyName: 'lastName',
              status: 'Intake',
              startDatetime: (
                <FormattedDate
                  value="2018-03-29T11:11:55.000-0400"
                  month="long"
                  day="2-digit"
                  hour="2-digit"
                  minute="2-digit"
                  second="2-digit"
                />
              ),
              acuity: <VcAcuity value={1} />,
              diagnosis: <VcDiagnosisDisplay value={[]} />,
            },
          ],
        })
      )
    );
    expect(clone.next().done).toEqual(true);
  });

  test('fetch success with 2 names', () => {
    const clone = generator.clone();
    expect(
      clone.next({
        totalCount: 2,
        results: [
          {
            uuid: '30a3e000-473b-4274-bdac-c9df86648cca',
            startDatetime: '2018-03-29T11:11:55.000-0400',
            patient: {
              uuid: '01ec3837-3c19-4a5c-aa6b-cca2157e9083',
              patientIdentifier: { identifier: '10006H' },
              person: {
                uuid: '123',
                attributes: [
                  {
                    attributeType: {
                      uuid: '204c7234-88fb-4bb0-ae97-df6fd52de05f',
                      display: 'Person Status',
                    },
                    display: 'Person Status',
                    uuid: '204c7234-88fb-4bb0-ae97-df6fd52de05f',
                    display: 'Person Status = Labor',
                    uuid: '61f5ad5f-772b-4fa8-b25a-54e8a92aeaa3',
                    value: 'Intake',
                    voided: false,
                  },
                ],
                personName: {
                  givenName: 'firstName',
                  familyName: 'lastName',
                },
              },
            },
            encounters: [
              {
                uuid: '0aaa7f15-4ece-47e7-9204-609992bb57fc',
                encounterType: {
                  display: 'Acuity',
                  uuid: '92f48d4d-01f5-426d-a7e9-fae8047e257d',
                },
                obs: [
                  {
                    uuid: 'b66b80ad-6d7a-4c2b-afe9-0a9ba064ba86',
                    concept: {
                      display: 'Acuity Level',
                      uuid: '300000DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    value: {
                      uuid: '180050DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'L1',
                    },
                  },
                ],
              },
              {
                uuid: '73507441-2a76-4b16-a098-256b385ec2ea',
                encounterType: {
                  uuid: '698b3ab5-ff32-4120-a1fd-7375748ea3a1',
                  display: 'Diagnosis',
                },
                obs: [
                  {
                    uuid: 'd7a4dd92-4757-4818-a746-75b0c850a2fc',
                    concept: {
                      uuid: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      display: 'Visit Diagnoses',
                    },
                    groupMembers: [
                      {
                        concept: {
                          uuid: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        },
                        value: {
                          uuid: '116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                          display: 'Malaria',
                        },
                      },
                      {
                        concept: {
                          uuid: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        },
                        value: {
                          uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                          display: 'Primary',
                        },
                      },
                      {
                        concept: {
                          uuid: '159394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        },
                        value: {
                          uuid: '159392AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                          display: 'Confirmed diagnosis',
                        },
                      },
                    ],
                    value: null,
                  },
                ],
              },
            ],
            attributes: [
              {
                uuid: 'b55d85db-272f-46d5-9314-be19bf92de9d',
                display: 'Patient Status: Waiting',
                value: 'Waiting',
                attributeType: {
                  uuid: '4402828d-2b88-48f6-ba25-1ba866aa11e2',
                  name: 'Patient Status',
                },
              },
            ],
          },
        ],
      }).value
    ).toEqual(
      put(
        fetchVisitsSuccessAction({
          totalCount: 2,
          results: [
            {
              id: '30a3e000-473b-4274-bdac-c9df86648cca',
              patient: '01ec3837-3c19-4a5c-aa6b-cca2157e9083',
              mrn: '10006H',
              givenName: 'firstName',
              familyName: 'lastName',
              edd: null,
              status: 'Intake',
              startDatetime: (
                <FormattedDate
                  value="2018-03-29T11:11:55.000-0400"
                  month="long"
                  day="2-digit"
                  hour="2-digit"
                  minute="2-digit"
                  second="2-digit"
                />
              ),
              acuity: <VcAcuity value={1} />,
              diagnosis: <VcDiagnosisDisplay value={['Malaria']} />,
            },
          ],
        })
      )
    );
    expect(clone.next().done).toEqual(true);
  });

  test('fetch success with less records than page size', () => {
    const options = {
      pageSize: 2,
      pageIndex: 0,
      searchText: '',
      sortKey: 'startDatetime',
      sortOrder: 'desc',
      filters: {
        acuity: {
          labels: ['1', '2', '3', '4', '5'],
          selected: [1, 3, 4],
        },
        status: {
          labels: [
            'Waiting',
            'Assessment',
            'Admitted',
            'Postpartum',
            'Referral',
          ],
          selected: [0, 2],
        },
      },
    };
    const action2 = fetchVisitsAction('test', options);
    const generator2 = cloneableGenerator(fetchVisitsSaga)(action2);
    const urlQuery2 = getUrlQuery({
      url: 'test',
      type: FETCH_VISITS_ACTION,
      options,
    });
    expect(generator2.next().value).toEqual(call(getData, urlQuery2));

    expect(
      generator2.next({
        totalCount: 2,
        results: [
          {
            uuid: '30a3e000-473b-4274-bdac-c9df86648cca',
            startDatetime: '2018-03-29T11:11:55.000-0400',
            patient: {
              uuid: '01ec3837-3c19-4a5c-aa6b-cca2157e9083',
              patientIdentifier: { identifier: '10006H' },
              person: {
                uuid: '123',
                attributes: [
                  {
                    attributeType: {
                      uuid: '204c7234-88fb-4bb0-ae97-df6fd52de05f',
                      display: 'Person Status',
                    },
                    display: 'Person Status',
                    uuid: '204c7234-88fb-4bb0-ae97-df6fd52de05f',
                    display: 'Person Status = Labor',
                    uuid: '61f5ad5f-772b-4fa8-b25a-54e8a92aeaa3',
                    value: 'Intake',
                    voided: false,
                  },
                ],
                personName: {
                  givenName: 'firstName',
                  familyName: 'lastName',
                },
              },
            },
            encounters: [
              {
                uuid: '0aaa7f15-4ece-47e7-9204-609992bb57fc',
                encounterType: {
                  display: 'Acuity',
                  uuid: '92f48d4d-01f5-426d-a7e9-fae8047e257d',
                },
                obs: [
                  {
                    uuid: 'b66b80ad-6d7a-4c2b-afe9-0a9ba064ba86',
                    concept: {
                      display: 'Acuity Level',
                      uuid: '300000DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    value: {
                      uuid: '180050DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'L1',
                    },
                  },
                ],
              },
              {
                uuid: '73507441-2a76-4b16-a098-256b385ec2ea',
                encounterType: {
                  uuid: '698b3ab5-ff32-4120-a1fd-7375748ea3a1',
                  display: 'Diagnosis',
                },
                obs: [],
              },
            ],
            attributes: [
              {
                uuid: 'b55d85db-272f-46d5-9314-be19bf92de9d',
                display: 'Patient Status: Waiting',
                value: 'Waiting',
                attributeType: {
                  uuid: '4402828d-2b88-48f6-ba25-1ba866aa11e2',
                  name: 'Patient Status',
                },
              },
            ],
          },
        ],
      }).value
    ).toEqual(
      put(
        fetchVisitsSuccessAction({
          totalCount: 2,
          results: [
            {
              id: '30a3e000-473b-4274-bdac-c9df86648cca',
              patient: '01ec3837-3c19-4a5c-aa6b-cca2157e9083',
              mrn: '10006H',
              edd: null,
              givenName: 'firstName',
              familyName: 'lastName',
              status: 'Intake',
              startDatetime: (
                <FormattedDate
                  value="2018-03-29T11:11:55.000-0400"
                  month="long"
                  day="2-digit"
                  hour="2-digit"
                  minute="2-digit"
                  second="2-digit"
                />
              ),
              acuity: <VcAcuity value={1} />,
              diagnosis: <VcDiagnosisDisplay value={[]} />,
            },
          ],
        })
      )
    );
    expect(generator2.next().done).toEqual(true);
  });

  test('fetch error', () => {
    const clone = generator.clone();
    expect(clone.throw({ message: 'error' }).value).toEqual(
      put(fetchVisitsFailAction('error'))
    );
    expect(clone.next().done).toEqual(true);
  });
});
