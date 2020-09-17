import React from 'react';
import moment from 'moment';
import Proptypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormControl, FormHelperText } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import cx from 'classnames';
import styles from './vcTextField.scss';
import messages from '../../intl/messages';
import VcGrid from '../vcGrid/vcGrid';
import VcGridRow from '../vcGrid/vcGridRow/vcGridRow';

/**
 * Button component to be used for all standard buttons
 * @param {*} props
 */
class VcTextField extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return {
      value: state.isDirty ? state.value : props.value,
      isDirty: state.isDirty,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value.display || props.value : undefined,
      isDirty: false,
      hasError: false,
      errorMessage: '',
      hasWarning: false,
    };
  }
  handleChange = e => {
    const { formatMessage } = this.props.intl;
    let hasError = false;
    let hasWarning = false;
    let dateFormate = 'DD-MM-YYYY';
    let errorMessage = '';
    let currentYear = new Date().getFullYear();
    if (e.target.value) {
      if (this.props.pattern) {
        const regex = RegExp(this.props.pattern);
        if (!regex.test(e.target.value)) {
          hasError = true;
          errorMessage = formatMessage(
            this.props.errorMsgId
              ? messages[this.props.errorMsgId]
              : messages.invalidFormatErrorMessage
          );
        }
      }
      if (this.props.maxCurrentYear) {
        if (+e.target.value > currentYear) {
          hasError = true;
          errorMessage = `${formatMessage(messages.invalidCurrentYear)}`;
        }
      }
      if (this.props.min !== undefined || this.props.max !== undefined) {
        if (this.props.vType === 'date') {
          if (
            this.props.min &&
            moment(e.target.value) < moment(this.props.min)
          ) {
            hasError = true;
            errorMessage = `${formatMessage(
              messages.invalidValueMore
            )} ${moment(this.props.min).format(dateFormate)}`;
          } else if (
            this.props.max &&
            moment(e.target.value) > moment(this.props.max)
          ) {
            hasError = true;
            errorMessage = `${formatMessage(
              messages.invalidValueLess
            )} ${moment(this.props.max).format(dateFormate)}`;
          }
        } else if (+e.target.value < this.props.min) {
          hasError = true;
          errorMessage = `${formatMessage(messages.invalidValueMore)} ${
            this.props.min
          }`;
        } else if (this.props.max && +e.target.value > this.props.max) {
          hasError = true;
          errorMessage = `${formatMessage(messages.invalidValueLess)} ${
            this.props.max
          }`;
        }
      }

      if (
        this.props.warnMin !== undefined ||
        this.props.warnMax !== undefined
      ) {
        if (this.props.vType === 'number') {
          if (
            (this.props.warnMin && +e.target.value < this.props.warnMin) ||
            (this.props.warnMax && +e.target.value > this.props.warnMax)
          ) {
            hasWarning = true;
          }
        }
      }
    }
    this.setState({
      value: e.target.value,
      isDirty: true,
      hasError,
      errorMessage,
      hasWarning,
    });
  };
  keyDown = e => {
    if (
      this.props.vType == 'number' &&
      (e.keyCode == '69' ||
        e.keyCode == '187' ||
        e.keyCode == '189' ||
        e.keyCode == '13' ||
        e.keyCode == '109')
    )
      e.preventDefault();
  };
  handleBlur = () => {
    if (this.state.isDirty) {
      if (!this.state.hasError) {
        this.props.onChange(
          this.props.vType === 'number'
            ? +this.state.value
            : this.state.value.toString()
        );
        this.setState({ isDirty: false });
      } else {
        this.setState({
          value:
            this.props.vType === 'date' ? this.props.min || this.props.max : '',
          isDirty: false,
          hasError: false,
        });
        this.props.onChange(
          this.props.vType === 'date' ? this.props.min || this.props.max : ''
        );
      }
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { datatest } = this.props;
    return (
      <div className={this.props.className}>
        <VcGridRow>
          <FormControl
            error={this.state.hasError || this.state.hasWarning}
            fullWidth
            className={cx(styles.formControl, styles[this.props.customClass])}
          >
            <TextField
              datatest={datatest}
              onKeyDown={this.keyDown}
              required={this.props.required}
              className={styles[this.props.customClass]}
              rowsMax={this.props.multiline ? 20 : undefined}
              error={this.state.hasError || this.props.error}
              type={this.props.vType}
              label={this.props.label}
              multiline={this.props.multiline}
              value={
                this.state.value
                  ? this.props.vType === 'number'
                    ? +this.state.value
                    : this.state.value.toString()
                  : ''
              }
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              inputProps={{
                min: this.props.min,
                max: this.props.max,
                maxLength: this.props.maxLength,
                pattern: this.props.pattern,
                step: this.props.step,
              }}
              InputProps={{
                endAdornment: this.props.tail ? (
                  <InputAdornment position="end">
                    {this.props.tail}
                  </InputAdornment>
                ) : (
                  undefined
                ),
                startAdornment: this.props.head ? (
                  <InputAdornment position="start">
                    {this.props.head}
                  </InputAdornment>
                ) : (
                  undefined
                ),
                readOnly: this.props.readOnly,
              }}
              disabled={this.props.disabled}
            />
            {this.props.helperTextId ||
            this.state.hasError ||
            this.state.hasWarning ? (
              <FormHelperText>
                {this.state.errorMessage
                  ? this.state.errorMessage
                  : this.props.warnMsgId
                  ? formatMessage(messages[this.props.warnMsgId])
                  : this.props.helperTextId === 'calcGestationalAge'
                  ? `${formatMessage(
                      messages[this.props.helperTextId]
                    )} ${moment().diff(moment(this.state.value), 'week')}`
                  : formatMessage(messages[this.props.helperTextId])}
                {}
              </FormHelperText>
            ) : null}
          </FormControl>
          {this.state.value && this.props.children ? this.props.children : null}
        </VcGridRow>
      </div>
    );
  }
}
VcTextField.propTypes = {
  /** value to be displayed in the text field */
  value: Proptypes.oneOfType([Proptypes.number, Proptypes.string]),
  /** type of values to be entered - text/number */
  vType: Proptypes.oneOf(['text', 'number', 'date']),
  /** label to be displayed in the text field */
  label: Proptypes.string,
  /** text at the end of the field - used to specify units */
  tail: Proptypes.string,
  /** text/icon at the start of the field - passed as a node */
  head: Proptypes.node,
  /** text below the input field - used to show errors/ description of the field */
  helperText: Proptypes.string,
  /** max number of characters allowed in the text field area */
  maxLength: Proptypes.number,
  /** Call Back function when value changes */
  onChange: Proptypes.func.isRequired,
  /** regex pattern */
  pattern: Proptypes.string,
  /** className to be set on the container */
  className: Proptypes.string,
  /** If true, a textarea element will be rendered instead of an input. */
  multiline: Proptypes.bool,
  /** used to specify number of decimal digits allowed */
  step: Proptypes.string,
  /** used to specify read-only text fields */
  readOnly: Proptypes.bool,
  /** min value for warning messages */
  warnMin: Proptypes.number,
  /** max value for warning messages */
  warnMax: Proptypes.number,
  /** contains the error message id */
  errorMsgId: Proptypes.string,
  /** contains the warning message id */
  warnMsgId: Proptypes.string,
  /** used to specify value for max current year */
  maxCurrentYear: Proptypes.bool,
};

VcTextField.defaultProps = {
  value: '',
  maxLength: 200,
  label: '',
  vType: 'text',
  onChange: () => {},
  step: '1',
  readOnly: false,
  maxCurrentYear: false,
};

export default injectIntl(VcTextField);
