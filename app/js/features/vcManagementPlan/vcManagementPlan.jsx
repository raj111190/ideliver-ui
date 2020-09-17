import React from 'react';
import Proptypes from 'prop-types';
import { injectIntl, FormattedMessage, FormattedDate } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import VcCard from '../../components/vcCard/vcCard';
import VcButton from '../../components/vcButton/vcButton';
import VcGridColumn from '../../components/vcGrid/vcGridColumn/vcGridColumn';
import VcGridRow from '../../components/vcGrid/vcGridRow/vcGridRow';
import DiagnosisIcon from '../../components/svgIcon/diagnosisIcon';
import messages from '../../intl/messages';
import styles from './vcManagementPlan.scss';
import VcFormContainer from '../vcForm/vcFormContainer';
import { encounterType } from '../../uuid';

class VcManagementPlan extends React.Component {
  getColor = acuity => {
    let color;
    switch (acuity) {
      case 1:
        color = 'red';
        break;
      case 2:
        color = 'tomato';
        break;
      case 3:
        color = 'yellow';
        break;
      case 4:
        color = 'green';
        break;
      default:
        color = 'grey';
    }
    return color;
  };

  componentDidMount() {
    if (!this.props.formId || this.props.formId !== this.props.uuid) {
      this.props.selectForm(this.props.uuid);
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <VcCard
        className={styles.container}
        color={this.getColor(this.props.acuity)}
        leftContent={
          <VcGridColumn className={styles.left}>
            <VcGridRow className={styles.title}>
              <DiagnosisIcon className={styles.icon} />
              <VcGridColumn>
                <Typography color="inherit" variant="h6">
                  {formatMessage(messages.diagnosis)}
                </Typography>
                <Typography variant="h6" color="inherit">
                  {`${formatMessage(messages.acuity)} ${this.props.acuity}`}
                </Typography>
              </VcGridColumn>
            </VcGridRow>
            <Typography variant="h5" color="inherit">
              <b>{this.props.diagnosis.display}</b>
            </Typography>
            <Typography variant="h6" color="inherit">
              <FormattedDate
                value={this.props.timestamp}
                month="long"
                day="2-digit"
                hour="2-digit"
                minute="2-digit"
              />
            </Typography>
          </VcGridColumn>
        }
        rightContent={
          <VcGridColumn className={styles.right}>
            {this.props.isStarted ? (
              <div>
                <Typography variant="h5">
                  <b>
                    {`${formatMessage(messages.managementPlanFor)} ${
                      this.props.diagnosis.display
                    }`}
                  </b>
                </Typography>
                <VcFormContainer
                  location={this.props.location}
                  uuid={this.props.uuid}
                  onEveryChange={fieldsToVoid =>
                    this.props.onSubmit(
                      encounterType.PPH_ENCOUNTER_TYPE_UUID,
                      fieldsToVoid
                    )
                  }
                />
              </div>
            ) : (
              <Typography variant="subtitle1">
                <FormattedMessage
                  {...messages.generalManagementMsg}
                  values={{
                    br: <br />,
                    genMng: (
                      <b>{`${formatMessage(messages.generalManagement)}:`}</b>
                    ),
                    check: <b>{`${formatMessage(messages.checkABCDE)}:`}</b>,
                  }}
                />
              </Typography>
            )}
            {this.props.isStarted ? null : (
              <VcButton
                className={styles.button}
                value={formatMessage(messages.startMngPlan)}
                color="primary"
                onClick={() =>
                  this.props.onSubmit(encounterType.PPH_ENCOUNTER_TYPE_UUID)
                }
              />
            )}
          </VcGridColumn>
        }
      />
    );
  }
}

VcManagementPlan.propTypes = {
  /** Flag that shows if the management plan has been started or not */
  isStarted: Proptypes.bool,
  /** The acuity level of the patient,
   * to be shown and define the color of the left side of the card */
  acuity: Proptypes.number,
  /** The diagnosis object */
  diagnosis: Proptypes.any,
  /** The time when the diagnosis was confirmed */
  timestamp: Proptypes.string,
  /** Callback func to be called on click of the "Start management plan" button */
  onStart: Proptypes.func,
  metadata: Proptypes.any,
};

VcManagementPlan.defaultProps = {
  metadata: [],
};

export default injectIntl(VcManagementPlan);
