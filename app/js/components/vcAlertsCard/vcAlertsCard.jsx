import React from 'react';
import { injectIntl } from 'react-intl';
import Proptypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import messages from '../../intl/messages';
import VcCard from '../vcCard/vcCard';

/**
 * A component to present a list of alert messages
 * @param {*} props
 */

const VcAlertsCard = props => {
  const { formatMessage } = props.intl;
  // map each element in alert list to <ListItem>
  const alerts1 = props.alerts.map(alert => (
    <div key={alert.timestamp}>
      <ListItem button>
        <ListItemText secondary={alert.timestamp} primary={alert.value} />
      </ListItem>
      <Divider />
    </div>
  ));
  return (
    <VcCard
      color="red"
      leftContent={formatMessage(messages.inlineAlerts)}
      rightContent={alerts1}
    />
  );
};

VcAlertsCard.propTypes = {
  /** Array of alerts to be displayed */
  alerts: Proptypes.arrayOf(
    Proptypes.shape({
      /* timestamp of the alert - defined as String */
      timestamp: Proptypes.string,
      /* alert message text - defined as String */
      value: Proptypes.string,
    })
  ),
};

VcAlertsCard.defaultProps = {
  alerts: [],
};

export default injectIntl(VcAlertsCard);
