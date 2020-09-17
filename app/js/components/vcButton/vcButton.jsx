import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
    minHeight: '40px',
  },
  label: {
    fontWeight: 'bold',
  },
  squared: {
    borderRadius: '0',
  },
});

/**
 * Button component to be used for all standard buttons
 * @param {*} props
 */
const VcButton = props => {
  const {
    className,
    classes,
    squared,
    onClick,
    variant,
    isSelected,
    selectedColor,
    color,
    disabled,
    value,
    children,
    ...otherProps
  } = props;
  return (
    <Button
      m={1}
      className={cx(
        className,
        classes.button,
        squared ? classes.squared : undefined
      )}
      onClick={onClick}
      variant={variant}
      color={isSelected && selectedColor ? selectedColor : color}
      classes={{ label: styles.label }}
      disabled={disabled}
      {...otherProps}
    >
      {children}
      {value}
    </Button>
  );
};

VcButton.propTypes = {
  /** The class name to apply to the component */
  className: PropTypes.string,
  /** The classes injected by Material UI */
  classes: PropTypes.shape({}),
  /** Boolean to show if the button is disabled */
  disabled: PropTypes.bool,
  /** The text or icon to be displayed in the button */
  value: PropTypes.node,
  /** Callback function triggered on click */
  onClick: PropTypes.func,
  /** Boolean to show if button is selected or not */
  isSelected: PropTypes.bool,
  /** button type can be either of primary or secondary */
  color: PropTypes.oneOf(['primary', 'secondary', 'default', 'inherit']),
  selectedColor: PropTypes.oneOf([
    'primary',
    'secondary',
    'default',
    'inherit',
  ]),
  variant: PropTypes.oneOf([
    'text',
    'outlined',
    'contained',
    'fab',
    'extendedFab',
  ]),
  /** Should the button be squared */
  squared: PropTypes.bool,
  /** Children node to be rendered */
  children: PropTypes.node,
};

VcButton.defaultProps = {
  disabled: false,
  value: '',
  isSelected: false,
  color: 'default',
  variant: 'contained',
  squared: false,
  className: undefined,
  onClick: undefined,
  selectedColor: 'default',
  children: undefined,
  classes: {},
};

export default withStyles(styles)(VcButton);
