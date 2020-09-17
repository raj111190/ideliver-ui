import React from 'react';
import { Typography } from '@material-ui/core';
import Proptypes from 'prop-types';
import VcButton from '../vcButton/vcButton';
import styles from './vcSelectOptions.scss';
import { injectIntl } from 'react-intl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import messages from '../../intl/messages';

/**
 * VcSelectOptions is a component using which we can choose an option between various options.
 * If property isMultiSelect is set to true, you can select multiple options.
 * @param {*} props
 */
const VcSelectOptions = props => {
  const handleSelected = e => {
    let result = [];
    const selectedOptions = Array.isArray(props.value)
      ? props.value
      : [props.value];
    if (props.isMultiSelect) {
      const index = selectedOptions.indexOf(e);
      result = selectedOptions;
      if (index === -1) {
        result = result.concat([e]);
      } else {
        result.splice(index, 1);
      }
      props.onChange(result);
    } else {
      const index = selectedOptions.indexOf(e.display || e);
      if (index === -1) {
        result = result.concat([e.display || e]);
      } else {
        result = selectedOptions;
        result.splice(index, 1);
      }
      props.onChange(result[0]);
    }
  };

  const checkSelected = filter => {
    if (Array.isArray(props.value)) {
      return props.value.indexOf(filter.display || filter) > -1;
    }
    return props.value === (filter.display || filter);
  };
  const { formatMessage } = props.intl;
  const filters = props.options.map(filter => (
    <div className={styles.vcButton} key={filter.display || filter}>
      <VcButton
        disabled={props.disabled}
        value={filter.display || filter}
        isSelected={checkSelected(filter)}
        selectedColor={props.selectedColor}
        key={filter}
        onClick={() => handleSelected(filter)}
        color={props.buttonsColor}
      >
        {filter.display || filter}
      </VcButton>
    </div>
  ));
  return (
    <div className={styles.container}>
      {props.title ? (
        <div className={styles.text}>
          <Typography variant="caption" gutterBottom>
            {props.title}
          </Typography>
        </div>
      ) : null}
      {filters}
      {props.error ? (
        <FormControl error={props.error} className={styles.formControl}>
          <InputLabel required={props.required} htmlFor={props.required}>
            {props.required ? formatMessage(messages.required) : null}
          </InputLabel>
        </FormControl>
      ) : null}
    </div>
  );
};

VcSelectOptions.propTypes = {
  /** title of component */
  title: Proptypes.string,
  /** selected value */
  value: Proptypes.any,
  /** Array of options */
  options: Proptypes.arrayOf(
    Proptypes.shape({
      value: Proptypes.string,
    })
  ),
  /** Call Back function to add or remove the items from selected Array */
  onChange: Proptypes.func.isRequired,
  /** you can select multiple options when this prop is set to true */
  isMultiSelect: Proptypes.bool,
};

VcSelectOptions.defaultProps = {
  isMultiSelect: false,
  onChange: () => {},
  selectedColor: 'primary',
  buttonsColor: 'default',
};

export default injectIntl(VcSelectOptions);
