import React from 'react';

/**
 * A label to be used by VcChart above and below a dot
 * @param {*} props
 */
const VcChartLabel = props => {
  const { x, y, value, position, colors } = props;
  const height = 20;
  const isTop = position === 'top';
  const cy = isTop ? y - height * 1.5 : y + height * 0.5;
  return value ? (
    <g>
      <rect
        x={isTop ? x - height * 0.65 : x - height}
        y={isTop ? cy - height * 0.4 : cy}
        rx={isTop ? height : height * 0.25}
        ry={isTop ? height : height * 0.25}
        height={isTop ? height * 1.3 : height}
        width={isTop ? height * 1.3 : height * 2}
        fill={colors ? colors[value] : '#8884d8'}
        opacity={0.7}
      />
      <text
        x={x}
        y={isTop ? cy + height * 0.35 : cy + height * 0.6}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  ) : null;
};

VcChartLabel.propTypes = {};

VcChartLabel.defaultProps = {};

export default VcChartLabel;
