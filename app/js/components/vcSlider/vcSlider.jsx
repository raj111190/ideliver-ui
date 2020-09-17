import React from 'react';
import Proptypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Slider from 'rc-slider';
import TextField from '@material-ui/core/TextField';
import styles from './vcSlider.scss';
import '../../../css/theme.scss';
// Imports css globally without modules so that the slider is styled properly
import '!style-loader!css-loader!rc-slider/assets/index.css';

/**
 * A slider component with a text field to enter and display numbers
 * @param {*} props
 */
const VcSlider = props => {
  const handlechange = e => {
    props.onChange(e.target.value);
  };
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        {props.label}
      </Typography>
      <div className={styles.container}>
        <Slider
          className={styles.left}
          marks={props.marks}
          step={props.steps}
          min={props.min}
          max={props.max}
          onChange={props.onChange}
          dots={props.dots}
          trackStyle={{ backgroundColor: styles.dark_lavender }}
          handleStyle={{
            borderColor: styles.dark_lavender,
            backgroundColor: styles.dark_lavender,
            height: '20px',
            width: '20px',
            marginTop: '-8px',
          }}
          {...props}
          value={+props.value}
        />
        {props.valueField ? (
          <TextField
            error={props.error}
            className={styles.right}
            disabled={props.disabled}
            value={+props.value === 0 && props.min > 0 ? '' : +props.value}
            className={styles.textField}
            onChange={handlechange}
            InputProps={{
              readOnly: props.readOnly,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
VcSlider.propTypes = {
  /** a boolean to indicate if styling for invalid entry is to be set on the slider */
  invalid: Proptypes.bool,
  /** a boolean to indicate if the slider should be disabled */
  disabled: Proptypes.bool,
  /** value for the slider */
  value: Proptypes.oneOfType([Proptypes.number, Proptypes.string]),
  /** calback function called onChange */
  onChange: Proptypes.func,
  /** an obejct that contains key-value pairs of labels & units */
  marks: Proptypes.object,
  /** minimum value in the slider range */
  min: Proptypes.number,
  /** maximum value in the slider range */
  max: Proptypes.number,
  /** number of steps in the slider range */
  steps: Proptypes.number,
  /** flag to specify if dots are required for steps specified */
  dots: Proptypes.bool,
  /** flag to specify the need for a textfield that shows the current value of slider */
  valueField: Proptypes.bool,
  /** specifies if the valueField is read-only */
  readOnly: Proptypes.bool,
  /** label of the field */
  label: Proptypes.string,
};

VcSlider.defaultProps = {
  invalid: false,
  disabled: false,
  value: '',
  onChange: () => {},
  dots: false,
  valueField: false,
  readOnly: true,
  error: '',
  required: false,
};

export default VcSlider;
