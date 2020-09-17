import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import styles from './vcGridColumn.scss';

/**
 * Grid Column flex container that arranges children in a column
 * @param {*} props
 */
const VcGridColumn = props => (
  <div
    datatest={props.datatest}
    style={{ flex: props.flex }}
    className={cx(styles.column, props.className)}
  >
    {props.children}
  </div>
);

VcGridColumn.propTypes = {
  /** Nodes to be displayed in the grid column */
  children: Proptypes.node,
  /** a number for the flex ratio */
  flex: Proptypes.number,
};

VcGridColumn.defaultProps = {
  flex: 1,
};

export default VcGridColumn;
