import React from 'react';
import { injectIntl } from 'react-intl';
import Proptypes from 'prop-types';
import cx from 'classnames';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Manager, Reference, Popper } from 'react-popper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './vcTableColumnHeader.scss';
import messages from '../../intl/messages';

/**
 * Column Header to be used by VcTable allows for sorting and filtering
 * @param {*} props
 */
class VcTableColumnHeader extends React.Component {
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
  isFilterStatus = (status, filter) =>
    status === filter ||
    filter === '1' ||
    filter === '2' ||
    filter === '3' ||
    filter === '4' ||
    filter === '5';
  isChecked = (status, filter) => {
    const { filterLabels } = this.props;
    switch (status) {
      case filterLabels[0]:
        return this.isFilterStatus(status, filter);
      case filterLabels[1]:
        return this.isFilterStatus(status, filter);
      case filterLabels[2]:
        return this.isFilterStatus(status, filter);
      case filterLabels[3]:
        return this.isFilterStatus(status, filter);
    }
  };
  render() {
    const upIcon = cx(styles.icon, {
      [styles.hidden]: this.props.direction && this.props.direction !== 'asc',
      [styles.active]: this.props.direction && this.props.direction === 'asc',
    });

    const downIcon = cx(styles.icon, {
      [styles.hidden]: this.props.direction && this.props.direction !== 'desc',
      [styles.active]: this.props.direction && this.props.direction === 'desc',
    });

    const { formatMessage } = this.props.intl;
    const { open } = this.state;
    const filters = this.props.filterOptions
      ? this.props.filterOptions.map((filter, index) => {
          return (
            <FormControlLabel
              key={filter}
              control={
                <Checkbox
                  disabled={
                    this.props.isStatus === 'every'
                      ? this.isChecked(this.props.isStatus, filter) || false
                      : !this.isChecked(this.props.isStatus, filter)
                  }
                  checked={
                    this.props.isStatus === 'every'
                      ? this.props.filtersSelected.indexOf(index) !== -1
                      : this.isChecked(this.props.isStatus, filter)
                  }
                  onChange={this.props.onFilter.bind(
                    this,
                    this.props.value,
                    this.props.filterOptions.indexOf(filter)
                  )}
                  value={filter}
                  color="primary"
                />
              }
              label={filter}
            />
          );
        })
      : null;

    return (
      <div className={styles.container}>
        {this.props.filterOptions &&
        this.props.filterOptions.length &&
        this.props.filterOptions.length > 0 ? (
          <Manager>
            <Reference>
              {({ ref }) => (
                <div ref={ref}>
                  <Button className={styles.button} onClick={this.handleClick}>
                    {this.props.children}
                  </Button>
                </div>
              )}
            </Reference>
            {open ? (
              <Popper
                modifiers={{ preventOverflow: { boundariesElement: 'window' } }}
                placement="bottom-start"
                eventsEnabled={open}
                positionFixed
              >
                {({ ref, style, placement }) => (
                  <div
                    className={styles.popper}
                    ref={ref}
                    style={style}
                    data-placement={placement}
                  >
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <Grow
                        timeout={300}
                        in={open}
                        style={{ transformOrigin: '0 0 0' }}
                      >
                        <Paper>
                          <FormGroup className={styles.formGroup}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={
                                    this.props.filterOptions.length ===
                                    this.props.filtersSelected.length
                                  }
                                  onChange={this.props.onFilter.bind(
                                    this,
                                    this.props.value,
                                    -1
                                  )}
                                  value="selectAll"
                                  color="secondary"
                                />
                              }
                              label={formatMessage(messages.selectAll)}
                            />
                            {filters}
                          </FormGroup>
                        </Paper>
                      </Grow>
                    </ClickAwayListener>
                  </div>
                )}
              </Popper>
            ) : null}
          </Manager>
        ) : (
          <Button className={styles.button} onClick={this.handleClick} disabled>
            {this.props.children}
          </Button>
        )}

        {this.props.sortable ? (
          <Button
            className={styles.sortIcons}
            onClick={() =>
              this.props.onSort(
                this.props.value,
                this.props.direction === 'asc' ? 'desc' : 'asc'
              )
            }
          >
            <ArrowDropUp className={upIcon} />
            <ArrowDropDown className={downIcon} />
          </Button>
        ) : null}
      </div>
    );
  }
}

VcTableColumnHeader.propTypes = {
  /** string to be shown as header */
  value: Proptypes.string,
  /** boolean to show if the column is sortable and if arrows should be shown */
  sortable: Proptypes.bool,
  /** direction of the sort */
  direction: Proptypes.oneOf(['asc', 'desc']),
  /** callback function to be fired on clicking the sort icon */
  onSort: Proptypes.func,
  /** options for the filter */
  filterOptions: Proptypes.array,
  /** filter that have been selected */
  filtersSelected: Proptypes.array,
  /** callback function to be fired onFilter */
  onFilter: Proptypes.func,
  /** for disable and checked the checkbox for parent data flow */
  filterLabels: Proptypes.array,
  /** passing tab name that is clicked */
  isStatus: Proptypes.string,
};

VcTableColumnHeader.defaultProps = {
  onFilter: (i, y) =>
    console.log(
      'Trying to filter by index ',
      y,
      '. Provide onFilter function to table header with value: ',
      i
    ),
  onSort: i =>
    console.log('Provide onSort function to table header with value: ', i),
  isStatus: 'every',
  filterOptions: [],
  filtersSelected: [],
  filterLabels: [],
};

export default injectIntl(VcTableColumnHeader, { withRef: true });
