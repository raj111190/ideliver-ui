import React from 'react';
import Proptypes from 'prop-types';
import { Typography, Popover } from '@material-ui/core';
import { FormattedDate, injectIntl } from 'react-intl';
import CloseIcon from '@material-ui/icons/Close';
import VcGridColumn from '../vcGrid/vcGridColumn/vcGridColumn';
import VcGridRow from '../vcGrid/vcGridRow/vcGridRow';
import styles from './vcQuestionWithDismiss.scss';
import VcButton from '../vcButton/vcButton';
import messages from '../../intl/messages';

class VcQuestionWithDismiss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }
  handleConfirm = () => {
    this.setState({
      anchorEl: null,
    });
    this.props.onToggle();
  };
  handleDismiss = event => {
    event.persist();
    this.setState({
      anchorEl: event.currentTarget,
    });
  };
  handleCancel = event => {
    event.persist();
    this.setState({
      anchorEl: null,
    });
  };
  render() {
    const { formatMessage } = this.props.intl;
    const open = Boolean(this.state.anchorEl);
    const Question = this.props.questionComponent
      ? React.cloneElement(this.props.questionComponent, {
          disabled: this.props.disabled,
        })
      : undefined;

    return (
      <VcGridColumn className={styles.container}>
        {this.props.timestamp && !this.props.disabled ? (
          <Typography variant="h6" color="secondary">
            <FormattedDate
              value={this.props.timestamp}
              month="long"
              day="2-digit"
              hour="2-digit"
              minute="2-digit"
            />
          </Typography>
        ) : null}
        <Typography
          variant="h6"
          color={this.props.disabled ? 'inherit' : 'default'}
        >
          <b>{this.props.label}</b>
        </Typography>
        <VcGridRow className={styles.row}>
          {this.props.questionComponent ? Question : null}
          <CloseIcon
            className={styles.icon}
            onClick={this.handleDismiss}
            disabled={!!this.props.timestamp}
          />
        </VcGridRow>
        <Popover
          open={open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
        >
          <VcGridColumn className={styles.content}>
            <Typography variant="h6">
              <b>
                {this.props.disabled
                  ? formatMessage(messages.restoreTitle)
                  : formatMessage(messages.dismissTitle)}
              </b>
            </Typography>
            <Typography variant="subtitle2">
              {this.props.disabled
                ? formatMessage(messages.restoreMessage)
                : formatMessage(messages.dismissMessage)}
            </Typography>
            <VcGridRow className={styles.buttons}>
              <VcButton
                variant="text"
                color="primary"
                value={formatMessage(messages.cancel)}
                onClick={this.handleCancel}
              />
              <VcButton
                variant="text"
                color="primary"
                onClick={this.handleConfirm}
                value={
                  this.props.disabled
                    ? formatMessage(messages.restore)
                    : formatMessage(messages.dismiss)
                }
              />
            </VcGridRow>
          </VcGridColumn>
        </Popover>
      </VcGridColumn>
    );
  }
}

VcQuestionWithDismiss.propTypes = {
  /** The date and time to be shown at the top */
  timestamp: Proptypes.string,
  /** The label */
  label: Proptypes.string,
  questionComponent: Proptypes.element,
  onToggle: Proptypes.func,
};
VcQuestionWithDismiss.defaultProps = {
  onToggle: () => {},
};

export default injectIntl(VcQuestionWithDismiss, { withRef: true });
