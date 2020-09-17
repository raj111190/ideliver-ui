import React from 'react';

/**
 * Tick to be used by VcChart it shows the labels on the x axis
 * with numbers starting from the second entry and ending one before the last
 * @param {*} props
 */
const VcChartTick = props => {
  const {
    visibleTicksCount,
    verticalAnchor,
    tickFormatter,
    ...textProps
  } = props;
  return (
    <svg>
      <text {...textProps} height="50px">
        <tspan
          x={props.x}
          y={props.y ? props.y + 8 : null}
          fontSize="12"
          fontFamily="Roboto"
        >
          {props.index + 1}
        </tspan>
        <tspan
          x={props.x}
          y={props.y ? props.y + 22 : null}
          fontFamily="Roboto"
        >
          {tickFormatter ? tickFormatter(props.payload.value) : undefined}
        </tspan>
      </text>
    </svg>
  );
};

VcChartTick.propTypes = {};

VcChartTick.defaultProps = {};

export default VcChartTick;
