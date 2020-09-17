import React from 'react';
import VcFormContainer from '../vcForm/vcFormContainer';
import { injectIntl, FormattedTime, FormattedDate } from 'react-intl';
import messages from '../../intl/messages';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VcButton from '../../components/vcButton/vcButton';
import VcGridRow from '../../components/vcGrid/vcGridRow/vcGridRow';
import styles from './../vitals/vitals.scss';
import VcTable from './../../components/vcTable/vcTable';
import { vitalsTableHeading, form } from '../../uuid';
import moment from 'moment';
import { sortArrayOnLatestEncounter } from './vitalsHelpers';
class Vitals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formDisplayed: false,
      flag: false,
    };
  }
  handleToggle = () => {
    this.setState({
      flag: this.state.flag === false ? true : false,
    });
  };
  handleAddReading = index => {
    const selectedIndex = index !== this.state.formDisplayed ? index : false;
    this.setState(prevState => ({
      formDisplayed: selectedIndex,
    }));
    this.props.selectForm(this.props.uuid, selectedIndex);
  };

  render() {
    const { formatMessage } = this.props.intl;
    let vitalsDataArray = [];
    const flag = false;
    const vitalsTableHandler = false;
    if (
      this.props.uuid === form.VITALS_FORM_UUID &&
      Array.isArray(this.props.data)
    ) {
      this.props.data.forEach(encounter => {
        let obj = {};
        vitalsTableHeading.forEach(heading => {
          if (heading.id === 'encounterDatetime')
            obj[heading.id] =
              encounter[heading.id] != undefined
                ? moment(encounter[heading.id]).format('DD/MM/YYYY hh:mm a')
                : '';
          else
            obj[heading.id] =
              encounter[heading.id] != undefined
                ? encounter[heading.id].value
                : '';
        });
        vitalsDataArray.push(obj);
      });
      sortArrayOnLatestEncounter(vitalsDataArray);
    }
    const vitalsTableData =
      this.state.flag === false ? vitalsDataArray.slice(0, 4) : vitalsDataArray;
    const time = formatMessage(messages.time);
    const tabs =
      this.props.data && this.props.data.length
        ? Object.values(this.props.data)
            .reverse()
            .map((item, index) => (
              <Tab
                key={item.encounterUuid}
                type="primary"
                onClick={() =>
                  this.handleAddReading(this.props.data.length - 1 - index)
                }
                label={
                  item.encounterDatetime
                    ? [
                        <FormattedTime
                          value={item.encounterDatetime}
                          key="time"
                        />,
                        '   ',
                        <FormattedDate
                          value={item.encounterDatetime}
                          key="date"
                          month="2-digit"
                          day="2-digit"
                        />,
                      ]
                    : ''
                }
              />
            ))
        : undefined;
    return (
      <Paper elevation={24} className={styles.paper}>
        <div className={styles.buttonContainer}>
          <VcButton
            color="primary"
            datatest="add-reading-btn"
            onClick={() =>
              this.handleAddReading(
                this.props.data
                  ? !this.props.data[this.props.data.length - 1].lastUpdated
                    ? this.props.data.length - 1
                    : this.props.data.length
                  : 0
              )
            }
            value={formatMessage(messages.addReading)}
          />
        </div>
        {this.props.data && this.props.data.length ? (
          <VcGridRow className={styles.buttonContainer}>
            <AppBar
              position="static"
              color="default"
              className={styles.timeDateHeader}
            >
              <Tabs
                classes={{ root: styles.tabs }}
                value={
                  this.state.formDisplayed === false
                    ? false
                    : this.props.data.length - 1 - this.state.formDisplayed
                }
                onChange={this.handleChange}
                scrollable
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
              >
                {tabs}
              </Tabs>
            </AppBar>
          </VcGridRow>
        ) : null}
        <div classNames={styles.conDivider}>
          {this.state.formDisplayed || this.state.formDisplayed === 0 ? (
            <VcFormContainer
              className={styles.forms}
              location={this.props.location}
              uuid={this.props.uuid}
              index={this.state.formDisplayed}
              onSubmit={() => this.handleAddReading(false)}
            />
          ) : null}
        </div>
        {this.props.uuid === form.VITALS_FORM_UUID && (
          <div className={styles.bgColor}>
            <h2
              className={styles.recordedVitals}
              datatest="recorded-vitals-label"
            >
              {formatMessage(messages.recordedVitals)}
            </h2>
            <VcGridRow className={styles.submitButtonContainer}>
              <VcTable
                color="primary"
                columnData={vitalsTableHeading}
                data={vitalsTableData}
                withPaging={false}
              />
            </VcGridRow>
            <hr />
            <VcGridRow>
              {vitalsTableData.length >= 4 && (
                <div className={styles.showMoreDiv}>
                  <VcButton
                    color="primary"
                    onClick={this.handleToggle}
                    className={styles.showMoreButton}
                  >
                    {this.state.flag === false
                      ? formatMessage(messages.showMore)
                      : formatMessage(messages.showLess)}
                  </VcButton>
                </div>
              )}
            </VcGridRow>
          </div>
        )}
      </Paper>
    );
  }
}
Vitals.propTypes = {};

Vitals.defaultProps = {};
export default injectIntl(Vitals, { withRef: true });
