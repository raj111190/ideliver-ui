import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import styles from './vcToggle.scss';

/**
 * A component for switching true/false
 * @param {*} props
 */
const VcToggle = props => (
  <label className={cx(styles.sectionToggle, props.className)}>
    <input
      type="checkbox"
      disabled={props.disabled}
      checked={props.value}
      onChange={e => props.onChange(!props.value, e)}
    />
    <div className={styles.slider}>
      <span className={styles.toggleCheckboxSlider} />
      <div className={cx(styles.sliderLabel, styles.no)}>
        {props.msgForFalse}
      </div>
      <div className={cx(styles.sliderLabel, styles.yes)}>
        {props.msgForTrue}
      </div>
    </div>
  </label>
);

VcToggle.propTypes = {
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
};

VcToggle.defaultProps = {
  invalid: false,
  disabled: false,
  value: false,
  onChange: () => {},
  msgForTrue: 'Yes',
  msgForFalse: 'No',
};

export default VcToggle;
