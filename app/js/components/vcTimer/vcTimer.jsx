import React from 'react';
import Proptypes from 'prop-types';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import styles from './vcTimer.scss';
import messages from '../../intl/messages';

export const TIMER_OPTIONS_ENUM = [0, 15, 30, 60, 120];

/**
 * Timer for counting down the time till the next checkup
 * @param {*} props
 */
class VcTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: undefined,
      percentage: undefined,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.updateProgress, this.props.tickLengthInMs);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getInitialPercentage = () => {
    const percentageMapping = {
      120: 100,
      60: 100,
      30: 50,
      15: 25,
      0: 0,
    };

    if (this.props === undefined || this.props.value === undefined) {
      return undefined;
    }

    return percentageMapping[this.props.value];
  };

  updateProgress = () => {
    // Once the bar is full, do not continue to update the progress
    if (
      !(this.state.percentage <= 100 && this.state.percentage >= 0) ||
      this.state.next < -60
    ) {
      return;
    }

    // For times less than 60, the max time starts at 60
    // Otherwise, max time will match start time
    // This starts higher level acuities with a less-full timer
    if (this.state.next > 0) {
      this.setState({
        percentage:
          this.state.next === 1
            ? 0
            : Math.round(
                ((this.state.next - 1) / Math.max(60, this.props.value)) * 100
              ),
        next: this.state.next - 1,
      });
    } else {
      // Once time is over, the circle is "full" of the empty state
      // so it starts counting down
      this.setState({
        percentage: Math.round(((60 + this.state.next - 1) / 60) * 100),
        next: this.state.next - 1,
      });
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const state = this.state || {};
    this.state = {
      next: state.next === undefined ? this.props.value : state.next,
      percentage:
        state.next === undefined
          ? this.getInitialPercentage()
          : state.percentage,
    };
    const radialProgress = cx(styles.radialProgress, {
      [styles.over]: this.state.next < 1,
      [styles.warn]: this.state.next <= 15,
    });

    return (
      <div
        className={radialProgress}
        data-progress={this.state.percentage}
        checkup-msg={formatMessage(messages.nextCheckUp)}
        overdue-msg={formatMessage(messages.overdue)}
      >
        <div className={styles.circle}>
          <div className={styles.shadow} />
          <div className={cx(styles.mask, styles.full)}>
            <div className={styles.fill} />
          </div>
          <div className={cx(styles.mask, styles.half)}>
            <div className={styles.fill} />
            <div className={cx(styles.fill, styles.fix)} />
          </div>
        </div>
        <div className={styles.inset}>
          <div className={styles.percentage}>
            <div className={styles.numbers}>
              <span>
                {this.state.next < -60 ? `>${60}` : Math.abs(this.state.next)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
VcTimer.propTypes = {
  /** amount of units to be counted down from */
  value: Proptypes.oneOf(TIMER_OPTIONS_ENUM).isRequired,
  /** length of one tick in ms */
  tickLengthInMs: Proptypes.number,
};

VcTimer.defaultProps = {
  tickLengthInMs: 60000, // one minute in milliseconds
};

export default injectIntl(VcTimer, { withRef: true });
