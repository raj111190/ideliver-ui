import { fromJS, List } from 'immutable';
import {
  ADD_ENTITY_ACTION,
  SET_ENTITIES_DATA_ACTION,
  UPDATE_ENTITIES_DATA_ACTION,
  REMOVE_ENCOUNTERS_ACTION,
} from './actions';
import { mergeDeepOverwriteLists } from './entitiesMerger';

export const defaultState = {};

/**
 * Add an new entity to the store
 * @param state
 * @param action
 * @return the new state after the entity is added
 */
const addEntity = (state, action) => {
  if (action.path && action.path.length) {
    const entities = state.getIn(action.path, new List());
    if (!entities.includes(action.payload.result)) {
      const updatedEntities = entities.push(action.payload.result);
      return state.setIn(action.path, updatedEntities);
    }
  }

  return state;
};

/**
 * Entities reducer.
 * Used to update the state with normalized data from the api
 * @param state the current state. Defaults to {}
 * @param action the action
 * @param action.type the action type to handle
 * @param action.payload the result or normalizing the server response.
 *        It should have an `entities` property
 * @returns {object} all normalized entities in the state
 */
const entitiesReducer = (state = fromJS(defaultState), action) => {
  switch (action.type) {
    case SET_ENTITIES_DATA_ACTION:
      if (!action.payload || !action.payload.entities) return state;
      return fromJS(action.payload.entities);

    case UPDATE_ENTITIES_DATA_ACTION:
      if (!action.payload || !action.payload.entities) return state;
      return mergeDeepOverwriteLists(state, fromJS(action.payload.entities));

    case ADD_ENTITY_ACTION:
      if (!action.path || !action.payload || !action.payload.result) {
        return state;
      }
      return addEntity(state, action);
    case REMOVE_ENCOUNTERS_ACTION:
      state =
        state === {}
          ? {}
          : Array.from(state).reduce(
              (obj, [key, value]) => Object.assign(obj, { [key]: value }),
              {}
            );
      let map = new Map();
      if (state.encounters) {
        delete state.encounters;
      }
      Object.keys(state).forEach(key => {
        map.set(key, state[key]);
      });
      return state;

    default:
      return state;
  }
};

export default entitiesReducer;
