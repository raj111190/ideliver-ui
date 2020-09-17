import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import cx from 'classnames';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { pick } from 'lodash';
import { VcCardexWindow, VcCardexNotes, VcTimeInput } from '@vecnacares/vc-ui';
import messages from '../../intl/messages';
import { concept } from '../../uuid';
import VcTextField from '../../components/vcTextField/vcTextField';
import VcCheckBoxGroup from '../../components/vcCheckBoxGroup/vcCheckBoxGroup';
import {
  longDatetimeFormat,
  datetimeFormatWithoutSeconds,
} from '../../components/vcDateTime/vcDateTime';
import {
  createNotesObservation,
  createObservation,
} from '../VcPatientNotes/patientNotesHelpers';
import styles from './vcDischargePatient.scss';

class VcDischargePatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: '',
      time: '',
      hours: '',
      minutes: '',
    };
  }

  handleHourChange = value => {
    let time = '';
    if (this.state.minutes != '') {
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
    if (this.state.hours != '') {
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

  handleNotesChange = value => {
    this.setState({
      notes: value,
    });
  };

  handleAdd = value => {
    if (this.state.notes.trim().length > 0 && this.state.time != '') {
      const newNotes = createObservation(
        this.state.notes.trim(),
        concept.NOTES,
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
        concept.DISCHARGE_TIME,
        this.props.encounterUuid,
        this.props.patientUuid,
        '',
        false
      );

      const groupMembers = [newNotes, newTime];
      const newEntry = createNotesObservation(
        groupMembers,
        concept.DISCHARGE_NOTES,
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
              'onDischarge',
            ]);

      // saves new observation
      this.props.onSubmit(newEntry, uuids);
      this.setState({
        notes: '',
        time: '',
        hours: '',
        minutes: '',
      });
      this.props.onDischarge();
      this.props.onClose();
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    // Temporarily displays this option, untill ANC/PNC form
    const options = [
      {
        uuid: '12345678TEST',
        display: formatMessage(messages.completedLaborAndDelivery),
      },
    ];
    const laborSummary = (
      <div className={styles.laborSummary}>
        <VcCheckBoxGroup
          options={options}
          onChange={result => {
            // needs to be saved once ANC/PNC forms are built
            console.log(result);
          }}
        />
        <Typography>
          {/* include href=link in Link tag once labor summary form is completed */}
          <Link>{formatMessage(messages.laborSummaryLink)}</Link>
        </Typography>
      </div>
    );
    const sizes = [1, 6];
    const timeField = (
      <VcTimeInput
        hours={this.state.hours}
        minutes={this.state.minutes}
        onHourChange={value => this.handleHourChange(value)}
        onMinuteChange={value => this.handleMinuteChange(value)}
      />
    );
    const textField = (
      <VcTextField
        value={this.state.notes}
        onChange={value => this.handleNotesChange(value)}
      />
    );
    const tabComponents = [timeField, textField];

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

    const cardexNotes = (
      <VcCardexNotes
        label={formatMessage(messages.dischargeSummary)}
        values={sortedNotes}
        editTabsSizes={sizes}
        editTabs={tabComponents}
      />
    );
    const rows = [laborSummary, cardexNotes];
    const buttons = [
      {
        label: formatMessage(messages.returnToCardex),
        type: 'returnToCardex',
        callBack: this.props.onReturn,
      },
      {
        label: formatMessage(messages.dischargeButton),
        type: 'discharge',
        callBack: value => this.handleAdd(value),
      },
    ];
    return (
      <ClickAwayListener
        onClickAway={() => {
          if (this.props.open) {
            this.props.onClose();
          }
        }}
      >
        <VcCardexWindow
          title={formatMessage(messages.dischargePatient)}
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

VcDischargePatient.propTypes = {
  /** Discharge Patient Observations */
  patientNotes: PropTypes.arrayOf(PropTypes.shape({})),
  /** callback function to be fired on adding a new note */
  onSubmit: PropTypes.func.isRequired,
  /** Discharge encounter uuid if an encounter exists in the current visit */
  encounterUuid: PropTypes.string,
  /** Patient uuid */
  patientUuid: PropTypes.string,
  /** shows if this feature is open */
  open: PropTypes.bool,
};

VcDischargePatient.defaultProps = {
  patientNotes: [],
  open: false,
};

export default injectIntl(VcDischargePatient);
