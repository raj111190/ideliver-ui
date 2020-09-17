import React from 'react';
import VcTable from '../../../js/components/vcTable/vcTable';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';

describe('VcTable', () => {
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
  });

  const columnData = [
    {
      id: 'givenName',
      sortable: true,
      numeric: false,
      disablePadding: false,
      label: 'First Name',
    },
    {
      id: 'familyName',
      sortable: true,
      numeric: false,
      disablePadding: false,
      label: 'Last Name',
    },
    {
      id: 'mrn',
      sortable: true,
      numeric: true,
      disablePadding: false,
      label: 'MRN',
    },
    {
      id: 'status',
      sortable: false,
      filterOptions: [
        'Waiting',
        'Assessment',
        'Admitted',
        'Postpartum',
        'Referral',
      ],
      filtersSelected: [1, 3],
      numeric: false,
      disablePadding: false,
      label: 'Status',
    },
    {
      id: 'acuity',
      sortable: true,
      filterOptions: ['1', '2', '3', '4', '5'],
      filtersSelected: [1, 3],
      numeric: true,
      disablePadding: false,
      label: 'Acuity',
    },
    {
      id: 'startDatetime',
      sortable: true,
      numeric: true,
      disablePadding: false,
      label: 'Admission Time',
    },
    {
      id: 'diagnosis',
      sortable: false,
      numeric: false,
      disablePadding: false,
      label: 'Diagnosis',
    },
    {
      id: 'alerts',
      sortable: false,
      numeric: false,
      disablePadding: true,
      label: 'Alerts',
    },
  ];

  const mockData = [
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
      onClick: () => mockFunc(),
    },
  ];

  it('renders without crashing', () => {
    const component = shallowWithIntl(
      <VcTable
        data={mockData}
        columnData={columnData}
        order="desc"
        orderBy="alerts"
        rowsPerPage={10}
        page={0}
        onChangePage={mockFunc}
        onChangeRowsPerPage={mockFunc}
        onSort={mockFunc}
        onRowClick={mockFunc}
      />
    );
    expect(component).toBeDefined();
  });

  it('should fire row onClick func', () => {
    const component = mountWithIntl(
      <VcTable
        data={mockData}
        columnData={columnData}
        order="desc"
        orderBy="alerts"
        rowsPerPage={10}
        page={0}
        onChangePage={mockFunc}
        onChangeRowsPerPage={mockFunc}
        onSort={mockFunc}
        onRowClick={mockFunc}
      />
    );
    const firstRow = component
      .find('TableBody')
      .at(0)
      .find('TableRow')
      .at(0);

    firstRow.simulate('click');

    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
