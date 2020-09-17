import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import styles from './vcGrid.scss';

/**
 * A Grid component for arranging other nodes using flex
 * @param {*} props
 */
const VcGrid = props => (
  <div className={cx(styles.grid, props.className)}>{props.children}</div>
);

VcGrid.propTypes = {
  /** nodes to be displayed within the grid */
  children: Proptypes.node,
  /** class to be added to the grid */
  className: Proptypes.string,
};

VcGrid.defaultProps = {};

export default VcGrid;
