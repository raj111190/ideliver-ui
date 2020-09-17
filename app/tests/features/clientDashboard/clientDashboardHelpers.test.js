import { filterArray } from '../../../js/features/clientDashboard/clientDashboardHelpers';
describe('clientDashboardHelpers', () => {
  it('filterArray array', () => {
    let testArray = [
      {
        patient: 'a2798797-46be-4fb4-b987-13d53246576d',
        edd: null,
        givenName: 'durgesh3',
        mrn: '1000HU',
        familyName: 'durgesh3',
        status: 'Intake',
      },
      {
        patient: 'a2798797-46be-4fb4-b987-13d532465762',
        edd: null,
        givenName: 'durgesh3',
        mrn: '1000HU',
        familyName: 'durgesh3',
        status: 'PNC',
      },
    ];
    filterArray(testArray, 'a2798797-46be-4fb4-b987-13d53246576d');
    expect(testArray[0].status).toEqual('Intake');
  });
});
