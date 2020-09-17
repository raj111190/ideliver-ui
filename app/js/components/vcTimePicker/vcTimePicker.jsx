import React from 'react';
import TimeKeeper from 'react-timekeeper';
import styles from './vcTimePicker.scss';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import moment from 'moment';
import { injectIntl } from 'react-intl';

class VcTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTimepicker: false,
    };
  }

  toggleTimekeeper = val => {
    this.setState({ displayTimepicker: val });
  };
  handleClose = () => {
    this.setState({ displayTimepicker: false });
  };
  render() {
    const { displayTimepicker } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div ref={ref}>
              <TextField
                label={this.props.label}
                value={this.props.value}
                onClick={() => this.toggleTimekeeper(true)}
                readOnly
              />
            </div>
          )}
        </Reference>
        {displayTimepicker ? (
          <Popper placement="bottom-end" eventsEnabled={open}>
            {({ ref, style, placement }) => (
              <div
                className={styles.popper}
                ref={ref}
                style={style}
                data-placement={placement}
              >
                <ClickAwayListener onClickAway={this.handleClose}>
                  <TimeKeeper
                    time={this.props.value}
                    onChange={this.props.onChange}
                    onDoneClick={() => {
                      this.toggleTimekeeper(false);
                    }}
                    closeOnMinuteSelect
                    config={{
                      TIME_BACKGROUND: styles.lavender,
                      DONE_BUTTON_COLOR: styles.lavender,
                      TIME_DEFAULT_COLOR: styles.white,
                    }}
                    switchToMinuteOnHourSelect
                  />
                </ClickAwayListener>
              </div>
            )}
          </Popper>
        ) : null}
      </Manager>
    );
  }
}

VcTimePicker.propTypes = {
  /* label of the component */
  label: PropTypes.string,
  /* stored time */
  value: PropTypes.string,
  /* call back function */
  onChange: PropTypes.func,
};
VcTimePicker.defaultProps = {
  label: ' ',
  value: moment().format('hh:mm a'),
  onChange: () => {},
};

export default injectIntl(VcTimePicker, { withRef: true });
