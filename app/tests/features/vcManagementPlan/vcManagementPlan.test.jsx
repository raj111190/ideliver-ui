import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockStore } from 'redux-test-utils';
import { fromJS } from 'immutable';
import { mountWithRouterAndIntl } from '../../enzyme-test-helpers';
import VcManagementPlan from '../../../js/features/vcManagementPlan/vcManagementPlan';

describe('VcManagementPlan', () => {
  let store, mockFunc, mockFunc2, testState;
  beforeEach(() => {
    testState = {
      Visits: fromJS({
        metadata: { forms: { mockFormId: { schema: 'schema' } } },
        data: {
          DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD: {
            forms: { mockFormId: { data: 'data' } },
          },
        },
      }),
      ui: {
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
      },
      entities: fromJS({
        forms: {},
      }),
    };
    store = createMockStore(testState);
    mockFunc = jest.fn();
    mockFunc2 = jest.fn();
  });

  it('renders with acuity 1', () => {
    const component = mountWithRouterAndIntl(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <VcManagementPlan
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
            isStarted={false}
            acuity={1}
            diagnosis={{ value: { display: 'Some Diagnosis' } }}
            timestamp=""
            onStart={() => {}}
            selectForm={mockFunc2}
          />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toBeDefined();
  });
  it('renders with acuity 2', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <VcManagementPlan
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
            isStarted
            acuity={2}
            diagnosis={{ value: { display: 'Some Diagnosis' } }}
            timestamp=""
            onStart={() => {}}
            selectForm={mockFunc2}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(component).toBeDefined();
  });
  it('renders with acuity 3', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <VcManagementPlan
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
            isStarted
            acuity={3}
            diagnosis={{ value: { display: 'Some Diagnosis' } }}
            timestamp=""
            onStart={() => {}}
            selectForm={mockFunc2}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(component).toBeDefined();
  });
  it('renders with acuity 4', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <VcManagementPlan
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
            isStarted
            acuity={4}
            diagnosis={{ value: { display: 'Some Diagnosis' } }}
            timestamp=""
            onStart={() => {}}
            onSubmit={mockFunc}
            metadata={{ encounterType: { uuid: 'mockUuid' } }}
            selectForm={mockFunc2}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(component).toBeDefined();

    const form = component.find('VcForm').at(0);
    form.props().onEveryChange();
    expect(mockFunc.mock.calls.length).toBe(1);
  });
  it('renders with acuity 5', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <VcManagementPlan
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
            acuity={5}
            diagnosis={{ value: { display: 'Some Diagnosis' } }}
            timestamp=""
            onStart={() => {}}
            onSubmit={mockFunc}
            metadata={{ encounterType: { uuid: 'mockUuid' } }}
            selectForm={mockFunc2}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(mockFunc.mock.calls.length).toBe(0);

    const button = component.find('VcButton').at(0);
    button.props().onClick();
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
