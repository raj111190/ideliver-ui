import React from 'react';
import Proptypes from 'prop-types';
import VcGridColumn from '../../components/vcGrid/vcGridColumn/vcGridColumn';
import VcManagementPlanContainer from '../vcManagementPlan/vcManagementPlanContainer';
import { diagToForm } from '../../uuid';

/**
 * Button component to be used for all standard buttons
 * @param {*} props
 */
const VcManagementPlansList = props => {
  const managementPlans = props.confirmedDiagnoses.reduce((sum, diag) => {
    if (diagToForm[diag.uuid]) {
      sum.push(
        <VcManagementPlanContainer
          location={props.location}
          key={diag.uuid}
          diagnosis={diag}
        />
      );
    }
    return sum;
  }, []);
  return <VcGridColumn>{managementPlans}</VcGridColumn>;
};

VcManagementPlansList.propTypes = {
  confirmedDiagnoses: Proptypes.array,
  onChange: Proptypes.func,
  metadata: Proptypes.any,
};

VcManagementPlansList.defaultProps = {
  confirmedDiagnoses: [],
};

export default VcManagementPlansList;
