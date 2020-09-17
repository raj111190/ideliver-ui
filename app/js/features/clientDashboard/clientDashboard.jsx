import React from 'react';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { VcVisitSummaryCard, VcCardexNotes } from '@vecnacares/vc-ui';
import VcHeader from '../../components/vcHeader/vcHeader';
import VcGrid from '../../components/vcGrid/vcGrid';
import { datetimeFormatWithoutSeconds } from '../../components/vcDateTime/vcDateTime';
import VcGridRow from '../../components/vcGrid/vcGridRow/vcGridRow';
import VcAlertsCard from '../../components/vcAlertsCard/vcAlertsCard';
import ClientSidebarContainer from '../clientSidebar/clientSidebarContainer';
import VcClientCard from '../../components/vcClientCard/vcClientCard';
import styles from './clientDashboard.scss';
import messages from '../../intl/messages';
import VcFormContainer from '../vcForm/vcFormContainer';
import { form } from '../../uuid';
import ActiveLabourContainer from '../activeLabour/activeLabourContainer';
import ManagementPlansListContainer from '../managementPlansList/managementPlansListContainer';
import VcDiagnosisContainer from '../vcDiagnosis/vcDiagnosisContainer';
import { PATIENT_STATUS } from '../../components/vcPatientStatus/vcPatientStatus';
import VcPatientNotesContainer from '../VcPatientNotes/vcPatientNotesContainer';
import VcReferPatientContainer from '../VcReferPatient/vcReferPatientContainer';
import VcDischargePatientContainer from '../VcDischargePatient/vcDischargePatientContainer';
import VcDialog from '../../components/vcDialog/vcDialog';
import ErrorMessagesContainer from '../errors/errorMessagesContainer';
import VitalsContainer from '../vitals/vitalsContainer';
import { filterArray } from './clientDashboardHelpers';
const getWaitTimeFromAcuity = acuityValue => {
  const waitTimes = [0, 15, 15, 30, 60];
  return acuityValue
    ? waitTimes[acuityValue - 1]
    : waitTimes[waitTimes.length - 1];
};

class ClientDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      nursingCardex: false,
      dischargeCardex: false,
      referCardex: false,
    };
  }
  componentDidMount() {
    // only fetch forms if they haven't been previously fetched
    if (!this.props.formsList || !this.props.formsList.length) {
      this.props.fetchForms();
    }
    if (!this.props.selectedFormUuid) {
      this.props.selectForm();
    }
    this.props.fetchEpisodes();
  }
  componentWillUnmount() {
    window.location.reload();
  }
  handleClose = () => {
    const newState = Object.assign({}, this.state, { searchText: '' });
    this.setState(newState);
  };

  handleEnter = value => {
    const state = value
      ? Object.assign({}, this.state, { searchText: value.trim() })
      : Object.assign({}, this.state, { searchText: '' });
    this.setState(state);
    this.props.history.push({
      pathname: '/visits',
      state,
    });
  };

  handleSearchTextChange = event => {
    const state = Object.assign({}, this.state, {
      searchText: event.target.value.trim(),
    });
    this.setState(state);
  };

  handleNotes = () => {
    this.setState({
      nursingCardex: true,
      dischargeCardex: false,
      referCardex: false,
    });
  };
  handleRefer = () => {
    this.setState({
      nursingCardex: false,
      dischargeCardex: false,
      referCardex: true,
    });
  };
  handleDischarge = () => {
    this.setState({
      nursingCardex: false,
      dischargeCardex: true,
      referCardex: false,
    });
  };
  handleCardexClose = () => {
    this.setState({
      nursingCardex: false,
      dischargeCardex: false,
      referCardex: false,
    });
  };
  getProgramStatusIntl = programStatus => {
    const { formatMessage } = this.props.intl;
    const status = new Map([
      ['PNC', formatMessage(messages.pnc)],
      ['Labor', formatMessage(messages.labor)],
      ['ANC', formatMessage(messages.anc)],
      ['Intake', formatMessage(messages.intake)],
    ]);

    return status.get(programStatus);
  };
  getPatientStatus = (patients, patientUuid) => {
    const patient = filterArray(patients, patientUuid);
    return patient;
  };
  render() {
    if (!this.props && this.props.value) return null;
    const status =
      this.props && this.props.value && this.props.value.results
        ? this.props.value.results
        : null;
    const statusPatient = this.getPatientStatus(status, this.props.patientUuid);
    const { hasVisitEnded } = this.props;
    if (hasVisitEnded) {
      return <Redirect to="/visits" />;
    }
    const { formatMessage } = this.props.intl;
    const programStatus = this.getProgramStatusIntl(this.props.programStatus);
    const person = get(this.props, ['activeVisit', 'person'], null);
    const acuity = get(this.props, ['activeVisit', 'acuity'], null);
    const diagnosisEncounterUuid = get(
      this.props,
      ['activeVisit', 'diagnosisEncounterUuid'],
      null
    );
    const visitUuid = get(this.props, ['activeVisit', 'uuid'], null);
    const waitTime = getWaitTimeFromAcuity(acuity);
    const riskFactors = get(this.props, ['riskFactors'], null);
    const resolved = get(this.props, ['resolved'], null);

    const timeline = [];
    const startDatetime = get(
      this.props,
      ['activeVisit', 'startDatetime'],
      null
    );
    const stopDatetime = get(this.props, ['activeVisit', 'stopDatetime'], null);
    if (startDatetime) {
      timeline.push({
        message: formatMessage(messages.visitStarted),
        timeStamp: moment(startDatetime).format('hh:mm a'),
      });
    }
    get(this.props, ['activeVisit', 'timeline'], []).forEach(timelineEvent => {
      timeline.push({
        message: timelineEvent.message.concat(
          formatMessage(messages.surveyTaken)
        ),
        timeStamp: moment(timelineEvent.timeStamp).format('hh:mm a'),
      });
    });

    const companionName = get(
      this.props,
      ['activeVisit', 'companionName'],
      undefined
    );

    const weeks = get(this.props, ['activeVisit', 'OBWeeks'], null);
    const gravidity = get(this.props, ['activeVisit', 'OBGravidity'], null);
    const live = get(this.props, ['activeVisit', 'OBLive'], null);
    let parity = '';
    const naMessage = formatMessage(messages.na);
    if (gravidity) {
      parity = parity.concat(gravidity);
      parity = parity.concat('+');
      if (live) {
        parity = parity.concat(live);
      } else {
        parity = parity.concat(naMessage);
      }
    } else if (live) {
      parity = parity.concat(naMessage);
      parity = parity.concat('+');
      parity = parity.concat(live);
    } else {
      parity = parity.concat(naMessage);
    }

    const renderForm = match => {
      const { formId } = match.params;
      if (formId === form.ACTIVE_LABOUR_FORM_UUID) {
        return (
          <ActiveLabourContainer
            location={this.props.location}
            uuid={this.props.selectedFormUuid}
          />
        );
      }
      if (formId === form.VITALS_FORM_UUID) {
        return (
          <VitalsContainer
            location={this.props.location}
            uuid={this.props.selectedFormUuid}
          />
        );
      }
      if (formId === 'managementPlans') {
        return (
          <ManagementPlansListContainer
            location={this.props.location}
            uuid={this.props.selectedFormUuid}
          />
        );
      }
      return (
        <VcFormContainer
          location={this.props.location}
          onEndVisit={
            stopDatetime
              ? undefined
              : () => {
                  this.props.endVisit();
                }
          }
        />
      );
    };

    const patientStatus = get(this.props, ['activeVisit', 'patientStatus'], {});
    const sortedNotes = this.props.patientNotes
      ? Object.values(this.props.patientNotes).sort((a, b) => {
          if (
            moment(a.timeValue)
              .format(datetimeFormatWithoutSeconds)
              .toString() ===
            moment(b.timeValue)
              .format(datetimeFormatWithoutSeconds)
              .toString()
          ) {
            if (a.type && a.type === 'Doctor') return -1;
            else if (b.type && b.type === 'Doctor') return 1;
          }
          return moment(a.timeValue).diff(moment(b.timeValue));
        })
      : Object.values(this.props.patientNotes);

    const displayNotes = <VcCardexNotes values={sortedNotes} />;

    return [
      <ErrorMessagesContainer />,
      <ClientSidebarContainer
        location={this.props.location}
        key="clientSidebar"
        formsList={this.props.formsList}
      />,
      <VcHeader
        className={styles.header}
        key="clientHeader"
        searchText={this.state.searchText}
        onClose={this.handleClose}
        onEnter={this.handleEnter}
        onSearchChange={this.handleSearchTextChange}
        searchPlaceholder={formatMessage(messages.wardSearchPlaceholder)}
      />,
      <VcGrid className={styles.container} key="grid">
        <VcGridRow className={styles.firstRow}>
          <VcClientCard
            location={this.props.location}
            personId={person ? person.uuid : undefined}
            age={person ? person.age : undefined}
            givenName={person ? person.givenName : undefined}
            familyName={person ? person.familyName : undefined}
            className={styles.patientCard}
            companionGivenName={companionName}
            acuity={acuity}
            riskFactors={riskFactors}
            resolved={resolved}
            weeks={weeks}
            parity={parity}
            patientStatus={patientStatus ? patientStatus.value : null}
            nextCheckUp={waitTime}
            onAdmit={() =>
              this.props.updateVisitStatus(
                PATIENT_STATUS.ADMITTED,
                patientStatus.uuid
              )
            }
            onDischarge={this.handleDischarge}
            onRefer={this.handleRefer}
            onNotes={this.handleNotes}
            allNotes={displayNotes}
            programStatus={programStatus}
          />
        </VcGridRow>
        <VcDialog
          open={this.state.nursingCardex}
          onToggle={this.handleCardexClose}
          dialogContent={
            <VcPatientNotesContainer
              visitUuid={visitUuid}
              patientUuid={this.props.patientUuid}
              onClose={this.handleCardexClose}
              onRefer={this.handleRefer}
              onDischarge={this.handleDischarge}
              open={this.state.nursingCardex}
            />
          }
        />
        <VcDialog
          open={this.state.referCardex}
          onToggle={this.handleCardexClose}
          dialogContent={
            <VcReferPatientContainer
              visitUuid={visitUuid}
              patientUuid={this.props.patientUuid}
              onClose={this.handleCardexClose}
              onReturn={this.handleNotes}
              onRefer={() => {
                this.props.updateVisitStatus(PATIENT_STATUS.REFERRAL);
              }}
              open={this.state.referCardex}
            />
          }
        />
        <VcDialog
          open={this.state.dischargeCardex}
          onToggle={this.handleCardexClose}
          dialogContent={
            <VcDischargePatientContainer
              visitUuid={visitUuid}
              patientUuid={this.props.patientUuid}
              onClose={this.handleCardexClose}
              onReturn={this.handleNotes}
              onDischarge={() => {
                this.props.updateVisitStatus(PATIENT_STATUS.DISCHARGED);
              }}
              open={this.state.dischargeCardex}
            />
          }
        />
        <VcGridRow className={styles.row}>
          <div className={styles.col} style={{ flex: 2 }}>
            <VcDiagnosisContainer
              encounterUuid={diagnosisEncounterUuid}
              visitUuid={visitUuid}
              patientUuid={this.props.patientUuid}
              history={this.props.history}
            />
          </div>
          <div className={styles.col}>
            <VcVisitSummaryCard
              timeline={timeline}
              onEndVisit={
                stopDatetime
                  ? undefined
                  : () => {
                      this.props.endVisit();
                    }
              }
            />
          </div>
        </VcGridRow>
        {this.props.alerts && this.props.alerts.length > 0 ? (
          <VcGridRow className={styles.row}>
            <VcAlertsCard alerts={this.props.alerts} />
          </VcGridRow>
        ) : null}
        <VcGridRow className={styles.row}>
          <Route
            path="/client/:visitId/:patientId/:formId/"
            render={({ match }) => renderForm(match)}
          />
        </VcGridRow>
      </VcGrid>,
    ];
  }
}

ClientDashboard.propTypes = {
  // array of alerts to be displayed
  alerts: PropTypes.array,
  // callback function to be fired on component did mount
  fetchFormsAndClient: PropTypes.func,

  // callback function to be fired on component did mount
  fetchEpisodes: PropTypes.func,
};

ClientDashboard.defaultProps = {
  searchText: '',
};

export default injectIntl(ClientDashboard);
