import { sortArrayOnLatestEncounterDate } from './../../../js/features/activeLabour/activeLabourHelpers';

describe('activeLAbour tests', () => {
  it('sort array on latest encounter', () => {
    let testArray = [
      {
        encounterDatetime: '10/12/2019 15:25',
        'ee038cc4-1a53-4738-8967-f8fedc8cdaa1': 12,
        '0c14bfb6-4782-4846-9b9b-476ef6f2a470': '',
        'ff516a4c-3d9b-42e1-a2af-2d8f29b3a79c': 12,
        '9115c83c-a0a5-4708-bc73-e21f1e300d47': 26,
      },
      {
        encounterDatetime: '10/12/2019 15:24',
        'ee038cc4-1a53-4738-8967-f8fedc8cdaa1': 12,
        '0c14bfb6-4782-4846-9b9b-476ef6f2a470': '',
        'ff516a4c-3d9b-42e1-a2af-2d8f29b3a79c': 12,
        '9115c83c-a0a5-4708-bc73-e21f1e300d47': '',
      },
    ];
    sortArrayOnLatestEncounterDate(testArray);
    expect(testArray[0].encounterDatetime).toEqual('10/12/2019 15:25');
  });
});
