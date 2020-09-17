export const SELECT_VISIT_ACTION = 'SELECT_VISIT_ACTION';

const selectVisitAction = (visitUuid, patientUuid) => ({
  type: SELECT_VISIT_ACTION,
  visitUuid,
  patientUuid,
});

export default selectVisitAction;
