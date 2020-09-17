import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import styles from './vcSidebarButton.scss';

/**
 * Buttons for use as children of the VcSidebar
 * @param {*} props
 */
const VcSidebarButton = props => {
  const style = cx(styles.container, {
    [styles.containerWithIcon]: props.icon || props.iconSelected,
    [styles.selectedWithIcon]:
      props.selected && (props.icon || props.iconSelected),
    [styles.selected]: props.selected && !(props.icon || props.iconSelected),
  });
  const label = cx(styles.label, {
    [styles.labelWithIcon]: props.icon || props.iconSelected,
  });
  const icon = cx({
    [styles.icon]: props.label,
  });

  return (
    <div onClick={props.onClick}>
      <div className={style}>
        {props.selected ? (
          <div className={icon}>{props.iconSelected}</div>
        ) : (
          <div className={icon}>{props.icon}</div>
        )}
        {props.label ? <span className={label}>{props.label}</span> : null}
      </div>
    </div>
  );
};

VcSidebarButton.propTypes = {
  /** boolean to switch styles. if true the button is styled as selected */
  selected: Proptypes.bool,
  /** string to be used as label in the component */
  label: Proptypes.string,
  /** an icon to be shown when the button is not selected */
  icon: Proptypes.node,
  /** an icon to be shown when the button is selected */
  iconSelected: Proptypes.node,
  /** callback function to be fired onClick */
  onClick: Proptypes.func,
};

VcSidebarButton.defaultProps = {
  onClick: () => {},
  selected: false,
  label: '',
};

export default VcSidebarButton;
