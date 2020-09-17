import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import { REST_API_PATHNAME } from '../../paths';
import { diagToForm } from '../../uuid';
import VcManagementPlan from './vcManagementPlan';
import {
  getFormData,
  getSelectedFormUuid,
  selectFormMetadata,
} from '../../state/ui/form/selectors';
import {
  selectFormAction,
  submitFormAction,
} from '../../state/ui/form/actions';

const mapStateToProps = (state, props) => {
  const visitId = props.location.pathname.substring(8, 44);
  const formData = getFormData(state, [diagToForm[props.diagnosis.uuid]]);
  const formMetaData = selectFormMetadata(
    state,
    diagToForm[props.diagnosis.uuid]
  );
  const isStarted = !!formData;

  return {
    acuity: state.Visits.getIn(['data', visitId, 'acuity']),
    isStarted,
    formMetaData,
    timestamp: props.diagnosis.obsDatetime,
    uuid: diagToForm[props.diagnosis.uuid],
    formId: getSelectedFormUuid(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const visitId = props.location.pathname.substring(8, 44);
  const encounterPath = [diagToForm[props.diagnosis.uuid]];
  if (props.index != null) {
    encounterPath.push(props.index);
  }
  return {
    onSubmit: (encounterTypeId, fieldsToVoid) => {
      if (fieldsToVoid) {
        dispatch(
          submitFormAction(
            REST_API_PATHNAME,
            visitId,
            encounterPath,
            encounterTypeId,
            [...fieldsToVoid]
          )
        );
      } else {
        dispatch(
          submitFormAction(
            REST_API_PATHNAME,
            visitId,
            encounterPath,
            encounterTypeId
          )
        );
      }
      if (props.onSubmit) {
        props.onSubmit(encounterPath);
      }
    },
    selectForm: (formId, formIndex) => {
      dispatch(selectFormAction(formId, formIndex));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(VcManagementPlan));
