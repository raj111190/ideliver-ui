import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import styles from './vcMessage.scss';
import VcGridRow from '../vcGrid/vcGridRow/vcGridRow';

const VcMessage = props => (
  <VcGridRow>
    {props.isWarning ? <ErrorIcon className={styles.icon} /> : null}
    <Typography variant="subtitle1">{props.label || props.children}</Typography>
  </VcGridRow>
);

VcMessage.propTypes = {
  /** value of the component, the string that needs to be displayed */
  value: PropTypes.string,
  /** flag marking the message as warning so that a warning icon is displayed */
  isWarning: PropTypes.bool,
};

VcMessage.defaultProps = {};

export default VcMessage;
