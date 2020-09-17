import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import ManagementPlansList from './managementPlansList';
import { selectDiagnosisContainerData } from '../../state/ui/obs/selectors';

const mapStateToProps = (state, props) => {
  const diagnosisData = selectDiagnosisContainerData(state);
  const confirmedDiagnoses = diagnosisData.get('confirmedDiagnoses');
  return {
    confirmedDiagnoses,
    location: props.location,
  };
};
export default connect(mapStateToProps)(
  withImmutablePropsToJS(ManagementPlansList)
);
