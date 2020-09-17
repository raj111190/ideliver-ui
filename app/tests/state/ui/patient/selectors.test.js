import { fromJS } from 'immutable';
import {
  getCurrentPatientUuid,
  getCurrentPatient,
} from '../../../../js/state/ui/patient/selectors';

describe('patients selectors', () => {
  it('should select current patient uuid', () => {
    const state = {
      ui: {
        patient: fromJS({
          currentPatient: '123',
        }),
      },
    };

    expect(getCurrentPatientUuid(state)).toEqual('123');
  });

  it('should get the current patient', () => {
    const nullPatient = getCurrentPatient.resultFunc(undefined, '123');
    expect(nullPatient).toEqual(undefined);

    const patientsByUuid = {
      '123': {
        uuid: '123',
        identifiers: [],
        address: {},
      },
      '124': {
        uuid: '124',
        identifiers: [],
        address: {},
      },
    };

    const currentPatient = getCurrentPatient.resultFunc(
      fromJS(patientsByUuid),
      '123'
    );
    expect(currentPatient).toEqual(fromJS(patientsByUuid['123']));
  });
});
