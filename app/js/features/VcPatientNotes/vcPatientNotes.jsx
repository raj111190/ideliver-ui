import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import cx from 'classnames';
import { pick } from 'lodash';
import {
  VcCardexWindow,
  VcCardexTabs,
  VcButton,
  VcTimeInput,
} from '@vecnacares/vc-ui';
import messages from '../../intl/messages';
import { concept } from '../../uuid';
import VcTextField from '../../components/vcTextField/vcTextField';
import {
  longDatetimeFormat,
  datetimeFormatWithoutSeconds,
} from '../../components/vcDateTime/vcDateTime';
import VcCheckBoxGroup from '../../components/vcCheckBoxGroup/vcCheckBoxGroup';
import {
  createNotesObservation,
  createObservation,
  createVoidedObservation,
  createVoidedNotesObservation,
} from './patientNotesHelpers';
import styles from './vcPatientNotes.scss';

class VcPatientNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: '',
      time: '',
      activeTab: 'All',
      void: {},
      hours: '',
      minutes: '',
    };
  }

  handleNotesChange = value => {
    this.setState({
      notes: value,
    });
  };

  handleTabChange = value => {
    this.setState({
      activeTab: value,
      void: {},
      notes: '',
      time: '',
      hours: '',
      minutes: '',
    });
  };

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
        concept.CARDEX_TIME,
        this.props.encounterUuid,
        this.props.patientUuid,
        '',
        false
      );
      const groupMembers = [newNotes, newTime];
      const newEntry = createNotesObservation(
        groupMembers,
        this.state.activeTab === 'Doctor'
          ? concept.DOCTOR_NOTES
          : concept.NURSE_NOTES,
        this.props.encounterUuid,
        this.props.patientUuid
      );

      const uuids = pick(this.props, [
        'patientUuid',
        'encounterUuid',
        'episodeUuid',
        'visitUuid',
      ]);

      // saves new observation
      this.props.onSubmit(newEntry, uuids);

      // if in edit mode, void the old obseravation
      if (Object.keys(this.state.void).length) {
        const oldNotesUuid = this.state.void.groupMembers.find(
          obs => obs.concept.uuid == concept.NOTES
        ).uuid;

        const oldNotes = createVoidedObservation(
          this.state.void.notesValue,
          concept.NOTES,
          this.props.encounterUuid,
          this.props.patientUuid,
          moment(this.state.void.ObsDatetime).toDate(),
          oldNotesUuid
        );

        const oldTimeUuid = this.state.void.groupMembers.find(
          obs => obs.concept.uuid == concept.CARDEX_TIME
        ).uuid;

        const oldTime = createVoidedObservation(
          moment(this.state.void.timeValue)
            .format(longDatetimeFormat)
            .toString(),
          concept.CARDEX_TIME,
          this.props.encounterUuid,
          this.props.patientUuid,
          moment(this.state.void.ObsDatetime).toDate(),
          oldTimeUuid
        );
        const groupMembers = [oldNotes, oldTime];
        const oldEntry = createVoidedNotesObservation(
          groupMembers,
          this.state.activeTab === 'Doctor'
            ? concept.DOCTOR_NOTES
            : concept.NURSE_NOTES,
          this.props.encounterUuid,
          this.props.patientUuid,
          moment(this.state.void.ObsDatetime).toDate(),
          this.state.void.uuid
        );

        this.props.onSubmit(oldEntry, uuids);
      }

      this.setState({
        notes: '',
        time: '',
        void: {},
        hours: '',
        minutes: '',
      });
    }
  };

  handleEditRow = obs => {
    this.setState({
      notes: obs ? obs.notesValue : '',
      time: obs
        ? moment(obs.timeValue)
            .format(longDatetimeFormat)
            .toString()
        : '',
      hours: moment(obs.timeValue).hours(),
      minutes: moment(obs.timeValue).minutes(),
      void: obs,
    });
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
    const sizes = [2, 9, 3];

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

    const addButton = (
      <VcButton
        value={formatMessage(messages.otherDiagnosisSectionHeader)}
        className={styles.enableButton}
        onClick={value => this.handleAdd(value)}
      />
    );
    const tabComponents = [timeField, textField, addButton];

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

    const tabLabels = [
      formatMessage(messages.nursingCardex),
      formatMessage(messages.doctorNotes),
      formatMessage(messages.allPatientNotes),
    ];
    const cardexTabs = (
      <VcCardexTabs
        onEditRow={obs => this.handleEditRow(obs)}
        editButtonLabel={formatMessage(messages.editButton)}
        values={sortedNotes}
        tabLabels={tabLabels}
        editTabsSizes={sizes}
        editTabs={tabComponents}
        activeTab={this.state.activeTab}
        onTabChange={value => this.handleTabChange(value)}
        activeTab={this.state.activeTab}
      />
    );

    const rows = [cardexTabs];

    const buttons = [
      {
        label: formatMessage(messages.dischargeButton),
        type: 'discharge',
        callBack: this.props.onDischarge,
      },
      {
        label: formatMessage(messages.referButton),
        type: 'refer',
        callBack: this.props.onRefer,
      },
      {
        label: formatMessage(messages.saveNotesButton),
        type: 'save',
        callBack: () => {
          this.handleAdd();
          this.props.onClose();
        },
      },
    ];

    return (
      <ClickAwayListener
        onClickAway={() => {
          if (this.props.open) {
            this.handleAdd();
            this.props.onClose();
          }
        }}
      >
        <VcCardexWindow
          title={formatMessage(messages.patientNotes)}
          rows={rows}
          buttons={buttons}
          onClose={() => {
            this.handleAdd();
            this.props.onClose();
          }}
        />
      </ClickAwayListener>
    );
  }
}

VcPatientNotes.propTypes = {
  /** Visit Note Observations */
  patientNotes: PropTypes.arrayOf(PropTypes.shape({})),
  /** callback function to be fired on adding a new note */
  onSubmit: PropTypes.func.isRequired,
  /** Visit Note encounter uuid if an encounter exists in the current visit */
  encounterUuid: PropTypes.string,
  /** Patient uuid */
  patientUuid: PropTypes.string,
  /** shows if this feature is open */
  open: PropTypes.bool,
};

VcPatientNotes.defaultProps = {
  patientNotes: [],
  open: false,
};

export default injectIntl(VcPatientNotes);
