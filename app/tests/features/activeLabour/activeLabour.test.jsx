import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { fromJS } from 'immutable';
import { createMockStore } from 'redux-test-utils';
import { mountWithRouterAndIntl } from '../../enzyme-test-helpers';
import ActiveLabour from '../../../js/features/activeLabour/activeLabour';
import ClientDashboard from '../../../js/features/clientDashboard/clientDashboard';

describe('ActiveLabour', () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider({ locale: 'en' }, {});
  const { intl } = intlProvider.getChildContext();

  let store;
  let testState;
  let component;
  let componentNoData;
  let activeLabour;
  let activeLabourNoData;
  const mockFunc = jest.fn();
  const initialState = {
    formDisplayed: false,
    formSelected: false,
  };
  const secondState = {
    formDisplayed: 1,
    formSelected: 1,
  };
  beforeEach(() => {
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
      ui: {
        form: fromJS({
          selectedForm: 'mockFormId',
        }),
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
        forms: {
          mockFormId: {
            encounterType: {
              uuid: '123',
            },
          },
        },
      }),
    };
    store = createMockStore(testState);
    component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <ActiveLabour.WrappedComponent
            intl={intl}
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
            uuid="mockFormId"
            selectForm={mockFunc}
            data={[
              {
                'ee038cc4-1a53-4738-8967-aaa000000088': 1,
                'ee038cc4-1a53-4738-8967-aaa000000089': true,
                'ee038cc4-1a53-4738-8967-aaa000000090': {
                  display: 'Light green',
                  uuid: '180012DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                'ee038cc4-1a53-4738-8967-aaa000000091': true,
                'ee038cc4-1a53-4738-8967-aaa000000092': {
                  display: '+',
                  uuid: '180055DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                'ee038cc4-1a53-4738-8967-aaa000000093': 12,
                'ee038cc4-1a53-4738-8967-aaa000000094': 12,
                'ee038cc4-1a53-4738-8967-aaa000000095': 12,
                'ee038cc4-1a53-4738-8967-aaa000000096': {
                  display: 'Moderate: 20-40 seconds',
                  uuid: '180016DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                'ee038cc4-1a53-4738-8967-aaa000000097': 22,
                'ee038cc4-1a53-4738-8967-aaa000000098': 95,
                'ee038cc4-1a53-4738-8967-aaa000000099': 56,
                'ee038cc4-1a53-4738-8967-aaa000000100': 36,
                'ee038cc4-1a53-4738-8967-aaa000000101': 344,
                'ee038cc4-1a53-4738-8967-aaa000000102': 44,
                'ee038cc4-1a53-4738-8967-aaa000000103': 54,
                'ee038cc4-1a53-4738-8967-aaa000000104': [
                  {
                    concept: '200103DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    groupMembers: [
                      {
                        concept: '200100DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        memUuid: 'd8e575d6-5918-4bc4-9542-ecacf85cc16c',
                        value: 'df',
                      },
                      {
                        concept: '200101DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        memUuid: '1cc57e31-12ce-45a0-8af0-e16846abab0c',
                        value: 'ff',
                      },
                      {
                        concept: '200102DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        memUuid: '45c00773-ba6a-43c6-a317-f3138f031885',
                        value: 4656,
                      },
                    ],
                    uuid: 'd6bcd4d3-747d-4a86-8297-4436433d1cce',
                  },
                ],
                encounterDatetime: '2018-09-13T16:46:46.000-0400',
                encounterUuid: '4c7fafff-5348-4988-b353-d918c67621af',
                lastUpdated: '2018-09-13T16:46:46.000-0400',
              },
            ]}
          />
        </MemoryRouter>
      </Provider>
    );
    activeLabour = component.find('ActiveLabour').at(0);
    componentNoData = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <ActiveLabour.WrappedComponent
            intl={intl}
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
            uuid="mockFormId"
            selectForm={mockFunc}
          />
        </MemoryRouter>
      </Provider>
    );
    activeLabourNoData = componentNoData.find('ActiveLabour').at(0);
  });

  it('renders without crashing', () => {
    expect(activeLabour).toBeDefined();
    component.unmount();
  });
  it('renders without crashing no Data', () => {
    expect(activeLabourNoData).toBeDefined();
    componentNoData.unmount();
  });
  it('clicking buttons work', () => {
    expect(activeLabour.state()).toEqual(initialState);
    const button = activeLabour.find('VcButton').at(0);
    button.simulate('click');
    expect(activeLabour.state()).toEqual(secondState);
    const innerComponent = component.find('VcButton').at(1);
    expect(innerComponent).toBeDefined();
    innerComponent.simulate('click');
    expect(activeLabour.state()).toEqual(initialState);
    component.unmount();
  });
});
