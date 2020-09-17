import React from 'react';
import Proptypes from 'prop-types';
import VcQuestionWithDismiss from '../vcQuestionWithDismiss/vcQuestionWithDismiss';
import VcTask from '../vcTask/vcTask';

const VcTaskWithDismiss = props => (
  <VcQuestionWithDismiss
    disabled={props.disabled}
    timestamp={props.timestamp}
    onToggle={() => {
      props.onToggle();
      props.onChange();
    }}
    questionComponent={
      <VcTask
        onChange={props.onChange}
        value={props.value}
        title={props.label}
      />
    }
  />
);

VcTaskWithDismiss.propTypes = {
  /** The date and time to be shown at the top */
  timestamp: Proptypes.string,
  /** The label */
  label: Proptypes.string,
  /** Call Back function to dismiss or restore the question */
  onToggle: Proptypes.func,
  onChange: Proptypes.func.isRequired,
  value: Proptypes.bool,
};
VcTaskWithDismiss.defaultProps = {};

export default VcTaskWithDismiss;
