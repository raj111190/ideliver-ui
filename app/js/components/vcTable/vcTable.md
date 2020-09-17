VcTable example:

```js
<VcTable
  columnData={[
    {
      id: 'givenName',
      sortable: true,
      numeric: false,
      disablePadding: true,
      label: 'First Name',
    },
    {
      id: 'familyName',
      sortable: true,
      numeric: true,
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
      numeric: false,
      disablePadding: true,
      label: 'Status',
    },
    {
      id: 'acuity',
      sortable: true,
      filterOptions: ['1', '2', '3', '4', '5'],
      numeric: false,
      disablePadding: false,
      label: 'Acuity',
    },
    {
      id: 'startDatetime',
      sortable: true,
      numeric: false,
      disablePadding: true,
      label: 'Admission Time',
    },
    {
      id: 'diagnosis',
      sortable: false,
      numeric: false,
      disablePadding: true,
      label: 'Diagnosis',
    },
    {
      id: 'alerts',
      sortable: false,
      numeric: false,
      disablePadding: true,
      label: 'Alerts',
    },
  ]}
  data={[
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
  ]}
/>
```
