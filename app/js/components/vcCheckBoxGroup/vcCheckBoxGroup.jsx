import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import messages from '../../intl/messages';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import { injectIntl } from 'react-intl';
import styles from './vcCheckBoxGroup.scss';
import { formField } from '../../uuid';

let presenting_alert = false;
let Additional_presenting_alert = false;
let result = [];
const VcCheckBoxGroup = props => {
  const { datatest } = props;
  useEffect(() => {
    if (
      props.onCovidValidation === true &&
      props.label === formatMessage(messages.presentingSymptoms)
    ) {
      valueMap.push(formatMessage(messages.feverDegree));
      result.push({
        display: formatMessage(messages.feverDegree),
        uuid: formField.COVID_FEVER_UUID,
      });
      props.onChange(result);
    }
  }, [props.onCovidValidation]);

  const valueMap = props.value
    .filter(val => !val.voided)
    .map(val => val.display);
  const valueMapVoided = props.value
    .filter(val => val.voided)
    .map(val => val.display);
  const optionsMap = props.options.map(val => val.display);
  const { formatMessage } = props.intl;
  const covidTemperature = props.onCovidValidation;
  const label = props.label;

  if (
    label != undefined &&
    label === formatMessage(messages.presentingSymptoms) &&
    valueMap.length > 0
  ) {
    presenting_alert = true;
  } else {
    presenting_alert = false;
  }

  if (
    label != undefined &&
    label === formatMessage(messages.additionalPresentingSymptoms) &&
    valueMap.length >= 2
  ) {
    Additional_presenting_alert = true;
  } else {
    Additional_presenting_alert = false;
  }

  if (covidTemperature != undefined && covidTemperature === true) {
    valueMap.push(formatMessage(messages.feverDegree));
    presenting_alert = true;
  }

  const cbg = props.options.map(option => (
    <FormControlLabel
      key={`${props.label} ${option.uuid}`}
      disabled={option.disabled}
      datatest={`${datatest}-${option.display}`}
      control={
        <Checkbox
          checked={valueMap.indexOf(option.display) > -1}
          onClick={e => {
            e.preventDefault();
            result = props.value;
            // This filter fixes a bug that duplicates the selected value in other checkbox groups
            result = result.filter(val => optionsMap.indexOf(val.display) > -1);

            if (valueMap.indexOf(option.display) > -1) {
              result = result.map(item =>
                item.display === option.display
                  ? { ...item, voided: true }
                  : item
              );
            } else if (valueMapVoided.indexOf(option.display) > -1) {
              result = result.map(item =>
                item.display === option.display
                  ? { ...item, voided: false }
                  : item
              );
            } else {
              result.push({ display: option.display, uuid: option.uuid });
            }
            props.onChange(result);
          }}
          value={option.display}
          color={option.color}
          indeterminate={option.indeterminate}
        />
      }
      label={option.display}
    />
  ));

  return (
    <FormControl>
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup row>{cbg}</FormGroup>
      <div className={styles.textColor}>
        {props.activePolicyForCovidError && presenting_alert == true
          ? formatMessage(messages[props.activePolicyForCovidError])
          : ''}
      </div>
      <div className={styles.textColor}>
        {props.activePolicyForCovidError1 && Additional_presenting_alert == true
          ? formatMessage(messages[props.activePolicyForCovidError1])
          : ''}
      </div>
      {props.helper ? (
        <FormHelperText>{props.helperText}</FormHelperText>
      ) : null}
      {props.children ? props.children : null}
    </FormControl>
  );
};

VcCheckBoxGroup.propTypes = {
  /** label of component */
  label: Proptypes.string,
  /** options for drop-down list - provided as an array */
  options: Proptypes.arrayOf(
    Proptypes.shape({
      display: Proptypes.string,
      color: Proptypes.oneOf[('primary', 'secondary')],
      disabled: Proptypes.bool,
      indeterminate: Proptypes.bool,
    })
  ),
  /** Call Back function when value changes */
  helper: Proptypes.bool,
  helperText: Proptypes.string,
  onChange: Proptypes.func.isRequired,
  value: Proptypes.array,
};

VcCheckBoxGroup.defaultProps = {
  options: [
    {
      checked: false,
      diabled: false,
      indeterminate: false,
      color: 'primary',
    },
  ],
  onChange: () => {},
  helper: false,
  value: [],
};

export default injectIntl(VcCheckBoxGroup);
