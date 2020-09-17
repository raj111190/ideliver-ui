import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { merge } from 'lodash';
import entitiesReducer, {
  defaultState,
} from '../../../js/state/entities/entitiesReducer';
import {
  addEntityAction,
  setEntitiesDataAction,
  updateEntitiesDataAction,
} from '../../../js/state/entities/actions';
import { encountersSchema, obsSchema } from '../../../js/state/representations';

describe('Encounter reducers', () => {
  const patientEncounters = [
    {
      uuid: '123',
      display: 'test 1',
      patient: { uuid: '123', display: 'patient 123' },
      obs: [
        { uuid: '456', display: 'obs1' },
        { uuid: '789', display: 'obs2' },
      ],
    },
    {
      uuid: '124',
      display: 'test 2',
      patient: { uuid: '123', display: 'patient 123' },
      obs: [
        { uuid: '556', display: 'obs1' },
        { uuid: '589', display: 'obs2' },
      ],
    },
  ];
  const normalizedEntities = normalize(patientEncounters, encountersSchema);

  it('should have an initial state', () => {
    const newState = entitiesReducer(undefined, {});
    expect(newState).toEqual(fromJS(defaultState));
  });

  it('should handle set entities data action', () => {
    expect(entitiesReducer(defaultState, setEntitiesDataAction({}))).toEqual(
      defaultState
    );

    const newState = entitiesReducer(
      defaultState,
      setEntitiesDataAction(normalizedEntities)
    );
    expect(newState).toEqual(fromJS(normalizedEntities.entities));
  });

  describe('add Entities', () => {
    it('should handle add entity action', () => {
      const newState = entitiesReducer(
        defaultState,
        setEntitiesDataAction(normalizedEntities)
      );
      const obs = { uuid: 'newUuid', display: 'obs1' };
      const normalizedObs = normalize(obs, obsSchema);
      const updatedState = entitiesReducer(
        newState,
        addEntityAction(['encounters', '123', 'obs'], normalizedObs)
      );
      const updatedObs = normalizedEntities.entities.encounters['123'].obs;
      updatedObs.push('newUuid');
      expect(updatedState.getIn(['encounters', '123', 'obs'])).toEqual(
        fromJS(updatedObs)
      );
    });

    it('should only add entity if it does not exist', () => {
      const newState = entitiesReducer(
        defaultState,
        setEntitiesDataAction(normalizedEntities)
      );
      const obs = { uuid: '789', display: 'obs1' };
      const normalizedObs = normalize(obs, obsSchema);
      const updatedState = entitiesReducer(
        newState,
        addEntityAction(['encounters', '123', 'obs'], normalizedObs)
      );
      const updatedObs = normalizedEntities.entities.encounters['123'].obs;
      expect(updatedState.getIn(['encounters', '123', 'obs'])).toEqual(
        fromJS(updatedObs)
      );
    });

    it('should handle wrong arguments', () => {
      const newState = entitiesReducer(
        defaultState,
        setEntitiesDataAction(normalizedEntities)
      );
      let updatedState = entitiesReducer(
        newState,
        addEntityAction(undefined, undefined)
      );
      expect(newState).toEqual(fromJS(updatedState));

      updatedState = entitiesReducer(newState, addEntityAction([], undefined));
      expect(newState).toEqual(fromJS(updatedState));

      updatedState = entitiesReducer(
        newState,
        addEntityAction([], { result: ['123'] })
      );
      expect(newState).toEqual(fromJS(updatedState));
    });
  });

  it('should handle update entities data action', () => {
    expect(entitiesReducer(defaultState, updateEntitiesDataAction({}))).toEqual(
      defaultState
    );

    const newState = entitiesReducer(
      defaultState,
      setEntitiesDataAction(normalizedEntities)
    );

    const patientEncounterUpdate = [
      {
        uuid: '0003',
        display: 'test 4',
        patient: { uuid: '123', display: 'patient 123' },
        obs: [
          { uuid: 'xyz', display: 'obs6' },
          { uuid: 'uvw', display: 'obs7' },
        ],
      },
    ];
    const normalizedUpdate = normalize(
      patientEncounterUpdate,
      encountersSchema
    );

    const merged = merge(normalizedEntities, normalizedUpdate);
    const updatedState = entitiesReducer(
      newState,
      updateEntitiesDataAction(normalizedUpdate)
    );
    expect(updatedState.toJS()).toEqual(merged.entities);
  });
});
