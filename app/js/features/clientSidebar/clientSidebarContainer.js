import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import ClientSidebar from './clientSidebar';
import { form } from '../../uuid';
import { getForms } from '../../state/entities/selectors';
import {
  getFormStatus,
  getAllSelectedFormData,
  getAllFormData,
  isSubmitting,
} from '../../state/ui/form/selectors';
import { selectFormAction } from '../../state/ui/form/actions';

const mapStateToProps = state => {
  const forms = getForms(state);
  const formList = forms ? forms.keySeq() : [];
  const formListData = getAllFormData(state);
  const formStatus = state;

  // TODO refactor and move this to a selector once we know forms to menu mapping
  const labors = [
    {
      display: 'Labour Signs',
      status: getFormStatus(state, form.LABOUR_SIGNS_FORM_UUID),
      formId: form.LABOUR_SIGNS_FORM_UUID,
    },
    {
      display: 'Fetus',
      status: getFormStatus(state, form.FETUS_ASSESSMENT_FORM_UUID),
      formId: form.FETUS_ASSESSMENT_FORM_UUID,
    },
    {
      display: 'Quick Check',
      status: getFormStatus(state, form.COMPLAINTS_FORM_UUID),
      formId: form.COMPLAINTS_FORM_UUID,
    },
    {
      display: 'Active Labour',
      status: getFormStatus(state, form.ACTIVE_LABOUR_FORM_UUID),
      formId: form.ACTIVE_LABOUR_FORM_UUID,
    },
    {
      display: 'Labour Summary',
      status: getFormStatus(state, form.LABOUR_SUMMARY_FORM_UUID),
      formId: form.LABOUR_SUMMARY_FORM_UUID,
    },
  ];
  const ancVisits = [
    {
      display: 'ANC Visit',
      status: getFormStatus(state, form.ANC_FORM_UUID),
      formId: form.ANC_FORM_UUID,
    },
    {
      display: 'ANC Summary',
      status: getFormStatus(state, form.ANC_SUMMARY_FORM_UUID),
      formId: form.ANC_SUMMARY_FORM_UUID,
    },
  ];

  const pncVisits = [
    {
      display: 'Post Delivery ',
      status: getFormStatus(state, form.DISCHARGE_FORM_UUID),
      formId: form.DISCHARGE_FORM_UUID,
    },
    {
      display: 'PNC 1',
      status: getFormStatus(state, [form.PNC_FORM_UUID, 0]),
      formId: form.PNC_FORM_UUID,
      formIndex: 0,
    },
  ];
  const menus = [
    {
      display: 'Intake',
      status: getFormStatus(state, form.GENERAL_INFO_FORM_UUID),
      formId: form.GENERAL_INFO_FORM_UUID,
    },
    {
      display: 'History',
      status: getFormStatus(state, form.OB_HISTORY_FORM_UUID),
      formId: form.OB_HISTORY_FORM_UUID,
    },
    {
      display: 'Vitals',
      status: getFormStatus(state, form.VITALS_FORM_UUID),
      formId: form.VITALS_FORM_UUID,
    },
    {
      display: 'ANC',
      childrenMenu: ancVisits,
    },
    {
      display: 'Labour',
      childrenMenu: labors,
    },
    {
      display: 'PNC',
      childrenMenu: pncVisits,
      id: 'pnclist',
    },
  ];

  return {
    menus,
    formList,
    formStatus,
    formListData: formListData,
    submittingForm: isSubmitting(state),
    key: 'clientSidebar',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectForm: (formId, formIndex) => {
      dispatch(selectFormAction(formId, formIndex));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(ClientSidebar));
