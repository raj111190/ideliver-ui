import React from 'react';
import { injectIntl } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import cx from 'classnames';
import Proptypes from 'prop-types';
import styles from './vcCard.scss';

/**
 * A component to present a list of alert messages
 * @param {*} props
 */

const VcCard = props => {
  const leftStyle = cx(styles.left, {
    [styles.colorRed]: props.color === 'red',
    [styles.colorYellow]: props.color === 'yellow',
    [styles.colorGreen]: props.color === 'green',
    [styles.colorPurple]: props.color === 'purple',
    [styles.colorTomato]: props.color === 'tomato',
    [styles.colorGrey]: props.color === 'grey',
  });

  return (
    <Paper elevation={24} className={cx(styles.container, props.className)}>
      <div className={leftStyle}> {props.leftContent} </div>
      <div className={styles.right}>{props.rightContent}</div>
    </Paper>
  );
};

VcCard.propTypes = {
  leftContent: Proptypes.node,
  rightContent: Proptypes.node,
  color: Proptypes.oneOf([
    'red',
    'yellow',
    'green',
    'purple',
    'tomato',
    'grey',
  ]),
};

VcCard.defaultProps = {
  color: 'yellow',
};

export default injectIntl(VcCard);
