import React from 'react';
import Proptypes from 'prop-types';
import styles from '../vcChart.scss';
import { chartTypes, contStrOptions } from '../vcChart';

/**
 * A dot to be used by VcChart
 * @param {*} props
 */
const VcChartDot = props => {
  const {
    cx,
    cy,
    stroke,
    payload,
    value,
    minAlertValue,
    maxAlertValue,
  } = props;

  const backgoundColor = (val, minAlertVal, maxAlertVal) => {
    switch (true) {
      case val >= maxAlertVal:
        return styles.tomato;
      case val <= minAlertVal:
        return styles.tomato;
      default:
        return props.color;
    }
  };

  const fill = () => {
    if (
      props.type === chartTypes.CONTRACTIONS &&
      props.payload &&
      props.payload[chartTypes.CONTRACTIONS_STRENGTH]
    ) {
      switch (props.payload[chartTypes.CONTRACTIONS_STRENGTH]) {
        case contStrOptions.MODERATE:
          return 'url(#pattern-stripe)';
        case contStrOptions.MILD:
          return 'white';
        case contStrOptions.STRONG:
        // Go to default
        default:
          return props.color;
      }
    } else {
      return 'white';
    }
  };
  return value ? (
    <svg x={cx ? cx - 8 : null} y={cy ? cy - 8 : null} width={16} height={16}>
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
        stroke={backgoundColor(value, minAlertValue, maxAlertValue)}
        strokeWidth={props.type === chartTypes.CONTRACTIONS ? '2' : '3.5'}
        fill={fill()}
        strokeDasharray={
          props.payload && props.payload.irregular ? '11,8' : null
        }
        strokeDashoffset={props.payload && props.payload.irregular ? '8' : null}
      />
    </svg>
  ) : null;
};

VcChartDot.propTypes = {
  /** value of the dot */
  value: Proptypes.number,
  /** color of the dot */
  color: Proptypes.string,
  /** if value is <= to minAlertValue the dot will be in the alert color  */
  minAlertValue: Proptypes.number,
  /** if value is >= to maxAlertValue the dot will be in the alert color  */
  maxAlertValue: Proptypes.number,
  /** the whole data object used to get info if the reading is irregular */
  payload: Proptypes.shape({
    payload: Proptypes.shape({ irregular: Proptypes.bool }),
  }),
  /**  */
};

VcChartDot.defaultProps = {};

export default VcChartDot;
