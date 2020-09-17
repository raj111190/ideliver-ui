import React from 'react';
import { injectIntl } from 'react-intl';
import Proptypes from 'prop-types';
import cx from 'classnames';
import styles from './vcPatientStatus.scss';
import messages from '../../intl/messages';

export const PATIENT_STATUS = {
  WAITING: 'Waiting',
  ASSESSMENT: 'Assessment',
  ADMITTED: 'Admitted',
  POSTPARTUM: 'Postpartum',
  REFERRAL: 'Referral',
  DISCHARGED: 'Discharged',
};

export const PATIENT_STATUS_ENUM = [
  PATIENT_STATUS.WAITING,
  PATIENT_STATUS.ASSESSMENT,
  PATIENT_STATUS.ADMITTED,
  PATIENT_STATUS.POSTPARTUM,
  PATIENT_STATUS.REFERRAL,
  PATIENT_STATUS.DISCHARGED,
];

export const VISIT_STATUS = {
  INTAKE: 'Intake',
  PNC: 'PNC',
  LABOR: 'Labor',
  ANC: 'ANC',
};

export const VISIT_STATUS_ENUM = [
  VISIT_STATUS.INTAKE,
  VISIT_STATUS.ANC,
  VISIT_STATUS.LABOR,
  VISIT_STATUS.PNC,
];

/**
 * A component to present the patients status
 * @param {*} props
 */
const VcPatientStatus = props => {
  const { formatMessage } = props.intl;
  const patientStatus = props.value
    ? formatMessage(messages[props.value.toLowerCase()])
    : '';
  const statuses = VISIT_STATUS_ENUM.map((status, index) => (
    <div
      key={status}
      className={cx(styles.statusBubble, {
        [styles.filled]: index <= VISIT_STATUS_ENUM.indexOf(props.value),
      })}
    />
  ));
  return (
    <div className={styles.patientStatus}>
      <div className={styles.statusLabel}> {patientStatus}</div>
      <div className={styles.statusPosition}>
        <div className={styles.throughLine} />
        {statuses}
      </div>
    </div>
  );
};

VcPatientStatus.propTypes = {
  /** string with the status to be displayed */
  value: Proptypes.oneOf(VISIT_STATUS_ENUM),
};

VcPatientStatus.defaultProps = {
  value: 'Intake',
};

export default injectIntl(VcPatientStatus);
