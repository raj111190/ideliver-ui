import React from 'react';
import Proptypes from 'prop-types';
import {
  LineChart,
  Line,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import VcChartDot from './vcChartDot/vcChartDot';
import VcChartLegend from './vcChartLegend/vcChartLegend';
import VcChartTooltip from './vcChartTooltip/vcChartTooltip';
import VcChartLabel from './vcChartLabel/vcChartLabel';
import styles from './vcChart.scss';

export const chartTypes = {
  FETAL_HEART_RATE: 'Fetal Heart Rate',
  CONTRACTIONS: 'Contractions',
  CONTRACTIONS_STRENGTH: 'Contractions Strength',
  INTERVENTIONS: 'Interventions',
  VITALS: 'Vitals',
  BUBBLE_CHART: 'Bubble Chart',
};

export const contStrOptions = {
  STRONG: 'Strong: more than 40 seconds',
  MODERATE: 'Moderate: 20-40 seconds',
  MILD: 'Mild: less than 20 seconds',
};

/**
 * Chart component to represent array of objects on a line chart
 * @param {*} props
 */
const VcChart = props =>
  props.type !== chartTypes.BUBBLE_CHART ? (
    <ResponsiveContainer width={props.width} height={props.height}>
      <LineChart
        syncId={props.syncId}
        fontFamily="Roboto"
        data={props.value}
        margin={{
          top: 5,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey={props.yDataKey}
          tickFormatter={props.xTickFormatter}
          type="number"
          domain={props.xAxisDomain}
          tickCount={
            props.value.length < 10
              ? props.value.length == 1
                ? 3
                : undefined
              : 10
          }
          interval={0}
        />
        <YAxis
          type="number"
          domain={
            props.yAxisDomain || [
              0,
              props.maxValue ? props.maxValue : `dataMax + ${20}`,
            ]
          }
          scale="linear"
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          content={VcChartTooltip}
          name=""
          separator=""
          labelFormatter={props.xTickFormatter}
        />
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{
            height: '34px',
            lineHeight: '34px',
            marginLeft: '60px',
          }}
          content={
            props.type === chartTypes.FETAL_HEART_RATE ||
            props.type === chartTypes.CONTRACTIONS ? (
              <VcChartLegend
                type={props.type}
                topLabelDataKey={props.topLabelDataKey}
                bottomLabelDataKey={props.bottomLabelDataKey}
              />
            ) : (
              undefined
            )
          }
        />
        <ReferenceLine y={0} stroke="#000" />
        <Brush
          syncId={props.syncId}
          tickFormatter={props.xTickFormatter}
          dataKey={props.yDataKey}
          height={25}
          stroke="#000"
          y={props.height - 25}
        />
        {props.xDataKey.map((key, index) => (
          <Line
            key={key}
            dataKey={key}
            stroke={props.xDataColor[index]}
            strokeWidth={3.5}
            dot={
              <VcChartDot
                minAlertValue={props.minAlertValue}
                maxAlertValue={props.maxAlertValue}
                color={props.xDataColor[index]}
                type={props.type}
              />
            }
            isAnimationActive={false}
          >
            {props.topLabelDataKey ? (
              <LabelList
                dataKey={props.topLabelDataKey}
                position="top"
                content={VcChartLabel}
                colors={props.topLabelColors}
              />
            ) : null}
            {props.bottomLabelDataKey ? (
              <LabelList
                dataKey={props.bottomLabelDataKey}
                position="bottom"
                content={VcChartLabel}
                colors={props.bottomLabelColors}
              />
            ) : null}
          </Line>
        ))}
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <ResponsiveContainer width={props.width} height={90}>
      <ScatterChart
        syncId={props.syncId}
        margin={{
          top: 40,
          right: 50,
          left: 20,
          bottom: props.noXTicks ? 0 : 5,
        }}
      >
        <XAxis
          dataKey={props.yDataKey}
          tickFormatter={props.xTickFormatter}
          type="number"
          domain={props.xAxisDomain}
          tickCount={
            props.value.length < 10
              ? props.value.length == 1
                ? 3
                : undefined
              : 10
          }
          interval={0}
          tickLine={!props.noXTicks}
        />
        <YAxis
          type="number"
          dataKey="const"
          name={props.xDataKey[0]}
          height={10}
          tick={false}
          tickLine={false}
          axisLine={false}
        />
        <ZAxis
          type="number"
          dataKey={props.xDataKey[0]}
          domain={[props.minValue, props.maxValue]}
          range={[props.minValue, props.maxValue]}
        />
        <Scatter
          data={
            props.value && props.yDataKey && props.minYValue && props.maxYValue
              ? [
                  { [props.yDataKey]: props.minYValue },
                  ...props.value,
                  { [props.yDataKey]: props.maxYValue },
                ]
              : props.value
          }
          fill={props.xDataColor[0]}
        >
          <LabelList dataKey={props.xDataKey[0]} position="top" />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );

VcChart.propTypes = {
  /** The array of objects that will be displayed */
  value: Proptypes.array,
  /** Chart height */
  height: Proptypes.oneOfType([Proptypes.number, Proptypes.string]),
  /** Chart Width */
  width: Proptypes.oneOfType([Proptypes.number, Proptypes.string]),
  /** The array of objects that will be displayed */
  minAlertValue: Proptypes.number,
  maxAlertValue: Proptypes.number,
  /** min value for the range of the chart */
  minValue: Proptypes.number,
  /** max value for the range of the chart */
  maxValue: Proptypes.number,
  /** the key that represents the x-coordinate */
  xDataKey: Proptypes.arrayOf(Proptypes.string),
  /** colors array for the lines */
  xDataColor: Proptypes.arrayOf(Proptypes.string),
  /** the key that represents the y-coordinate */
  yDataKey: Proptypes.string,
  /** range for the yAxis */
  yAxisDomain: Proptypes.array,
  /** range for the xAxis */
  xAxisDomain: Proptypes.array,
  /** the key that represents the label above a point */
  topLabelDataKey: Proptypes.string,
  /** the key that represents the label below a point */
  bottomLabelDataKey: Proptypes.string,
  /**
   * object in which the keys are topLabelDataKey values and
   * the values are colors that are to be used for the labels representing them
   */
  topLabelColors: Proptypes.object,
  /**
   * object in which the keys are bottomLabelDataKey values and
   * the values are colors that are to be used for the labels representing them
   */
  bottomLabelColors: Proptypes.object,
  type: Proptypes.oneOf([...Object.values(chartTypes)]),
};

VcChart.defaultProps = {
  height: 300,
  width: '80%',
  xDataColor: [styles.seafoam_blue],
  xDataKey: [],
  value: [],
  xAxisDomain: ['auto', 'auto'],
};

export default VcChart;
