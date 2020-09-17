import React from 'react';
import Proptypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import VcGridRow from '../vcGrid/vcGridRow/vcGridRow';
import styles from './vcTask.scss';

const VcTask = props => (
  <VcGridRow className={styles.container}>
    <Checkbox
      onChange={() => props.onChange(!props.value)}
      checked={props.value}
      disabled={props.disabled}
    />
    <Typography
      className={styles.text}
      variant="h6"
      color={props.disabled ? 'inherit' : 'default'}
    >
      {props.title}
    </Typography>
  </VcGridRow>
);

VcTask.propTypes = {
  /** The title */
  title: Proptypes.string,
  onChange: Proptypes.func.isRequired,
  value: Proptypes.bool,
  disabled: Proptypes.bool,
};
VcTask.defaultProps = {
  value: false,
};

export default VcTask;
