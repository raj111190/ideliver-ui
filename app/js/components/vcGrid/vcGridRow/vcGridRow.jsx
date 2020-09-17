import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import styles from './vcGridRow.scss';

/**
 * Grid Row flex container that arranges children in a row
 * @param {*} props
 */
const VcGridRow = props => (
  <div style={{ flex: props.flex }} className={cx(styles.row, props.className)}>
    {props.children}
  </div>
);

VcGridRow.propTypes = {
  /** Nodes to be displayed in the grid row */
  children: Proptypes.node,
  /** a number for the flex ratio */
  flex: Proptypes.number,
};

VcGridRow.defaultProps = {
  flex: 1,
};

export default VcGridRow;
