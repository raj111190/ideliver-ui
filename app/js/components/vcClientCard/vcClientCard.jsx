import React from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import { injectIntl } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import { Typography, Chip } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { VcCardex } from '@vecnacares/vc-ui';
import styles from './vcClientCard.scss';
import messages from '../../intl/messages';
import VcTimer, { TIMER_OPTIONS_ENUM } from '../vcTimer/vcTimer';
import VcAcuity from '../vcAcuity/vcAcuity';
import VcPatientStatus, {
  PATIENT_STATUS,
  PATIENT_STATUS_ENUM,
} from '../vcPatientStatus/vcPatientStatus';
import VcGrid from '../vcGrid/vcGrid';
import VcGridRow from '../vcGrid/vcGridRow/vcGridRow';
import VcGridColumn from '../vcGrid/vcGridColumn/vcGridColumn';
import VcDatapoint from '../vcDatapoint/vcDatapoint';
import VcImageContainer from '../../features/vcImage/vcImageContainer';

/**
 * A card to present the Patient's/Client's information.
 * @param {*} props
 */
const VcClientCard = props => {
  const { formatMessage } = props.intl;

  const riskFactors = props.riskFactors
    ? props.riskFactors.map(item => {
        return <Chip key={item} className={styles.riskChip} label={item} />;
      })
    : null;

  const resolved = props.resolved
    ? props.resolved.map(item => {
        return <Chip key={item} className={styles.resolvedChip} label={item} />;
      })
    : null;

  const VISIT_STATUS = {
    ADMITTED: 'admitted',
    NOT_ADMITTED: 'notAdmitted',
  };

  const visitStatus = patientStatus => {
    if (!patientStatus || patientStatus === PATIENT_STATUS.WAITING) {
      return VISIT_STATUS.NOT_ADMITTED;
    }
    return VISIT_STATUS.ADMITTED;
  };

  return (
    <Paper elevation={24} className={cx(styles.card, props.className)}>
      <VcImageContainer
        personId={props.personId}
        visitId={
          props.location ? props.location.pathname.substring(8, 44) : undefined
        }
        img={props.img}
        className={styles.media}
      />
      <VcGrid className={styles.gridContainer}>
        <VcGridRow flex={2}>
          <VcGridColumn flex={1} className={styles.cardGridColumn}>
            <VcGrid className={styles.gridContainer}>
              <VcGridRow flex={1} className={styles.nameRow}>
                <VcGridColumn flex={3}>
                  <Typography variant="h5" gutterBottom>
                    {`${props.givenName} ${props.familyName}`}
                  </Typography>
                </VcGridColumn>
              </VcGridRow>
              <VcGridRow flex={1}>
                <VcGridColumn flex={1}>
                  <VcDatapoint label={formatMessage(messages.age)}>
                    {props.age}
                  </VcDatapoint>
                </VcGridColumn>
                <VcGridColumn flex={4}>
                  <VcDatapoint label={formatMessage(messages.companion)}>
                    {`${props.companionGivenName} ${props.companionFamilyName}`}
                  </VcDatapoint>
                </VcGridColumn>
              </VcGridRow>
              <VcGridRow flex={2} className={styles.ancRiskRow}>
                <VcDatapoint>
                  {riskFactors}
                  {resolved}
                </VcDatapoint>
              </VcGridRow>
              <VcGridRow flex={1}>
                <VcGridRow flex={1}>
                  <VcDatapoint label={formatMessage(messages.week)} />
                  <div className={styles.weekBox}>
                    {props.weeks || formatMessage(messages.na)}
                  </div>
                </VcGridRow>
                <VcGridColumn flex={1}>
                  <div className={styles.parity}>
                    {`${formatMessage(messages.parity)} ${props.parity ||
                      formatMessage(messages.na)}`}
                  </div>
                </VcGridColumn>
                <VcGridRow className={styles.taskRow}>
                  {props.task
                    ? [
                        <CheckCircle
                          key="checkCircle"
                          className={styles.checkCircle}
                        />,
                        <div key="tasks" className={styles.task}>
                          {formatMessage(messages.task)}
                          {':'}
                        </div>,
                      ]
                    : null}

                  {props.task}
                </VcGridRow>
              </VcGridRow>
            </VcGrid>
          </VcGridColumn>

          <VcGridColumn flex={1} className={styles.cardGridColumn}>
            <VcCardex
              visitStatus={
                visitStatus(props.patientStatus) === VISIT_STATUS.ADMITTED
                  ? formatMessage(messages.admitted)
                  : formatMessage(messages.notAdmitted)
              }
              showNotes={
                visitStatus(props.patientStatus) === VISIT_STATUS.ADMITTED
              }
              admitOrDischargeLabel={
                visitStatus(props.patientStatus) === VISIT_STATUS.ADMITTED
                  ? formatMessage(messages.dischargeButton)
                  : formatMessage(messages.admit)
              }
              onAdmitOrDischarge={
                visitStatus(props.patientStatus) === VISIT_STATUS.ADMITTED
                  ? props.onDischarge
                  : props.onAdmit
              }
              referLabel={formatMessage(messages.referButton)}
              onRefer={props.onRefer}
              notesLabel={formatMessage(messages.notesButton)}
              onNotes={props.onNotes}
              allNotes={props.allNotes}
            />
          </VcGridColumn>
        </VcGridRow>
      </VcGrid>
      <div className={styles.rightSection}>
        <VcAcuity value={props.acuity} withLabel />
        <VcTimer value={props.nextCheckUp} />
        <VcPatientStatus value={props.programStatus} />
      </div>
    </Paper>
  );
};

VcClientCard.propTypes = {
  /** Picture of the patient */
  img: Proptypes.string,
  /** given name of the patient */
  givenName: Proptypes.string,
  /** family name of the patient */
  familyName: Proptypes.string,
  /** age name of the patient */
  age: Proptypes.number,
  /** companion's given name */
  companionGivenName: Proptypes.string,
  /** companion's family name */
  companionFamilyName: Proptypes.string,
  /** weeks of the pregnancy */
  weeks: Proptypes.number,
  /** parity */
  parity: Proptypes.string,
  /** array of risk factors for the patient */
  riskFactors: Proptypes.arrayOf(Proptypes.string),
  /** array of diagnoses that have been resolved for the patient */
  resolved: Proptypes.arrayOf(Proptypes.string),
  /** task that needs to be done for the patient */
  task: Proptypes.string,
  /** number representing acuity level */
  acuity: Proptypes.number,
  /** status of the patient */
  patientStatus: Proptypes.oneOf(PATIENT_STATUS_ENUM),
  /** time till next checkup */
  nextCheckUp: Proptypes.oneOf(TIMER_OPTIONS_ENUM),
  /** status of the visit */
  visitStatus: Proptypes.string,
};

VcClientCard.defaultProps = {
  img: 'img/ideliver-gradient-01.png',
  companionGivenName: '',
  companionFamilyName: '',
  gravidity: 0,
  pretermBirths: 0,
  termBirths: 0,
  abortions: 0,
  livingChildren: 0,
};

export default injectIntl(VcClientCard);
