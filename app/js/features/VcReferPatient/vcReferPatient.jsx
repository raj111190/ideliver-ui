import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import cx from 'classnames';
import { pick } from 'lodash';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { VcCardexWindow, VcCardexNotes, VcTimeInput } from '@vecnacares/vc-ui';
import messages from '../../intl/messages';
import { concept } from '../../uuid';
import VcTextField from '../../components/vcTextField/vcTextField';
import {
  longDatetimeFormat,
  datetimeFormatWithoutSeconds,
} from '../../components/vcDateTime/vcDateTime';
import {
  createNotesObservation,
  createObservation,
} from '../VcPatientNotes/patientNotesHelpers';
import styles from './vcReferPatient.scss';

class VcReferPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      time: '',
      facility: '',
      hours: '',
      minutes: '',
    };
  }

  handleHourChange = value => {
    let time = '';
    if (this.state.minutes !== '') {
      time = moment()
        .hours(value)
        .minutes(this.state.minutes)
        .format(longDatetimeFormat);
    }
    this.setState({
      hours: value,
      time,
    });
  };

  handleMinuteChange = value => {
    let time = '';
    if (this.state.hours !== '') {
      time = moment()
        .hours(this.state.hours)
        .minutes(value)
        .format(longDatetimeFormat);
    }
    this.setState({
      minutes: value,
      time,
    });
  };

  handleReasonChange = value => {
    this.setState({
      reason: value,
    });
  };

  handleFacilityChange = value => {
    this.setState({
      facility: value,
    });
  };

  handleAdd = value => {
    if (
      this.state.reason.trim().length > 0 &&
      this.state.facility.trim().length > 0 &&
      this.state.time != ''
    ) {
      const newNotes = createObservation(
        this.state.reason.trim(),
        concept.REASON_FOR_REFERRAL,
        this.props.encounterUuid,
        this.props.patientUuid,
        '',
        false
      );
      const newFacility = createObservation(
        this.state.facility.trim(),
        concept.REFERRAL_FACILITY,
        this.props.encounterUuid,
        this.props.patientUuid,
        '',
        false
      );

      const checkDate = moment(this.state.time, longDatetimeFormat, true);
      const timeVal = checkDate.isValid()
        ? moment
            .parseZone(this.state.time)
            .utc()
            .format(longDatetimeFormat)
        : this.state.time;

      const newTime = createObservation(
        timeVal,
        concept.REFERRAL_TIME,
        this.props.encounterUuid,
        this.props.patientUuid,
        '',
        false
      );

      const groupMembers = [newNotes, newTime, newFacility];

      const newEntry = createNotesObservation(
        groupMembers,
        concept.REFERRAL_NOTES,
        this.props.encounterUuid,
        this.props.patientUuid
      );

      const uuids =
        value === true
          ? pick(this.props, [
              'patientUuid',
              'encounterUuid',
              'episodeUuid',
              'visitUuid',
              'onClose',
            ])
          : pick(this.props, [
              'patientUuid',
              'encounterUuid',
              'episodeUuid',
              'visitUuid',
              'onRefer',
            ]);

      // saves new observation
      this.props.onSubmit(newEntry, uuids);
      this.setState({
        reason: '',
        time: '',
        facility: '',
        hours: '',
        minutes: '',
      });
      this.props.onRefer();
      this.props.onClose();
    }
  };

  render() {
    const { formatMessage } = this.props.intl;

    const sizes = [2, 4, 6];

    const timeField = (
      <div className={styles.topMargin}>
        <VcTimeInput
          hours={this.state.hours}
          minutes={this.state.minutes}
          onHourChange={value => this.handleHourChange(value)}
          onMinuteChange={value => this.handleMinuteChange(value)}
        />
      </div>
    );
    const textField = (
      <VcTextField
        value={this.state.facility}
        label={formatMessage(messages.facilityReferredTo)}
        onChange={value => this.handleFacilityChange(value)}
      />
    );

    const reasonField = (
      <div className={styles.noOverflow}>
        <VcTextField
          value={this.state.reason}
          label={formatMessage(messages.reasonForReferral)}
          multiline
          onChange={value => this.handleReasonChange(value)}
        />
      </div>
    );

    const tabComponents = [timeField, textField, reasonField];

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
          moment(a.timeValue).diff(moment(b.timeValue));
        })
      : Object.values(this.props.patientNotes);

    const rows = [
      <VcCardexNotes
        label={formatMessage(messages.referralSummary)}
        values={sortedNotes}
        editTabsSizes={sizes}
        editTabs={tabComponents}
      />,
    ];

    const buttons = [
      {
        label: formatMessage(messages.returnToCardex),
        type: 'returnToCardex',
        callBack: this.props.onReturn,
      },
      {
        label: formatMessage(messages.referButton),
        type: 'refer',
        callBack: value => this.handleAdd(value),
      },
    ];

    return (
      <ClickAwayListener
        onClickAway={() => {
          if (this.props.open) this.props.onClose();
        }}
      >
        <VcCardexWindow
          title={formatMessage(messages.referPatient)}
          secondaryBackground
          rows={rows}
          buttons={buttons}
          onClose={() => {
            this.handleAdd(true);
            this.props.onClose();
            window.location.reload(true);
          }}
        />
      </ClickAwayListener>
    );
  }
}

VcReferPatient.propTypes = {
  /** Referral Observations */
  patientNotes: PropTypes.arrayOf(PropTypes.shape({})),
  /** callback function to be fired on adding a new note */
  onSubmit: PropTypes.func.isRequired,
  /** Referral encounter uuid if an encounter exists in the current visit */
  encounterUuid: PropTypes.string,
  /** Patient uuid */
  patientUuid: PropTypes.string,
  /** shows if this feature is open */
  open: PropTypes.bool,
  /** call function to be refer */
  onRefer: PropTypes.func,
};

VcReferPatient.defaultProps = {
  patientNotes: [],
  open: false,
};

export default injectIntl(VcReferPatient);
