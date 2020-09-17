import React from 'react';
import Proptypes from 'prop-types';
import { injectIntl } from 'react-intl';
import VcSelectOptions from '../vcSelectOptions/vcSelectOptions';
import VcQuestionWithDismiss from '../vcQuestionWithDismiss/vcQuestionWithDismiss';
import messages from '../../intl/messages';

const VcToggleWithDismiss = props => {
  const { formatMessage } = props.intl;

  return (
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
          value={[
            props.value === true
              ? formatMessage(messages.yes)
              : props.value === false
              ? formatMessage(messages.no)
              : props.value,
          ]}
          options={[formatMessage(messages.yes), formatMessage(messages.no)]}
          isMultiSelect={false}
          onSelect={arg =>
            props.onChange(arg[0] === formatMessage(messages.yes))
          }
        />
      }
    />
  );
};

VcToggleWithDismiss.propTypes = {
  /** The date and time to be shown at the top */
  timestamp: Proptypes.string,
  /** The title */
  label: Proptypes.string,
  /** Call Back function to add or remove the items from selected Array */
  onChange: Proptypes.func.isRequired,
  /** Call Back function to dismiss or restore the question */
  onToggle: Proptypes.func.isRequired,
};
VcToggleWithDismiss.defaultProps = {};

export default injectIntl(VcToggleWithDismiss);
