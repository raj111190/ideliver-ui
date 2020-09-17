import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import styles from './vcGenericSwitch.scss';
import { injectIntl } from 'react-intl';
import messages from '../../intl/messages';
import { MenuItem } from '@material-ui/core/Menu';
import VcGrid from '../vcGrid/vcGrid';
import VcGridRow from '../vcGrid/vcGridRow/vcGridRow';
import VcGridColumn from '../vcGrid/vcGridColumn/vcGridColumn';
import VcToggleWithUnsure from '../vcToggleWithUnsure/vcToggleWithUnsure';
import { Typography } from '@material-ui/core';

/**
 * A component for switching true/false
 * @param {*} props
 */

const VcGenericSwitch = props => {
  const { formatMessage } = props.intl;

  return (
    <VcGrid className={styles.gridContainer}>
      <VcGridRow className={styles.toggleRow}>
        <Typography
          className={styles.typography}
          variant="subtitle1"
          gutterBottom
        >
          {props.label}
        </Typography>
        <VcToggleWithUnsure
          className={cx(
            styles.toggle,
            props.disabled ? styles.disableToggle : ''
          )}
          datatest={props.datatest}
          withOptions={props.withOptions}
          options={props.options}
          value={props.value}
          msgForTrue={formatMessage(messages.toggleYes)}
          msgForFalse={formatMessage(messages.toggleNo)}
          msgForUnsure={formatMessage(messages.toggleUnsure)}
          onChange={props.onChange}
        />
      </VcGridRow>
      {props.value ? (
        <VcGridRow
          className={
            props.childrenGridClass
              ? styles.childrenGridContainer
              : props.childrenGridClass
          }
        >
          {props.children}
        </VcGridRow>
      ) : null}
    </VcGrid>
  );
};

VcGenericSwitch.propTypes = {
  /** a boolean to indicate if styling for invalid entry is to be set on the toggle button */
  invalid: Proptypes.bool,
  /** a boolean to indicate if the slider should be disabled */
  disabled: Proptypes.bool,
  /** a boolean to indicate if styling for children is to be set on the toggle button click */
  childrenGridClass: Proptypes.bool,
  /** value for the toggle button */
  value: Proptypes.bool,
  /** An array of nested components to be rendered */
  children: Proptypes.arrayOf(Proptypes.node),
  /** callback function to be fired onChange */
  onChange: Proptypes.func,
  /** options list - provided */
  withOptions: Proptypes.bool,
  /** options for drop-down list - provided as an array */
  options: Proptypes.arrayOf(
    Proptypes.shape({
      value: Proptypes.string,
    })
  ),
};

VcGenericSwitch.defaultProps = {
  invalid: false,
  disabled: false,
  withOptions: false,
  childrenGridClass: false,
  onChange: () => {},
  nestedComponents: [],
};

export default injectIntl(VcGenericSwitch);
