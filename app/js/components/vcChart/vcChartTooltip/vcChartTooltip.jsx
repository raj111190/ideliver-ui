import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import styles from './vcChartTooltip.scss';
import { chartTypes } from '../vcChart';

/**
 * Custom Tooltip to be used by VcChart that show all the information from the payload
 * @param {*} props
 */
const VcChartTooltip = props => {
  const { active, payload } = props;
  if (active && payload && payload.length > 0) {
    return (
      <Paper elevation={4} className={styles.paper}>
        {Object.keys(payload[0].payload).reduce((filtered, option) => {
          if (
            (payload[0].payload[option] ||
              payload[0].payload[option] === false ||
              payload[0].payload[option] === 0) &&
            option !== chartTypes.INTERVENTIONS &&
            option !== 'const'
          ) {
            filtered.push(
              <Typography key={option} color="textSecondary">
                {`${option.charAt(0).toUpperCase() + option.slice(1)} : ${
                  payload[0].payload[option] === true
                    ? 'Yes'
                    : props.labelFormatter(payload[0].payload[option], option)
                }`}
              </Typography>
            );
          }
          return filtered;
        }, [])}
      </Paper>
    );
  }
  return null;
};

VcChartTooltip.propTypes = {};

VcChartTooltip.defaultProps = {};

export default VcChartTooltip;
