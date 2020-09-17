import { createDischargePatientEncounter } from '../../../js/features/VcDischargePatient/vcDischargePatientHelpers';
import { encounterType } from '../../../js/uuid';

describe('Discharge Patient helpers', () => {
  it('should create visit note encounter', () => {
    const voidedObs = createDischargePatientEncounter(
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
      encounterType.DISCHARGE_ENCOUNTER_TYPE_UUID
    );
  });
});
