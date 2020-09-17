import React from 'react';
import Proptypes from 'prop-types';
import styles from './vcDatapoint.scss';

/**
 * A component to present some data with a label on top
 * @param {*} props
 */
const VcDatapoint = props => (
  <div className={styles.container}>
    <div className={styles.label}>{props.label}</div>
    {props.children}
  </div>
);

VcDatapoint.propTypes = {
  /** text for the label */
  label: Proptypes.string,
  /** content of the datapoint could be string or a component */
  children: Proptypes.node,
};

VcDatapoint.defaultProps = {
  label: '',
};

export default VcDatapoint;
