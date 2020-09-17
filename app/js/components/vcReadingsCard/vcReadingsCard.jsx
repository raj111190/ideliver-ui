import React from 'react';
import { injectIntl } from 'react-intl';
import Proptypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
} from '@material-ui/core';
import VcButton from '../vcButton/vcButton';
import messages from '../../intl/messages';
import styles from './vcReadingsCard.scss';

/**
 * A component to present data and add new entries to them
 * @param {*} props
 */
class VcReadingsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleClick = () => {
    this.setState(
      previousState => ({ open: !previousState.open }),
      () => {}
    );
  };

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Card>
          <CardHeader
            classes={{ action: styles.action }}
            action={
              <VcButton
                onClick={this.handleClick}
                value={formatMessage(messages.addReading)}
              />
            }
            title={this.props.header}
            subheader={this.props.subHeader}
          />
          <Divider className={styles.divider} />
          <CardContent className={styles.content}>
            {this.props.presentationalComponent
              ? this.props.presentationalComponent
              : null}
          </CardContent>
          {this.state.open ? <Divider className={styles.divider} /> : null}
          {this.state.open ? (
            <CardActions>
              {this.props.funcComponent ? this.props.funcComponent : null}
            </CardActions>
          ) : null}
        </Card>
      </div>
    );
  }
}

VcReadingsCard.propTypes = {
  /** Header of the card */
  header: Proptypes.string,
  /** Subheader of the card */
  subHeader: Proptypes.string,
  /** Data to be displayed by the presentational component */
  value: Proptypes.array,
  /** Component to present the data */
  presentationalComponent: Proptypes.node,
  /** Component for adding records to the data */
  funcComponent: Proptypes.node,
};

VcReadingsCard.defaultProps = {
  header: '',
  subHeader: '',
};

export default injectIntl(VcReadingsCard, { withRef: true });
