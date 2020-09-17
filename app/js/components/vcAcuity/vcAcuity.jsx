import React from 'react';
import Proptypes from 'prop-types';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import styles from './vcAcuity.scss';
import messages from '../../intl/messages';

/**
 * Component that displays the acuity level with corresponding color and optional label.
 * @param {*} props
 */
const VcAcuity = props => {
  const acuityLabel = cx({
    [styles.acuityLabel_l1]: props.value === 1,
    [styles.acuityLabel_l2]: props.value === 2,
    [styles.acuityLabel_l3]: props.value === 3,
    [styles.acuityLabel_l4]: props.value === 4,
    [styles.acuityLabel_l5]: props.value === 5 || !props.value,
  });

  const acuityNumber = cx(styles.acuityNumber, {
    [styles.acuity_l1]: props.value === 1,
    [styles.acuity_l2]: props.value === 2,
    [styles.acuity_l3]: props.value === 3,
    [styles.acuity_l4]: props.value === 4,
    [styles.acuity_l5]: props.value === 5 || !props.value,
  });

  const { formatMessage } = props.intl;
  return (
    <div className={styles.acuity}>
      {props.withLabel ? (
        <div className={acuityLabel}>{formatMessage(messages.acuity)}</div>
      ) : null}
      <div className={acuityNumber}>{props.value}</div>
    </div>
  );
};
VcAcuity.propTypes = {
  /** The acuity level to be displayed */
  value: Proptypes.oneOf([1, 2, 3, 4, 5]),
  /** If true shows the text "Acuity" before the number */
  withLabel: Proptypes.bool,
};

VcAcuity.defaultProps = {
  withLabel: false,
};

export default injectIntl(VcAcuity);
