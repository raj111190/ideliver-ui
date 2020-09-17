import { fromJS } from 'immutable';
import observationReducer, {
  defaultState,
} from '../../../../js/state/ui/obs/reducers';
import {
  toggleAddDiagnosisAction,
  fetchObservationAction,
  fetchObservationFailAction,
  fetchObservationSuccessAction,
  toggleRemoveDiagnosisAction,
  saveObservationSuccessAction,
} from '../../../../js/state/ui/obs/actions';
import { conceptClass, conceptDataType } from '../../../../js/uuid';
import { saveEncounterSuccessAction } from '../../../../js/state/ui/encounter/actions';

describe('observation reducers', () => {
  it('should have an initial state', () => {
    const newState = observationReducer(undefined, {});
    expect(newState).toEqual(fromJS(defaultState));
  });

  it('should set state to fetching', () => {
    let newState = observationReducer(
      fromJS(defaultState),
      fetchObservationAction('test', '123')
    );
    let updatedState = fromJS(defaultState).setIn(['fetching'], true);
    expect(newState).toEqual(updatedState);

    newState = observationReducer(
      fromJS(defaultState),
      fetchObservationSuccessAction('123', {})
    );
    updatedState = fromJS(defaultState).setIn(['fetching'], false);
    expect(newState).toEqual(updatedState);

    newState = observationReducer(
      fromJS(defaultState),
      fetchObservationFailAction('123', 'fetch failed')
    );
    updatedState = fromJS(defaultState).setIn(['fetching'], false);
    expect(newState).toEqual(updatedState);
  });

  it('should toggle adding diagnoses to the state', () => {
    let newState = observationReducer(
      fromJS(defaultState),
      toggleAddDiagnosisAction('123')
    );
    let updatedState = fromJS(defaultState).setIn(
      ['addedDiagnoses'],
      fromJS(['123'])
    );
    expect(newState).toEqual(updatedState);

    newState = observationReducer(
      fromJS(newState),
      toggleAddDiagnosisAction('123')
    );
    updatedState = fromJS(defaultState).setIn(['addedDiagnoses'], fromJS([]));
    expect(newState).toEqual(updatedState);
  });

  it('should toggle removing diagnoses to the state', () => {
    let newState = observationReducer(
      fromJS(defaultState),
      toggleRemoveDiagnosisAction('123')
    );
    let updatedState = fromJS(defaultState).setIn(
      ['removedDiagnoses'],
      fromJS(['123'])
    );
    expect(newState).toEqual(updatedState);

    newState = observationReducer(
      fromJS(newState),
      toggleRemoveDiagnosisAction('123')
    );
    updatedState = fromJS(defaultState).setIn(['removedDiagnoses'], fromJS([]));
    expect(newState).toEqual(updatedState);
  });

  it('should remove diagnoses from the state when the observation is saved', () => {
    const diagnosisObservation = {
      uuid: 'a123',
      groupMembers: [
        {
          concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
          value: { uuid: '123' },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
          value: {
            uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
            display: 'Confirmed diagnosis',
            datatype: {
              uuid: conceptDataType.NA,
              display: 'N/A',
            },
            conceptClass: {
              uuid: conceptClass.MISC,
              display: 'Misc',
            },
            attributes: [],
          },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID },
          value: { uuid: 'c123' },
        },
      ],
    };
    let newState = observationReducer(
      fromJS(defaultState),
      toggleAddDiagnosisAction('123')
    );
    newState = observationReducer(
      fromJS(newState),
      toggleRemoveDiagnosisAction('456')
    );

    newState = observationReducer(
      fromJS(newState),
      saveObservationSuccessAction('test', diagnosisObservation)
    );
    newState = observationReducer(
      fromJS(newState),
      saveObservationSuccessAction('test', {})
    );
    expect(newState).toEqual(newState);
    const updatedState = fromJS(defaultState).setIn(
      ['removedDiagnoses'],
      fromJS(['456'])
    );
    expect(newState).toEqual(updatedState);
  });

  it('should remove diagnoses from the state when an encounter is saved', () => {
    const diagnosisObservation = {
      uuid: 'a123',
      groupMembers: [
        {
          concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
          value: { uuid: '123' },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
          value: {
            uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
            display: 'Confirmed diagnosis',
            datatype: {
              uuid: conceptDataType.NA,
              display: 'N/A',
            },
            conceptClass: {
              uuid: conceptClass.MISC,
              display: 'Misc',
            },
            attributes: [],
          },
        },
        {
          concept: { uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID },
          value: { uuid: 'c123' },
        },
      ],
    };
    const diagnosisEncounter = {
      uuid: '123',
      obs: [diagnosisObservation],
    };
    let newState = observationReducer(
      fromJS(defaultState),
      toggleAddDiagnosisAction('123')
    );
    newState = observationReducer(
      fromJS(newState),
      toggleRemoveDiagnosisAction('456')
    );

    newState = observationReducer(
      fromJS(newState),
      saveEncounterSuccessAction('test', diagnosisEncounter)
    );
    const updatedState = fromJS(defaultState).setIn(
      ['removedDiagnoses'],
      fromJS(['456'])
    );
    expect(newState).toEqual(updatedState);

    newState = observationReducer(
      fromJS(newState),
      saveObservationSuccessAction('test', {})
    );
    expect(newState).toEqual(newState);
  });
});
