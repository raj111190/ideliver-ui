export const getEntities = state => state.entities;
export const getEpisodes = state => state.entities.get('episodes');
export const getVisits = state => state.entities.get('visits');
export const getVisitAttributes = state =>
  state.entities.get('visitAttributes');
export const getPatients = state => state.entities.get('patients');
export const getEncounters = state => state.entities.get('encounters');
export const getObservations = state => state.entities.get('observations');
export const getForms = state => state.entities.get('forms');
export const getFormsResource = state => state.entities.get('formsResource');
