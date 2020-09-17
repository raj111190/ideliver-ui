import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router-dom';
import { fromJS } from 'immutable';
import { form, formField } from '../../../js/uuid';
import ClientDashboard from '../../../js/features/clientDashboard/clientDashboard';
import { mountWithRouterAndIntl } from '../../enzyme-test-helpers';

describe('ClientDashboard', () => {
  let mockFunc2;
  let mockFunc3;
  let mockFunc4;
  let mockFunc5;
  let store;
  let testState;
  beforeEach(() => {
    mockFunc2 = jest.fn();
    mockFunc3 = jest.fn();
    mockFunc4 = jest.fn();
    mockFunc5 = jest.fn();
    testState = {
      Visits: fromJS({
        metadata: {
          forms: {
            mockFormId: {
              encounterType: { uuid: 'mockUuid' },
              formFields: [
                {
                  uuid: 1,
                  field: {
                    description:
                      '{"name":"VcTextField","props":{"vType":"number"},"validation":{}}',
                  },
                  fieldNumber: 1,
                },
                {
                  uuid: 2,
                  field: {
                    description:
                      '{"name":"VcTextField","props":{"vType":"number"},"validation":{}}',
                  },
                  fieldNumber: 2,
                },
              ],
            },
          },
        },
        data: {
          DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD: {
            forms: { mockFormId: { data: 'data' } },
          },
        },
      }),
      entities: fromJS({
        episodes: {},
        observations: {},
      }),
      ui: {
        episode: fromJS({}),
        observation: fromJS({}),
        form: fromJS({}),
        formResource: fromJS({
          fetching: false,
          requiredFormFields: {},
          formResourceData: {
            results: [
              {
                uuid: 'de5affcd-8881-47ea-8fce-8f0d68696cbf',
                name: 'Demographics',
                valueReference: '{"saveButtons":[{"save":{"label":"Save"}}]}',
                display: 'Demographics',
                resourceVersion: '1.9',
                links: [
                  {
                    rel: 'value',
                    uri:
                      'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                  },
                  {
                    rel: 'self',
                    uri:
                      'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                  },
                  {
                    rel: 'full',
                    uri:
                      'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                  },
                ],
              },
            ],
          },
          selectedFormResource: '71a643f5-63e1-439f-a8a6-cb4f2bced721',
        }),
        visit: fromJS({
          currentVisit: '',
        }),
      },
    };
    store = createMockStore(testState);
  });

  it('should render', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/client/:visitId/:patientId/']}>
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(mockFunc3.mock.calls.length).toBe(1);
    expect(component).toBeDefined();
  });

  it('should render vital', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/client/:visitId/:patientId/vitals']}>
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render lab results', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/labResults']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render active labour', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/activeLabour']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
            visit={{
              forms: {
                [form.MEDICAL_HISTORY_FORM_UUID]: {
                  [formField.EXISTING_CONDITIONS_UUID]: [
                    { value: { display: 'riskFactor1', voided: true } },
                    { value: { display: 'riskFactor2', voided: false } },
                  ],
                },
                [form.COMPLAINTS_FORM_UUID]: [{ valueUuid: 'true' }],
              },
            }}
            metadata={{
              forms: {
                complaints: {
                  formFields: [
                    {
                      valueUuid: {
                        uuid: 'valueUuid',
                        field: { name: 'mockFieldName' },
                      },
                    },
                  ],
                },
              },
            }}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render active patient info', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/patientInfo']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render Diagnosis Card', () => {
    const diagnosisData = [
      {
        concept: {
          display: 'Visit Diagnoses',
          uuid: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        },
        obsDatetime: '2019-08-01T23:24:11.000-0400',
        uuid: '0de3de32-5bdf-4da4-8d79-c5bf26900d11',
        voided: false,
        groupMembers: [
          {
            concept: {
              display: 'Diagnosis certainty',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              uuid: '159394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            },
            uuid: 'b998af4c-ed22-4a84-a09b-e4b49806329d',
            value: {
              uuid: '159392AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Confirmed diagnosis',
              attributes: [],
            },
            display: 'Diagnosis certainty: Confirmed diagnosis',
          },
          {
            concept: {
              display: 'Diagnosis order',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              uuid: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            },
            uuid: '28368d13-c1fe-4cb7-8db5-36a9cfccbfdb',
            value: {
              uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Primary',
              attributes: [],
            },
            display: 'Diagnosis order: Primary',
          },
          {
            concept: {
              set: false,
              display: 'PROBLEM LIST',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              uuid: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            },
            uuid: '69f83455-8791-419d-8023-ec4b691da920',
            value: {
              uuid: '190049DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Gestational Hypertension',
              attributes: [
                {
                  display: 'Diagnosis Acuity: 4',
                  uuid: '32e214d8-58fd-4d10-8860-7ceb106a4565',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  value: '4',
                  voided: false,
                },
              ],
            },
            display: 'PROBLEM LIST: Gestational Hypertension',
          },
        ],
      },
      {
        concept: {
          display: 'Visit Diagnoses',
          uuid: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        },
        obsDatetime: '2019-08-01T23:24:11.000-0400',
        uuid: 'c8fcd68e-9389-4381-954f-8866232fe8e6',
        voided: false,
        groupMembers: [
          {
            concept: {
              display: 'Diagnosis certainty',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              uuid: '159394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            },
            uuid: '9597206e-782e-4af0-828a-20b5782d7265',
            value: {
              uuid: '159393AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Presumed diagnosis',
              attributes: [],
            },
            display: 'Diagnosis certainty: Presumed diagnosis',
          },
          {
            concept: {
              display: 'Diagnosis order',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              uuid: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            },
            uuid: '9ce86b7f-703d-40de-a061-16a351785971',
            value: {
              uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Primary',
              attributes: [],
            },
            display: 'Diagnosis order: Primary',
          },
          {
            concept: {
              set: false,
              display: 'PROBLEM LIST',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              retired: false,
              version: '',
              uuid: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            },
            uuid: 'bfbd8ad4-b45b-430b-b383-08726fbf21ae',
            value: {
              uuid: '190024DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Suspected chorioamnionitis',
              attributes: [
                {
                  display: 'Diagnosis Acuity: 2',
                  uuid: '1eb49a8c-93f3-4c7d-9923-a987a4978193',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  value: '2',
                  voided: false,
                },
              ],
            },
            display: 'PROBLEM LIST: Suspected chorioamnionitis',
            obsDatetime: '2019-08-01T23:24:11.000-0400',
          },
        ],
      },
    ];

    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/patientInfo']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            allDiagnoses={diagnosisData}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const diagnosisCard = component.find('VcDiagnosisCard');
    expect(component).toBeDefined();
    expect(diagnosisCard.length).toEqual(1);
  });

  it('should render medical history', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/medicalHistory']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render ob history', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/obHistory']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render complaints assessment', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/complaintsAssessment']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render labour signs', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/labourSigns']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render fetus', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/client/:visitId/:patientId/fetus']}>
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render admission', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/admission']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render referral', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/client/:visitId/:patientId/referral']}>
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render discharge', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/discharge']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render labourSummary', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/labourSummary']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });

  it('should render managementPlans', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/client/:visitId/:patientId/managementPlans']}
        >
          <ClientDashboard
            patientNotes={[]}
            fetchEpisodes={mockFunc3}
            fetchForms={mockFunc4}
            location={{ pathname: 'test' }}
            updatePatientStatus={mockFunc2}
            selectForm={mockFunc5}
          />
        </MemoryRouter>
      </Provider>
    );

    const vcFormContainer = component.find('ClientDashboard').at(0);
    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);
    vcFormContainer.props().updatePatientStatus();
    expect(mockFunc2.mock.calls.length).toBe(1);
  });
});
