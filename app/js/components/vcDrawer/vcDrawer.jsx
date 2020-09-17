import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import styles from './vcDrawer.scss';

/**
 * Drawer component used for the sidebar
 * @param {*} props
 */
const VcDrawer = props => {
  const style = cx(styles.normal);

  return (
    <Drawer
      classes={{
        paper: style,
      }}
      PaperProps={{ elevation: 24 }}
      anchor="left"
      variant="persistent"
      open={props.open}
    >
      {props.children}
    </Drawer>
  );
};

VcDrawer.propTypes = {
  /** Nodes to be displayed in the drawer */
  children: Proptypes.arrayOf(Proptypes.node),
  /** Boolean that determines if the drawer is shown or not */
  open: Proptypes.bool,
};

VcDrawer.defaultProps = {
  open: true,
};

export default VcDrawer;
