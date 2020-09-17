import React from 'react';
import Proptypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import messages from '../../intl/messages';
import styles from './vcDropDown.scss';
import { injectIntl } from 'react-intl';

/**
 * This component lets the user select an option from a drop-down list
 * @param {*} props
 */

const VcDropDown = props => {
  const options = props.options
    ? props.options.map(option =>
        props.isNumericOptions ? (
          isNaN(option.display) === false && (
            <MenuItem key={option.display} value={option.display}>
              {option.display}
            </MenuItem>
          )
        ) : (
          <MenuItem key={option.display} value={option.display}>
            {option.display}
          </MenuItem>
        )
      )
    : null;
  const { formatMessage } = props.intl;
  return (
    <form autoComplete="off" className={props.className}>
      <FormControl
        error={props.error}
        className={styles.formControl}
        datatest={props.datatest}
      >
        <InputLabel
          required={props.required}
          htmlFor={props.label}
          className={styles.formLabel}
          shrink
        >
          {props.labelId ? formatMessage(messages[props.labelId]) : props.label}
        </InputLabel>
        <Select
          value={props.value ? props.value.display || props.value : props.value}
          onChange={event => {
            props.onChange(event.target.value);
          }}
          inputProps={{
            id: props.label,
          }}
        >
          {options}
        </Select>
      </FormControl>
      {props.value && props.children ? props.children : null}
    </form>
  );
};

VcDropDown.propTypes = {
  /** title of drop-down */
  title: Proptypes.string,
  /** custom label passed from another component */
  labelId: Proptypes.string,
  /** selected value */
  value: Proptypes.string,
  /** options for drop-down list - provided as an numeric array */
  isNumericOptions: Proptypes.bool,
  /** options for drop-down list - provided as an array */
  options: Proptypes.arrayOf(
    Proptypes.shape({
      value: Proptypes.string,
    })
  ),
  /** Call Back function when value changes */
  onChange: Proptypes.func.isRequired,
  className: Proptypes.string,
};

VcDropDown.defaultProps = {
  onChange: () => {},
  value: '',
  error: '',
  required: false,
};

export default injectIntl(VcDropDown);
