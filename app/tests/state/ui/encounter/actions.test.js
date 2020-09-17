import {
  FETCH_ENCOUNTER_ACTION,
  FETCH_ENCOUNTER_FAIL_ACTION,
  FETCH_ENCOUNTER_SUCCESS_ACTION,
  FETCH_PATIENT_ENCOUNTERS_ACTION,
  FETCH_PATIENT_ENCOUNTERS_FAIL_ACTION,
  FETCH_PATIENT_ENCOUNTERS_SUCCESS_ACTION,
  fetchEncounterAction,
  fetchEncounterFailAction,
  fetchEncounterSuccessAction,
  fetchPatientEncountersAction,
  fetchPatientEncountersFailAction,
  fetchPatientEncountersSuccessAction,
} from '../../../../js/state/ui/encounter/actions';

describe('Encounter actions', () => {
  describe('fetch patient encounters', () => {
    it('fetch patient encounter action', () => {
      const result = fetchPatientEncountersAction('test', '123');
      expect(result).toEqual({
        type: FETCH_PATIENT_ENCOUNTERS_ACTION,
        url: 'test',
        patientUuid: '123',
      });
    });

    it('fetch patient encounters success action', () => {
      const encounters = [
        {
          uuid: '123',
          display: 'test',
        },
      ];
      const result = fetchPatientEncountersSuccessAction('123', encounters);
      expect(result).toEqual({
        type: FETCH_PATIENT_ENCOUNTERS_SUCCESS_ACTION,
        patientUuid: '123',
        encounters,
      });
    });

    it('fetch patient encounters fail action', () => {
      const error = 'Obs error';
      const result = fetchPatientEncountersFailAction('123', error);
      expect(result).toEqual({
        type: FETCH_PATIENT_ENCOUNTERS_FAIL_ACTION,
        patientUuid: '123',
        error,
      });
    });
  });

  describe('fetch encounter', () => {
    it('fetch encounter action', () => {
      const result = fetchEncounterAction('test', '123');
      expect(result).toEqual({
        type: FETCH_ENCOUNTER_ACTION,
        url: 'test',
        uuid: '123',
      });
    });

    it('fetch encounter success action', () => {
      const encounter = {
        uuid: '123',
        display: 'test',
      };
      const result = fetchEncounterSuccessAction('123', encounter);
      expect(result).toEqual({
        type: FETCH_ENCOUNTER_SUCCESS_ACTION,
        uuid: '123',
        encounter,
      });
    });

    it('fetch encounter fail action', () => {
      const error = 'Obs error';
      const result = fetchEncounterFailAction('123', error);
      expect(result).toEqual({
        type: FETCH_ENCOUNTER_FAIL_ACTION,
        uuid: '123',
        error,
      });
    });
  });
});
