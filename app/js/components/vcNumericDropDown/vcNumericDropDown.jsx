import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Proptypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import messages from '../../intl/messages';
import VcButton from '../vcButton/vcButton';

import styles from './vcNumericDropDown.scss';

/**
 * This component lets the user record the readings for heart rate, Temperature, diastolic etc
 * The component allows add and remove buttons to increment decrement values
 * Also a user can enter values using the keyboard
 * @param {*} props
 */

class VcNumericDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.filters = this.getOptions(
      this.props.start,
      this.props.end,
      this.props.stepSize
    );
  }

  getOptions = (start, end, stepSize) => {
    const options = [];
    for (let i = start; i <= end; i += stepSize) {
      options.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return options;
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      nextProps.stepSize !== this.props.stepSize ||
      nextProps.start !== this.props.start ||
      nextProps.end !== this.props.end
    ) {
      this.filters = this.getOptions(
        nextProps.start,
        nextProps.end,
        nextProps.stepSize
      );
    }
    return true;
  };

  handleClick = value => {
    this.setState({ open: value });
  };

  handleIncrementDecrement = value => {
    let result;
    if (
      value == '+' &&
      this.props.value + this.props.stepSize <= this.props.end
    ) {
      result = this.props.value + this.props.stepSize;
    } else if (
      value == '-' &&
      this.props.value - this.props.stepSize >= this.props.start
    ) {
      result = this.props.value - this.props.stepSize;
    } else {
      result = this.props.value;
    }
    this.props.onChange(result);
  };

  handleChange = e => {
    this.props.onChange(+e.target.value);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.text}>{this.props.title}</div>

        <div className={styles.vcButton}>
          <VcButton
            value={<AddIcon />}
            color="secondary"
            onClick={() => this.handleIncrementDecrement('+')}
          />
        </div>

        <div className={styles.dropdown}>
          <input
            className={styles.input}
            value={this.props.value}
            onChange={this.handleChange}
          />

          <div className={styles.iconButton}>
            <IconButton onClick={() => this.handleClick(true)}>
              <ArrowDropDownIcon />
            </IconButton>
          </div>

          <div className={styles.select}>
            <Select
              open={this.state.open}
              disableUnderline
              onClose={() => this.handleClick(false)}
              onOpen={() => this.handleClick(true)}
              value={this.props.value}
              onChange={this.handleChange}
              inputProps={{
                name: 'value',
                id: 'controlled-open-select',
              }}
            >
              {this.filters}
            </Select>
          </div>
        </div>
        <div className={styles.vcButton}>
          <VcButton
            value={<RemoveIcon />}
            color="secondary"
            onClick={() => this.handleIncrementDecrement('-')}
          />
        </div>
      </div>
    );
  }
}

VcNumericDropDown.propTypes = {
  /** title of component */
  title: Proptypes.string.isRequired,
  /** value of component */
  value: Proptypes.number.isRequired,
  /** stepsize of options */
  stepSize: Proptypes.number,
  /** start point of options */
  start: Proptypes.number,
  /** end point of options */
  end: Proptypes.number,
  /** Call Back function when value changes */
  onChange: Proptypes.func.isRequired,
};

VcNumericDropDown.defaultProps = {
  stepSize: 1,
  start: 0,
  end: 100,
  onChange: () => {},
};

export default VcNumericDropDown;
