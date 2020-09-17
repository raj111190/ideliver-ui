import React from 'react';
import { injectIntl } from 'react-intl';
import Proptypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { VcPatientMenu } from '@vecnacares/vc-ui';
import VcDrawer from '../../components/vcDrawer/vcDrawer';
import styles from './clientSidebar.scss';
import VcSidebarButton from '../../components/vcSidebarButton/vcSidebarButton';
import messages from '../../intl/messages';
import { form } from '../../uuid';
import { getUuidsFromUrl } from '../../state/ui/form/selectors';
import { ShowPncFormList } from './clientSidebarHelper';
/**
 * Sidebar component with routes to different parts of the app
 * @param {*} props
 */

export const MENU_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  STARTED: 'STARTED',
  COMPLETED: 'COMPLETED',
};

const ClientSidebar = props => {
  const { menus, formListData } = props;
  const { formatMessage } = props.intl;
  const { visitId, patientId } = getUuidsFromUrl(props);
  const clientId = `${visitId}/${patientId}`;
  const pncDataLength =
    formListData && formListData[form.PNC_FORM_UUID]
      ? formListData[form.PNC_FORM_UUID].length
      : 0;
  const navigateTo = url => {
    props.history.push(url);
  };

  ShowPncFormList(menus, formListData, props.formStatus);

  const onMenuClicked = menu => {
    const { formId, formIndex } = menu;
    const url =
      formIndex === undefined
        ? `/client/${clientId}/${formId}`
        : pncDataLength === undefined
        ? `/client/${clientId}/${formId}/${formIndex}`
        : `/client/${clientId}/${formId}/${formIndex}/${pncDataLength}`;
    props.selectForm(formId, formIndex);
    navigateTo(url);
  };

  return (
    <VcDrawer open anchor="left" variant="persistent">
      <NavLink className={styles.navLink} to="/visits">
        <VcSidebarButton icon={<KeyboardBackspace />} />
      </NavLink>
      <VcPatientMenu menus={menus} onMenuClick={onMenuClicked} />
      {props.formsList.indexOf(form.LAB_RESULTS_FORM_UUID) > -1 ? (
        <NavLink
          className={styles.navLink}
          to={`/client/${clientId}/${form.LAB_RESULTS_FORM_UUID}`}
        >
          <VcSidebarButton
            selected={
              props.location.pathname ===
              `/client/${clientId}/${form.LAB_RESULTS_FORM_UUID}`
            }
            label={formatMessage(messages.labResults)}
            onClick={() => props.selectForm(form.LAB_RESULTS_FORM_UUID)}
          />
        </NavLink>
      ) : null}
      <NavLink
        className={styles.navLink}
        to={`/client/${clientId}/managementPlans`}
      >
        <VcSidebarButton
          selected={
            props.location.pathname === `/client/${clientId}/managementPlans`
          }
          label={formatMessage(messages.managementPlans)}
          onClick={() => props.selectForm('managementPlans')}
        />
      </NavLink>
    </VcDrawer>
  );
};

ClientSidebar.propTypes = {
  /** string that if matched with the route on a button sets its prop selected to true */
  location: Proptypes.object,
  /** string with the id of the client */
  clientId: Proptypes.string,
  /** list of forms to be linked on the sidebar */
  formsList: Proptypes.array,
};

ClientSidebar.defaultProps = {
  formsList: [],
};

export default injectIntl(withRouter(ClientSidebar));
