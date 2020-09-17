/* ENTITIES ACTIONS */
export const SET_ENTITIES_DATA_ACTION = 'SET_ENTITIES_DATA_ACTION';
export const UPDATE_ENTITIES_DATA_ACTION = 'UPDATE_ENTITIES_DATA_ACTION';
export const ADD_ENTITY_ACTION = 'ADD_ENTITY_ACTION';
export const REMOVE_ENCOUNTERS_ACTION = 'REMOVE_ENCOUNTERS_ACTION';
/**
 * Sets entities data. Should be used only to initialize the entities
 * or to reset the entire application entities.
 * @param payload the normalized results from a api call
 * @param payload.entities the normalized entities
 * @returns {{payload: *, type: object}} the action
 */
export const setEntitiesDataAction = payload => ({
  type: SET_ENTITIES_DATA_ACTION,
  payload,
});

/**
 * Updates entities data. Should be used to updates entities
 * @param payload the normalized results from a api call
 * @param payload.entities the normalized entities
 * @returns {{payload: *, type: object}} the action
 */
export const updateEntitiesDataAction = payload => ({
  type: UPDATE_ENTITIES_DATA_ACTION,
  payload,
});

export const addEntityAction = (path, payload) => ({
  type: ADD_ENTITY_ACTION,
  path,
  payload,
});
export const removeEncounters = () => {
  return {
    type: REMOVE_ENCOUNTERS_ACTION,
  };
};
