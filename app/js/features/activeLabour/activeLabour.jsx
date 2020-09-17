import React from 'react';
import Proptypes from 'prop-types';
import { get } from 'lodash';
import { injectIntl, FormattedTime, FormattedDate } from 'react-intl';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VcButton from '../../components/vcButton/vcButton';
import VcFormContainer from '../vcForm/vcFormContainer';
import messages from '../../intl/messages';
import styles from './activeLabour.scss';
import VcGridRow from '../../components/vcGrid/vcGridRow/vcGridRow';
import VcGridColumn from '../../components/vcGrid/vcGridColumn/vcGridColumn';
import VcChart, { chartTypes } from '../../components/vcChart/vcChart';
import { formField, concept } from '../../uuid';
import VcTable from '../../components/vcTable/vcTable';
import { sortArrayOnLatestEncounterDate } from './activeLabourHelpers';
class ActiveLabour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formDisplayed: false,
      formSelected: false,
    };
  }
  handleAddReading = (index, encounterUuid) => {
    const selectedIndex = index !== this.state.formDisplayed ? index : false;
    const findIndexId = encounterUuid
      ? this.props.metaData.findIndex(
          tabEncounter => tabEncounter.encounterUuid === encounterUuid
        )
      : undefined;
    const finalSelectedIndex =
      encounterUuid && findIndexId !== this.state.formDisplayed
        ? findIndexId
        : false;
    const finalFormDisplayedIndex =
      encounterUuid === undefined && index !== this.state.formDisplayed
        ? index
        : finalSelectedIndex;
    this.setState(prevState => ({
      formDisplayed: finalFormDisplayedIndex,
      formSelected: selectedIndex,
    }));
    this.props.selectForm(this.props.uuid, finalFormDisplayedIndex);
  };

  render() {
    const sortedFormData =
      this.props.data && this.props.data.length > 1
        ? sortArrayOnLatestEncounterDate(this.props.data)
        : this.props.data;
    const { formatMessage } = this.props.intl;
    const time = formatMessage(messages.time);
    const fetalHeartRate = formatMessage(messages.fetalHeartRate);
    const liquor = formatMessage(messages.liquor);
    const cervix = formatMessage(messages.cervix);
    const descent = formatMessage(messages.descent);
    const moulding = formatMessage(messages.moulding);
    const progression = formatMessage(messages.progression);
    const contractions = formatMessage(messages.contractions);
    const interventions = formatMessage(messages.interventions);
    const drugName = formatMessage(messages.drugName);
    const drugUnit = formatMessage(messages.drugUnit);
    const drugDosage = formatMessage(messages.drugDosage);
    const contractionsStrength = formatMessage(messages.contractionsStrength);
    const vitals = formatMessage(messages.vitals);
    const pulse = formatMessage(messages.pulse);
    const temperature = formatMessage(messages.temperature);
    const urineVolume = formatMessage(messages.urineVolume);
    const systolicBloodPressure = formatMessage(messages.systolicBloodPressure);
    const diastolicBloodPressure = formatMessage(
      messages.diastolicBloodPressure
    );
    const descentUnits = formatMessage(messages.descentUnits);
    const value = sortedFormData
      ? Object.values(sortedFormData)
          .map(item => ({
            [time]: +moment(item.encounterDatetime).format('x'),
            [fetalHeartRate]: get(item, [
              formField.AL_FETAL_HEART_RATE_UUID,
              'value',
            ]),
            [liquor]: get(
              item,
              [formField.AL_LIQUOR_COLOR_UUID, 'value', 'display'],
              ''
            ).charAt(0),
            [moulding]: get(item, [
              formField.AL_DEGREES_OF_MOULDING_UUID,
              'value',
              'display',
            ]),
            [cervix]: get(item, [formField.AL_CERVIX_UUID, 'value', 'display'])
              ? parseInt(
                  get(item, [formField.AL_CERVIX_UUID, 'value', 'display'])
                )
              : get(item, [formField.AL_CERVIX_UUID, 'value']),
            [descent]: get(item, [
              formField.AL_DESCENT_UUID,
              'value',
              'display',
            ])
              ? parseInt(
                  get(item, [formField.AL_DESCENT_UUID, 'value', 'display'])
                )
              : get(item, [formField.AL_DESCENT_UUID, 'value']),
            [descentUnits]: get(item, [
              formField.AL_DESCENT_UNIT_UUID,
              'value',
              'display',
            ]),
            [contractions]: get(item, [
              formField.AL_CONTRACTIONS_UUID,
              'value',
            ]),
            [contractionsStrength]: get(item, [
              formField.AL_CONTRACTIONS_STRENGTH_UUID,
              'value',
              'display',
            ]),
            [interventions]: get(
              item,
              [formField.AL_INTERVENTIONS_UUID, 'value'],
              []
            ).map(intervention => {
              const result = {
                [time]: moment(item.encounterDatetime).format(
                  'DD/MM/YY hh:mm A'
                ),
              };
              intervention.groupMembers.forEach(member => {
                if (member.concept === concept.DRUG_NAME) {
                  result[drugName] = member.value;
                }
                if (member.concept === concept.DRUG_UNIT) {
                  result[drugUnit] = member.value;
                }
                if (member.concept === concept.DRUG_DOSAGE) {
                  result[drugDosage] = member.value;
                }
              });
              return result;
            }),
            [pulse]: get(item, [formField.AL_PULSE_UUID, 'value']),
            [temperature]: get(item, [formField.AL_TEMPERATURE_UUID, 'value']),
            [urineVolume]: get(item, [formField.AL_URINE_VOLUME_UUID, 'value']),
            [systolicBloodPressure]: get(item, [
              formField.AL_Systolic_Blood_Pressure_UUID,
              'value',
            ]),
            [diastolicBloodPressure]: get(item, [
              formField.AL_Diastolic_Blood_Pressure_UUID,
              'value',
            ]),
            const: 1,
          }))
          .reverse()
      : undefined;
    const tabs =
      sortedFormData && sortedFormData.length
        ? Object.values(sortedFormData)
            .reverse()
            .map((item, index) => (
              <Tab
                key={item.encounterUuid}
                type="primary"
                onClick={() =>
                  this.handleAddReading(
                    sortedFormData.length - 1 - index,
                    item.encounterUuid
                  )
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
            onClick={() =>
              this.handleAddReading(
                this.props.data
                  ? !this.props.data[this.props.data.length - 1].lastUpdated
                    ? this.props.data.length - 1
                    : this.props.data.length
                  : 0,
                undefined
              )
            }
            value={formatMessage(messages.addReading)}
          />
        </div>
        {this.props.data && this.props.data.length ? (
          <VcGridRow className={styles.buttonContainer}>
            <div className={styles.tabsscroll}>
              <AppBar position="static" color="default">
                <Tabs
                  classes={{ root: styles.tabs }}
                  value={
                    this.state.formSelected === false
                      ? false
                      : this.props.data.length - 1 - this.state.formSelected
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
            </div>
          </VcGridRow>
        ) : null}
        {this.state.formDisplayed || this.state.formDisplayed === 0 ? (
          <VcFormContainer
            className={styles.forms}
            location={this.props.location}
            uuid={this.props.uuid}
            index={this.state.formDisplayed}
            onSubmit={() => this.handleAddReading(false)}
          />
        ) : this.props.data && this.props.data.length ? (
          <VcGridColumn>
            {/* Fetal Heart Rate */}
            <div className={styles.chart}>
              <Typography className={styles.label} variant="h3">
                {fetalHeartRate}
              </Typography>
              <VcChart
                type={chartTypes.FETAL_HEART_RATE}
                syncId="anyId"
                width="100%"
                height={500}
                xDataKey={[fetalHeartRate]}
                yDataKey={time}
                xTickFormatter={(value, type) =>
                  !type || type === 'time'
                    ? moment(value).format('DD/MM/YY hh:mm A')
                    : value
                }
                minYValue={
                  value ? +moment(value[0][time], 'x').format('x') : undefined
                }
                maxYValue={
                  value
                    ? +moment(value[value.length - 1][time], 'x').format('x')
                    : undefined
                }
                topLabelDataKey={liquor}
                bottomLabelDataKey={moulding}
                topLabelColors={{
                  C: 'mediumaquamarine',
                  L: 'lightsteelblue',
                  D: 'burlywood',
                  B: 'lightpink',
                }}
                bottomLabelColors={{
                  0: 'mediumaquamarine',
                  '+': 'lightsteelblue',
                  '++': 'burlywood',
                  '+++': 'lightpink',
                }}
                value={value}
                minAlertValue={120}
                maxAlertValue={160}
              />
            </div>
            <Divider />

            {/* Progression */}
            <div className={styles.chart}>
              <Typography className={styles.label} variant="h3">
                {progression}
              </Typography>
              <VcChart
                syncId="anyId"
                width="100%"
                height={500}
                xDataKey={[cervix, descent]}
                xDataColor={['purple', 'gray']}
                yDataKey={time}
                yAxisDomain={[0, 10]}
                xTickFormatter={(value, type) =>
                  !type || type === 'time'
                    ? moment(value).format('DD/MM/YY hh:mm A')
                    : value
                }
                minYValue={
                  value ? +moment(value[0][time], 'x').format('x') : undefined
                }
                maxYValue={
                  value
                    ? +moment(value[value.length - 1][time], 'x').format('x')
                    : undefined
                }
                value={value}
              />
            </div>
            <Divider />

            {/* Contractions */}
            <div className={styles.chart}>
              <Typography className={styles.label} variant="h3">
                {contractions}
              </Typography>
              <VcChart
                type={chartTypes.CONTRACTIONS}
                syncId="anyId"
                width="100%"
                height={500}
                xDataKey={[contractions]}
                xDataColor={['black']}
                yDataKey={time}
                yAxisDomain={[0, 10]}
                xTickFormatter={(value, type) =>
                  !type || type === 'time'
                    ? moment(value).format('DD/MM/YY hh:mm A')
                    : value
                }
                minYValue={
                  value ? +moment(value[0][time], 'x').format('x') : undefined
                }
                maxYValue={
                  value
                    ? +moment(value[value.length - 1][time], 'x').format('x')
                    : undefined
                }
                value={value}
              />
            </div>
            <Divider />

            {/* Interventions */}
            <Typography className={styles.label} variant="h3">
              {interventions}
            </Typography>
            <div className={styles.table}>
              <VcTable
                withPaging={false}
                data={
                  value
                    ? value
                        .reduce((filtered, option) => {
                          if (option[interventions]) {
                            option[interventions].forEach(item => {
                              filtered.push(item);
                              filtered[
                                filtered.indexOf(item)
                              ].id = filtered.indexOf(item);
                            });
                          }
                          return filtered;
                        }, [])
                        .reverse()
                    : undefined
                }
                columnData={[
                  {
                    id: time,
                    sortable: false,
                    numeric: true,
                    disablePadding: false,
                    label: time,
                  },
                  {
                    id: drugDosage,
                    sortable: false,
                    numeric: true,
                    disablePadding: false,
                    label: drugDosage,
                  },
                  {
                    id: drugName,
                    sortable: false,
                    numeric: true,
                    disablePadding: false,
                    label: drugName,
                  },
                  {
                    id: drugUnit,
                    sortable: false,
                    numeric: false,
                    disablePadding: false,
                    label: drugUnit,
                  },
                ]}
              />
            </div>
            <Divider />

            {/* Vitals */}
            <div className={styles.chart}>
              <Typography className={styles.label} variant="h3">
                {vitals}
              </Typography>
              {/* Pulse */}
              <VcChart
                type={chartTypes.VITALS}
                syncId="anyId"
                width="100%"
                height={500}
                xDataKey={[pulse]}
                xDataColor={['black']}
                yDataKey={time}
                xTickFormatter={(value, type) =>
                  !type || type === 'time'
                    ? moment(value).format('DD/MM/YY hh:mm A')
                    : value
                }
                minYValue={
                  value ? +moment(value[0][time], 'x').format('x') : undefined
                }
                maxYValue={
                  value
                    ? +moment(value[value.length - 1][time], 'x').format('x')
                    : undefined
                }
                value={value}
              />
            </div>
            <Divider />

            {/* Temperature */}
            <Typography className={styles.labelVitals} variant="h5">
              {temperature}
            </Typography>
            <VcChart
              noXTicks
              type={chartTypes.BUBBLE_CHART}
              syncId="anyId"
              width="100%"
              height={500}
              xDataKey={[temperature]}
              xDataColor={['red']}
              yDataKey={time}
              xTickFormatter={(value, type) =>
                !type || type === 'time'
                  ? moment(value).format('DD/MM/YY hh:mm A')
                  : value
              }
              minValue={0}
              maxValue={40}
              minYValue={
                value ? +moment(value[0][time], 'x').format('x') : undefined
              }
              maxYValue={
                value
                  ? +moment(value[value.length - 1][time], 'x').format('x')
                  : undefined
              }
              value={value}
            />
            <Divider />

            {/* Urine volume */}
            <Typography className={styles.labelVitals} variant="h5">
              {urineVolume}
            </Typography>
            <VcChart
              type={chartTypes.BUBBLE_CHART}
              syncId="anyId"
              width="100%"
              height={500}
              xDataKey={[urineVolume]}
              xDataColor={['red']}
              yDataKey={time}
              xTickFormatter={(value, type) =>
                !type || type === 'time'
                  ? moment(value).format('DD/MM/YY hh:mm A')
                  : value
              }
              minValue={0}
              maxValue={40}
              minYValue={
                value ? +moment(value[0][time], 'x').format('x') : undefined
              }
              maxYValue={
                value
                  ? +moment(value[value.length - 1][time], 'x').format('x')
                  : undefined
              }
              value={value}
            />

            <Divider />

            {/* systolicBloodPressure */}
            <Typography className={styles.labelVitals} variant="h5">
              {systolicBloodPressure}
            </Typography>
            <VcChart
              type={chartTypes.BUBBLE_CHART}
              syncId="anyId"
              width="100%"
              height={500}
              xDataKey={[systolicBloodPressure]}
              xDataColor={['red']}
              yDataKey={time}
              xTickFormatter={(value, type) =>
                !type || type === 'time'
                  ? moment(value).format('DD/MM/YY hh:mm A')
                  : value
              }
              minValue={70}
              maxValue={200}
              minYValue={
                value ? +moment(value[0][time], 'x').format('x') : undefined
              }
              maxYValue={
                value
                  ? +moment(value[value.length - 1][time], 'x').format('x')
                  : undefined
              }
              value={value}
            />

            <Divider />

            {/* diastolicBloodPressure */}
            <Typography className={styles.labelVitals} variant="h5">
              {diastolicBloodPressure}
            </Typography>
            <VcChart
              type={chartTypes.BUBBLE_CHART}
              syncId="anyId"
              width="100%"
              height={500}
              xDataKey={[diastolicBloodPressure]}
              xDataColor={['red']}
              yDataKey={time}
              xTickFormatter={(value, type) =>
                !type || type === 'time'
                  ? moment(value).format('DD/MM/YY hh:mm A')
                  : value
              }
              minValue={40}
              maxValue={130}
              minYValue={
                value ? +moment(value[0][time], 'x').format('x') : undefined
              }
              maxYValue={
                value
                  ? +moment(value[value.length - 1][time], 'x').format('x')
                  : undefined
              }
              value={value}
            />
          </VcGridColumn>
        ) : null}
      </Paper>
    );
  }
}

ActiveLabour.propTypes = {};

ActiveLabour.defaultProps = {};

export default injectIntl(ActiveLabour, { withRef: true });
