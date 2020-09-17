import React from 'react';
import { injectIntl } from 'react-intl';
import Proptypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import { Manager, Reference, Popper } from 'react-popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import Badge from '@material-ui/core/Badge';
import styles from './vcAlertsButton.scss';
import messages from '../../intl/messages';
/**
 * A button with a dropdown list of alerts
 * @param {*} props
 */
class VcAlertsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  // When changing state based on the previous one use a function that gets the previous state and
  // if an action is needed after the state change put that in a callback func as second param
  handleClick = () => {
    this.setState(
      previousState => ({ open: !previousState.open }),
      () => {}
    );
  };

  handleClose = () => {
    if (!this.state.open) {
      return;
    }

    // setTimeout to ensure a close event comes after a target click event
    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    });
  };
  renderWithBadge() {
    const { formatMessage } = this.props.intl;
    const { open } = this.state;

    const alerts = this.props.alerts.map(alert => (
      <MenuItem key={alert.value}>{alert.value}</MenuItem>
    ));

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div ref={ref}>
              <Badge badgeContent={this.props.alerts.length} color="secondary">
                <Avatar onClick={this.handleClick} className={styles.avatar}>
                  <NotificationsNone />
                </Avatar>
              </Badge>
            </div>
          )}
        </Reference>
        {open ? (
          <Popper placement="bottom-end" eventsEnabled={open}>
            {({ ref, style, placement }) => (
              <div
                className={styles.popper}
                ref={ref}
                style={style}
                data-placement={placement}
              >
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Grow
                    timeout={400}
                    in={open}
                    style={{ transformOrigin: '0 0 0' }}
                  >
                    <Paper className={styles.paper}>
                      <div className={styles.title}>
                        <div>{formatMessage(messages.wardAlerts)}</div>
                        <div className={styles.redDot}>
                          {this.props.alerts.length}{' '}
                        </div>
                      </div>
                      <MenuList role="menu">{alerts}</MenuList>
                    </Paper>
                  </Grow>
                </ClickAwayListener>
              </div>
            )}
          </Popper>
        ) : null}
      </Manager>
    );
  }

  renderWithoutBadge() {
    const { formatMessage } = this.props.intl;
    const { open } = this.state;
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div ref={ref}>
              <Avatar onClick={this.handleClick} className={styles.avatar}>
                <NotificationsNone />
              </Avatar>
            </div>
          )}
        </Reference>
        {open ? (
          <Popper placement="bottom-end" eventsEnabled={open}>
            {({ ref, style, placement }) => (
              <div
                className={styles.popper}
                ref={ref}
                style={style}
                data-placement={placement}
              >
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Grow
                    timeout={400}
                    in={open}
                    style={{ transformOrigin: '0 0 0' }}
                  >
                    <Paper className={styles.paper}>
                      <div className={styles.title}>
                        <div>{formatMessage(messages.wardAlerts)}</div>
                      </div>
                    </Paper>
                  </Grow>
                </ClickAwayListener>
              </div>
            )}
          </Popper>
        ) : null}
      </Manager>
    );
  }
  render() {
    return this.props.alerts.length > 0
      ? this.renderWithBadge()
      : this.renderWithoutBadge();
  }
}

VcAlertsButton.propTypes = {
  /** Array of alerts to be displayed */
  alerts: Proptypes.arrayOf(
    Proptypes.shape({
      patienName: Proptypes.string,
      patientId: Proptypes.string,
      value: Proptypes.string,
    })
  ),
};

VcAlertsButton.defaultProps = {
  alerts: [],
};

export default injectIntl(VcAlertsButton, { withRef: true });
