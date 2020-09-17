import { connect } from 'react-redux';
import Visits from './visits';
import fetchVisitsAction from './actions/fetchVisitsAction';
import { REST_API_PATHNAME } from '../../paths';
import selectVisitAction from './actions/selectVisitAction';
import { allForms } from '../../uuid';
import { fetchFormAction, selectFormAction } from '../../state/ui/form/actions';
import {
  fetchFormResourceAction,
  selectFormResourceAction,
} from '../../state/ui/formResource/actions';
import { removeEncounters } from '../../state/entities/actions';
const mapStateToProps = store => ({
  value: store.Visits.getIn(['list']).toJS(),
});

const mapDispatchToProps = dispatch => ({
  onEncounters: () => dispatch(removeEncounters()),
  dispatchFetchVisitsAction: options => {
    dispatch(fetchVisitsAction(REST_API_PATHNAME, options));
  },
  selectVisit: (visitUuid, patientUuid) => {
    dispatch(selectVisitAction(visitUuid, patientUuid));
  },
  selectForm: (formId, formIndex) => {
    dispatch(selectFormAction(formId, formIndex));
  },
  fetchForms: () => {
    const formsUuids = Object.values(allForms);
    formsUuids.forEach(uuid => {
      dispatch(fetchFormAction(REST_API_PATHNAME, uuid));
    });
  },
  selectFormResource: (formId, formIndex) => {
    dispatch(fetchFormResourceAction(REST_API_PATHNAME, formId));
    dispatch(selectFormResourceAction(formId, formIndex));
  },
  fetchFormsResource: () => {
    const formsUuids = Object.values(allForms);
    formsUuids.forEach(uuid => {
      dispatch(fetchFormResourceAction(REST_API_PATHNAME, uuid));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Visits);
