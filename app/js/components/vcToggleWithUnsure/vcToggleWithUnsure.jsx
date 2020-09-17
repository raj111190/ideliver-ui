import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import styles from './vcToggleWithUnsure.scss';

/**
 * A component for switching true/false
 * @param {*} props
 */
const VcToggleWithUnsure = props => (
  <label className={cx(styles.sectionToggle, props.className)}>
    {/* <input type="checkbox" checked={props.value} onChange={e => props.onChange(!props.value, e)} /> */}
    {props.withOptions === true ? (
      <div className={styles.slider}>
        <span className={styles.toggleCheckboxSlider} />
        <div
          onClick={() => props.onChange(props.options[0].display)}
          className={cx(styles.sliderLabel, styles.no, {
            [styles.checked]: props.value === props.options[0].display,
          })}
        >
          {props.msgForFalse}
        </div>
        <div
          onClick={() => props.onChange(props.options[1].display)}
          className={cx(styles.sliderLabel, styles.unsure, {
            [styles.checked]:
              props.value === undefined ||
              props.value === null ||
              props.value === '' ||
              props.value === props.options[1].display,
          })}
        >
          {props.msgForUnsure}
        </div>
        <div
          onClick={() => props.onChange(props.options[2].display)}
          className={cx(styles.sliderLabel, styles.yes, {
            [styles.checked]: props.value === props.options[2].display,
          })}
        >
          {props.msgForTrue}
        </div>
      </div>
    ) : (
      <div className={styles.slider} datatest={props.datatest}>
        <span className={styles.toggleCheckboxSlider} />
        <div
          onClick={() => props.onChange(false)}
          className={cx(styles.sliderLabel, styles.no, {
            [styles.checked]: props.value === false,
          })}
        >
          {props.msgForFalse}
        </div>
        <div
          onClick={() => props.onChange(null)}
          className={cx(styles.sliderLabel, styles.unsure, {
            [styles.checked]:
              props.value === undefined ||
              props.value === null ||
              props.value === '',
          })}
        >
          {props.msgForUnsure}
        </div>
        <div
          onClick={() => props.onChange(true)}
          className={cx(styles.sliderLabel, styles.yes, {
            [styles.checked]: props.value === true,
          })}
        >
          {props.msgForTrue}
        </div>
      </div>
    )}
  </label>
);

VcToggleWithUnsure.propTypes = {
  /** a boolean to indicate if styling for invalid entry is to be set on the toggle button */
  invalid: Proptypes.bool,
  /** a boolean to indicate if the slider should be disabled */
  disabled: Proptypes.bool,
  /** value for the toggle button */
  value: Proptypes.bool,
  /** callback function to be fired onChange */
  onChange: Proptypes.func,
  /** string to be shown on the right side of the button that represents true */
  msgForTrue: Proptypes.string,
  /** string to be shown on the left side of the button that represents false */
  msgForFalse: Proptypes.string,
  /** string to be shown on the left side of the button that represents false */
  msgForUnsure: Proptypes.string,
  /** options list - provided */
  withOptions: Proptypes.bool,
  /** options for drop-down list - provided as an array */
  options: Proptypes.arrayOf(
    Proptypes.shape({
      value: Proptypes.string,
    })
  ),
};

VcToggleWithUnsure.defaultProps = {
  invalid: false,
  disabled: false,
  value: undefined,
  onChange: () => {},
  msgForTrue: 'Yes',
  msgForFalse: 'No',
  msgForUnsure: 'Unsure',
};

export default VcToggleWithUnsure;
