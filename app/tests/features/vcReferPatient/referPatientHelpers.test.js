import { createReferPatientEncounter } from '../../../js/features/VcReferPatient/vcReferPatientHelpers';
import { encounterType } from '../../../js/uuid';

describe('Refer Patient helpers', () => {
  it('should create visit note encounter', () => {
    const voidedObs = createReferPatientEncounter(
      {
        encounterUuid: '1',
        patientUuid: '12',
        visitUuid: '123',
      },
      '1234'
    );
    expect(voidedObs.uuid).toEqual('1');
    expect(voidedObs.patient).toEqual('12');
    expect(voidedObs.visit).toEqual('123');
    expect(voidedObs.obs).toEqual(['1234']);
    expect(voidedObs.encounterType).toEqual(
      encounterType.REFERRAL_ENCOUNTER_TYPE_UUID
    );
  });
});
