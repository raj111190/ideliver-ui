import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fromJS } from 'immutable';
import { IntlProvider } from 'react-intl';
import { createMockStore } from 'redux-test-utils';
import { mountWithRouterAndIntl } from '../../enzyme-test-helpers';
import VcDashboardCard from '../../../js/components/vcDashboardCard/vcDashboardCard';

describe('VcDashboardCard', () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider({ locale: 'en' }, {});
  const { intl } = intlProvider.getChildContext();

  let store;
  let testState;
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
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
  });

  it('renders without crashing', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <VcDashboardCard.WrappedComponent
            intl={intl}
            onFiltersSelected={mockFunc}
            value="Summary"
            title="Visit Summary"
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
          />
        </MemoryRouter>
      </Provider>
    )
      .find('VcDashboardCard')
      .at(0);
    expect(component).toBeDefined();
  });

  it('toggles state expanded when cross circle image clicked', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <VcDashboardCard.WrappedComponent
            intl={intl}
            onFiltersSelected={mockFunc}
            value="Summary"
            title="Visit Summary"
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
          />
        </MemoryRouter>
      </Provider>
    )
      .find('VcDashboardCard')
      .at(0);

    const button = component.find('IconButton').at(0);

    button.simulate('click');
    expect(component.state()).toEqual({
      expanded: true,
      open: true,
    });
    button.simulate('click');
    expect(component.state()).toEqual({
      expanded: false,
      open: true,
    });
  });

  it('checks functionality when close button in dialog header is clicked ', () => {
    const component = mountWithRouterAndIntl(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <VcDashboardCard.WrappedComponent
            intl={intl}
            onFiltersSelected={mockFunc}
            value="Summary"
            title="Visit Summary"
            filterComments={['Test']}
            location={{
              pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
            }}
          />
        </MemoryRouter>
      </Provider>
    )
      .find('VcDashboardCard')
      .at(0);

    const button = component.find('IconButton').at(0);

    expect(component.contains('IconButton')).toBe(false);

    expect(component.state()).toEqual({
      expanded: false,
      open: false,
    });
  });
});
