import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Visits from '../../../js/features/visits/visits';
import { mountWithRouterAndIntl } from '../../enzyme-test-helpers';

describe('Visits', () => {
  let mockFunc1;
  let mockFunc2;
  let mockFunc3;
  let mockFunc4;
  let mockFunc5;
  let mockFunc6;
  let mockFunc7;
  let mockFunc8;
  beforeEach(() => {
    mockFunc1 = jest.fn();
    mockFunc2 = jest.fn();
    mockFunc3 = jest.fn();
    mockFunc4 = jest.fn();
    mockFunc5 = jest.fn();
    mockFunc6 = jest.fn();
    mockFunc7 = jest.fn();
    mockFunc8 = jest.fn();
  });

  it('should render', () => {
    const result = [];
    const component = mountWithRouterAndIntl(
      <MemoryRouter initialEntries={['/visits']}>
        <Visits
          dispatchFetchVisitsAction={mockFunc1}
          selectVisit={mockFunc3}
          fetchForms={mockFunc4}
          selectForm={mockFunc5}
          fetchFormsResource={mockFunc6}
          selectFormResource={mockFunc7}
          history={result}
          value={{
            results: [
              {
                id: '010',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '010',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '001',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '001',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '002',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '002',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '003',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '003',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '004',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '004',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '005',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '005',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '006',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '006',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '007',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '007',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '008',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '008',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '009',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '009',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
              {
                id: '011',
                givenName: 'Martin',
                familyName: 'Zakov',
                mrn: '011',
                status: 'needs attention',
                acuity: 1,
                startDatetime: '03/13/2018',
                diagnosis: 'Trololo',
                alerts: null,
              },
            ],
          }}
        />
      </MemoryRouter>
    );

    const componentNoResults = mountWithRouterAndIntl(
      <MemoryRouter initialEntries={['/visits']}>
        <Visits
          dispatchFetchVisitsAction={mockFunc2}
          fetchForms={mockFunc4}
          selectForm={mockFunc5}
          fetchFormsResource={mockFunc6}
          value={{
            results: [],
          }}
        />
      </MemoryRouter>
    );

    expect(component).toBeDefined();
    expect(componentNoResults).toBeDefined();

    const table = component.find('VcTable').getElement();
    const wardHeader = component.find('WardHeader').getElement();
    const tabs = component.find('Tabs').getElement();
    expect(mockFunc1.mock.calls.length).toBe(1);

    table.props.onChangePage({}, 0);
    expect(mockFunc1.mock.calls.length).toBe(2);

    table.props.onChangeRowsPerPage({ target: { value: 20 } }, {});
    expect(mockFunc1.mock.calls.length).toBe(3);

    table.props.onRowClick({}, 1);
    table.props.onFilter('acuity', -1);
    expect(mockFunc1.mock.calls.length).toBe(4);

    table.props.onFilter('acuity', 3);
    expect(mockFunc1.mock.calls.length).toBe(5);

    table.props.onFilter('acuity', '');
    expect(mockFunc1.mock.calls.length).toBe(6);

    table.props.onSort('startDatetime', 'asc');
    expect(mockFunc1.mock.calls.length).toBe(7);

    wardHeader.props.onEnter('value');
    expect(mockFunc1.mock.calls.length).toBe(8);
    wardHeader.props.onSearchClose();
    expect(mockFunc1.mock.calls.length).toBe(9);
    expect(mockFunc6.mock.calls.length).toBe(2);
    expect(mockFunc7.mock.calls.length).toBe(1);
    tabs.props.onClick('every');
    tabs.props.onClick('Intake');
    tabs.props.onClick('ANC');
    tabs.props.onClick('PNC');
    tabs.props.onClick('Labor');
    tabs.props.onLoad();
    wardHeader.props.onSearchChange({ target: 'value' });

    component.unmount();
    componentNoResults.unmount();
  });
});
