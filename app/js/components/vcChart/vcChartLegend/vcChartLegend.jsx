import React from 'react';
import { injectIntl } from 'react-intl';
import Proptypes from 'prop-types';
import { Typography } from '@material-ui/core';
import VcGridRow from '../../vcGrid/vcGridRow/vcGridRow';
import messages from '../../../intl/messages';
import styles from './vcChartLegend.scss';
import chartStyles from '../vcChart.scss';
import { chartTypes, contStrOptions } from '../vcChart';

/**
 * Legent to be used by VcChart
 * @param {*} props
 */
const VcChartLegend = props => {
  const { formatMessage } = props.intl;
  if (props.type === chartTypes.FETAL_HEART_RATE) {
    return (
      <VcGridRow className={styles.container}>
        <svg
          className="recharts-surface"
          width="14"
          height="14"
          viewBox="0 0 32 32"
          version="1.1"
        >
          <path
            strokeWidth="4"
            fill="none"
            stroke={chartStyles.seafoam_blue}
            d="M0,16h10.666666666666666
              A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
              H32M21.333333333333332,16
              A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
            className="recharts-legend-icon"
          />
        </svg>
        <Typography>
          {props.payload ? props.payload[0].dataKey : undefined}
        </Typography>
        <svg width={16} height={16}>
          <circle
            cx={8}
            cy={8}
            r="6"
            stroke={chartStyles.seafoam_blue}
            strokeWidth="3.5"
            fill="white"
          />
        </svg>
        <Typography>{formatMessage(messages.normal)}</Typography>
        <svg width={16} height={16}>
          <circle
            cx={8}
            cy={8}
            r="6"
            stroke={chartStyles.tomato}
            strokeWidth="3.5"
            fill="white"
          />
        </svg>
        <Typography>{formatMessage(messages.alert)}</Typography>
        <svg width={16} height={16}>
          <circle
            cx={8}
            cy={8}
            r="6"
            stroke="lightGray"
            strokeWidth="3.5"
            fill="white"
            strokeDasharray="11,8"
            strokeDashoffset="8"
          />
        </svg>
        <Typography>{formatMessage(messages.irregular)}</Typography>
      </VcGridRow>
    );
  }
  return (
    <VcGridRow className={styles.container}>
      <svg
        className="recharts-surface"
        width="14"
        height="14"
        viewBox="0 0 32 32"
        version="1.1"
      >
        <path
          strokeWidth="4"
          fill="none"
          stroke="black"
          d="M0,16h10.666666666666666
              A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
              H32M21.333333333333332,16
              A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
          className="recharts-legend-icon"
        />
      </svg>
      <Typography>
        {props.payload ? props.payload[0].dataKey : undefined}
      </Typography>
      <svg width={16} height={16}>
        <circle
          cx={8}
          cy={8}
          r="6"
          stroke="black"
          strokeWidth={props.type === chartTypes.CONTRACTIONS ? '2' : '3.5'}
          fill="white"
        />
      </svg>
      <Typography>{contStrOptions.MILD}</Typography>
      <svg width={16} height={16}>
        <defs>
          <pattern
            id="pattern-stripe"
            width="12"
            height="3"
            patternUnits="userSpaceOnUse"
          >
            <rect width="12" height="1.5" fill="white" />
            <rect y="1.5" width="12" height="1.5" fill="black" />
          </pattern>
        </defs>
        <circle
          cx={8}
          cy={8}
          r="6"
          stroke="black"
          strokeWidth={props.type === chartTypes.CONTRACTIONS ? '2' : '3.5'}
          fill="url(#pattern-stripe)"
        />
      </svg>
      <Typography>{contStrOptions.MODERATE}</Typography>
      <svg width={16} height={16}>
        <circle
          cx={8}
          cy={8}
          r="6"
          stroke="black"
          strokeWidth={props.type === chartTypes.CONTRACTIONS ? '2' : '3.5'}
          fill="black"
        />
      </svg>
      <Typography>{contStrOptions.STRONG}</Typography>
      {props.topLabelDataKey
        ? [
            <svg width={26} height={26} key={`${props.topLabelDataKey}0`}>
              <g>
                <rect
                  x={0}
                  y={0}
                  rx={20}
                  ry={20}
                  height={20 * 1.3}
                  width={20 * 1.3}
                  fill="lightGray"
                />
              </g>
            </svg>,
            <Typography key={`${props.topLabelDataKey}1`}>
              {props.topLabelDataKey}
            </Typography>,
          ]
        : null}
      {props.bottomLabelDataKey
        ? [
            <svg key={`${props.bottomLabelDataKey}0`} width={40} height={20}>
              <g>
                <rect
                  x={0}
                  y={0}
                  rx={20 * 0.25}
                  ry={20 * 0.25}
                  height={20}
                  width={20 * 2}
                  fill="lightGray"
                />
              </g>
            </svg>,
            <Typography key={`${props.bottomLabelDataKey}1`}>
              {props.bottomLabelDataKey}
            </Typography>,
          ]
        : null}
    </VcGridRow>
  );
};

VcChartLegend.propTypes = {
  /** If set a label will show in the legend with the message defined with the same id */
  topLabelDataKey: Proptypes.string,
  /** If set a label will show in the legend with the message defined with the same id */
  bottomLabelDataKey: Proptypes.string,
};

VcChartLegend.defaultProps = {};

export default injectIntl(VcChartLegend);
