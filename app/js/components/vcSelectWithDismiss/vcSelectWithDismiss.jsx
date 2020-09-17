import React from 'react';
import Proptypes from 'prop-types';
import VcSelectOptions from '../vcSelectOptions/vcSelectOptions';
import VcQuestionWithDismiss from '../vcQuestionWithDismiss/vcQuestionWithDismiss';

const VcSelectWithDismiss = props => (
  <VcQuestionWithDismiss
    disabled={props.disabled}
    timestamp={props.timestamp}
    label={props.label}
    onToggle={() => {
      props.onToggle();
      props.onChange();
    }}
    questionComponent={
      <VcSelectOptions
        buttonsColor="default"
        selectedColor="secondary"
        value={[props.value]}
        options={props.options}
        isMultiSelect={false}
        onChange={props.onChange()}
      />
    }
  />
);

VcSelectWithDismiss.propTypes = {
  /** The date and time to be shown at the top */
  timestamp: Proptypes.string,
  /** The title */
  label: Proptypes.string,
  /** Array of options */
  options: Proptypes.array.isRequired,
  /** Call Back function to add or remove the items from selected Array */
  onChange: Proptypes.func.isRequired,
  /** Call Back function to dismiss or restore the question */
  onToggle: Proptypes.func.isRequired,
  value: Proptypes.any,
};
VcSelectWithDismiss.defaultProps = {
  filterOptions: [],
  onToggle: () => {},
};

export default VcSelectWithDismiss;
