import React from 'react';
import { injectIntl } from 'react-intl';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@material-ui/core/Avatar';
import Proptypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import VcDrawer from '../../components/vcDrawer/vcDrawer';
import styles from './mainSidebar.scss';
import VcSidebarButton from '../../components/vcSidebarButton/vcSidebarButton';
import messages from '../../intl/messages';

/**
 * Sidebar component with routes to different parts of the app
 * @param {*} props
 */
const MainSidebar = props => {
  const { formatMessage } = props.intl;

  return (
    <VcDrawer open anchor="left" variant="persistent">
      <NavLink to="/visits">
        <VcSidebarButton
          icon={<img className={styles.icon} src="img/l-o-g-o@3x.png" />}
        />
      </NavLink>
      <NavLink className={styles.navLink} to="/visits">
        <VcSidebarButton
          selected={props.location === '/visits'}
          icon={<img className={styles.icon} src="img/team-icon@3x.png" />}
          iconSelected={
            <img className={styles.icon} src="img/clients-icon@3x.png" />
          }
          label={formatMessage(messages.clients)}
        />
      </NavLink>
      <a
        className={styles.anchor}
        href={`${window.location.origin}/openmrs/referenceapplication/home.page#visits`}
      >
        <Avatar className={styles.avatarHome} color="secondary">
          <HomeIcon dataTest="ideliver-home-icon" fontSize="inherit" />
        </Avatar>
      </a>
    </VcDrawer>
  );
};

MainSidebar.propTypes = {
  /** string that if matched with the route on a button sets its prop selected to true */
  location: Proptypes.string,
};

MainSidebar.defaultProps = {};

export default injectIntl(MainSidebar);
