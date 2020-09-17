import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import VcTextField from '../vcTextField/vcTextField';
import VcGridColumn from '../vcGrid/vcGridColumn/vcGridColumn';
import VcGridRow from '../vcGrid/vcGridRow/vcGridRow';
import VcGrid from '../vcGrid/vcGrid';
import CrossCircleIcon from '../svgIcon/crossCircleIcon';
import IconButton from '@material-ui/core/IconButton';
import styles from './vcDateTime.scss';
import moment from 'moment-timezone';

import messages from '../../intl/messages';
import { injectIntl } from 'react-intl';
import TimeInput from 'material-ui-time-picker';
import { Typography } from '@material-ui/core';

/**
 * A component to present some data with a label on top
 * @param {*} props
 */
export const longDatetimeFormatWithT = 'YYYY-MM-DD[T]HH:mm:ss.SSSZZ';
export const longDatetimeFormat = 'YYYY-MM-DD HH:mm:ss.SSSZZ';
export const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';
export const datetimeFormatWithoutSeconds = 'YYYY-MM-DD HH:mm';
export const dateFormat = 'YYYY-MM-DD';
export const timeFormat = 'HH:mm:ss';

const VcDateTime = props => {
  const handleDateChange = e => {
    const newDate = e;
    const oldTime = moment(props.value, moment.ISO_8601, true).isValid()
      ? moment(props.value).format(timeFormat)
      : null;
    const timestamp = oldTime
      ? moment(`${newDate} ${oldTime}`, datetimeFormat, true).format(
          longDatetimeFormat
        )
      : moment(`${newDate}`, dateFormat, true).format(longDatetimeFormat);
    moment(timestamp).isValid()
      ? props.onChange(timestamp)
      : props.onChange(null);
  };

  if (props.defaultDate) {
    useEffect(() => {
      props.onChange(props.value);
    }, []);
  }

  const handleTimeChange = e => {
    const values = e.toString().split(' ');
    const newTime = moment(values[4], timeFormat).format(timeFormat);
    const oldDate = moment(props.value, moment.ISO_8601, true).isValid()
      ? moment(props.value).format(dateFormat)
      : null;
    const timestamp = oldDate
      ? moment(`${oldDate} ${newTime}`, datetimeFormat, true).format(
          longDatetimeFormat
        )
      : moment(`${newTime}`, timeFormat, true).format(longDatetimeFormat);
    props.onChange(timestamp);
  };
  const { formatMessage } = props.intl;
  const { datatest } = props;
  return (
    <VcGrid className={props.className}>
      <VcGridRow>
        {props.hasDate ? (
          <VcGridColumn>
            <VcTextField
              datatest={
                props.datatest ? `${props.datatest}-date` : `vital-date`
              }
              vType={formatMessage(messages.date)}
              label={
                props.hasLabel
                  ? `${props.label} ${
                      props.label
                        ? props.label
                            .toLowerCase()
                            .indexOf(formatMessage(messages.date)) > -1
                          ? ''
                          : formatMessage(messages.date)
                        : ''
                    }`
                  : formatMessage(messages.date)
                      .charAt(0)
                      .toUpperCase() + formatMessage(messages.date).slice(1)
              }
              value={
                moment(props.value, moment.ISO_8601, true).isValid()
                  ? moment(`${props.value}`).format(dateFormat)
                  : moment().format(dateFormat)
              }
              className={styles.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDateChange}
              min={
                props.min === 'now' ? moment().format(dateFormat) : props.min
              }
              max={
                props.max === 'now' ? moment().format(dateFormat) : props.max
              }
              helperTextId={props.helperTextId}
              disabled={props.disabled}
            />
          </VcGridColumn>
        ) : null}
        {props.hasTime ? (
          <VcGridColumn
            datatest={props.datatest ? `${props.datatest}-time` : `vital-time`}
            className={
              props.hasDate === false
                ? styles.containerWithMargin
                : styles.container
            }
          >
            {props.label ? (
              <Typography variant="h2">
                {props.hasLabel
                  ? `${props.label} ${formatMessage(messages.time)}`
                  : `${formatMessage(messages.time)}`.charAt(0).toUpperCase() +
                    `${formatMessage(messages.time)}`.slice(1)}
              </Typography>
            ) : null}
            <TimeInput
              datatest={`${props.label} ${formatMessage(messages.time)}-input`}
              autoOk
              mode={
                props.format === 'h24'
                  ? `${formatMessage(messages.h24)}`
                  : `${formatMessage(messages.h12)}`
              }
              label={`${props.label} ${formatMessage(messages.time)}`}
              value={
                moment(props.value, moment.ISO_8601, true).isValid()
                  ? moment(`${props.value}`).toDate()
                  : moment().toDate()
              }
              onChange={time => handleTimeChange(time)}
            />
          </VcGridColumn>
        ) : null}
        {props.hasClear ? (
          <VcGridColumn>
            <IconButton className={styles.icon} onClick={props.onChange}>
              <CrossCircleIcon />
            </IconButton>
          </VcGridColumn>
        ) : null}
      </VcGridRow>
    </VcGrid>
  );
};

VcDateTime.propTypes = {
  /* specify if we need a clear button with this components */
  hasClear: PropTypes.bool,
  /* specify if we need a date field with this components */
  hasDate: PropTypes.bool,
  /* specify if we need a time field with this components */
  hasTime: PropTypes.bool,
  /* specify if we need a label with this components */
  hasLabel: PropTypes.bool,
  /* label of the component */
  label: PropTypes.string,
  /* specify if we need a time format(12h/24h) with this components */
  format: PropTypes.string,
  /* default unix time in the component */
  value: PropTypes.string,
  /* call back function on change */
  onChange: PropTypes.func,
};

VcDateTime.defaultProps = {
  hasDate: true,
  hasTime: true,
  hasLabel: true,
  options: [],
  value: moment()
    .format(longDatetimeFormat)
    .toString(),
  hasClear: false,
  onChange: () => {},
  format: 'h12',
};

export default injectIntl(VcDateTime);
