import { connect } from 'react-redux';
import moment from 'moment';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import ClientDashboard from './clientDashboard';
import { REST_API_PATHNAME } from '../../paths';
import { form, visitAttributeType, programs, allForms } from '../../uuid';
import { PATIENT_STATUS } from '../../components/vcPatientStatus/vcPatientStatus';
import { fetchEpisodesAction } from '../../state/ui/episode/actions';
import selectVisitAction from '../visits/actions/selectVisitAction';
import { fetchFormAction, selectFormAction } from '../../state/ui/form/actions';
import { getForms } from '../../state/entities/selectors';
import {
  getSelectedFormUuid,
  getUuidsFromUrl,
  getRiskfactors,
} from '../../state/ui/form/selectors';
import { getProgramStatus } from '../../state/ui/encounter/selectors';
import {
  selectVisitNotesContainerData,
  selectResolvedDiagnoses,
} from '../../state/ui/obs/selectors';
import {
  getActiveVisitData,
  hasVisitEnded,
} from '../../state/ui/visit/selectors';
import { getCurrentPatientUuid } from '../../state/ui/patient/selectors';
import {
  saveVisitAction,
  saveVisitAttributeAction,
} from '../../state/ui/visit/actions';

const ASSESSMENT_ENCOUNTERS = [
  form.GENERAL_INFO_FORM_UUID,
  form.COMPLAINTS_FORM_UUID,
  form.LABOUR_SIGNS_FORM_UUID,
  form.FETUS_ASSESSMENT_FORM_UUID,
  form.MEDICAL_HISTORY_FORM_UUID,
  form.OB_HISTORY_FORM_UUID,
];

/**
 * Returns Patient status based on the form the user filled
 * as described in https://wiki.vecna.com/pages/viewpage.action?spaceKey=VC&title=iDeliver+Phase+2%3A+Patient+Status
 * @param formUuid the form uuid
 * @returns patient status
 */
export const getPatientStatus = formUuid => {
  let patientStatus;
  switch (true) {
    case ASSESSMENT_ENCOUNTERS.includes(formUuid):
      patientStatus = PATIENT_STATUS.ASSESSMENT;
      break;
    case form.ADMISSION_FORM_UUID === formUuid:
      patientStatus = PATIENT_STATUS.ADMITTED;
      break;
    case form.REFERRAL_FORM_UUID === formUuid:
      patientStatus = PATIENT_STATUS.REFERRAL;
      break;
    case form.DISCHARGE_FORM_UUID === formUuid:
      patientStatus = PATIENT_STATUS.DISCHARGED;
      break;
    default:
      patientStatus = null;
  }
  return patientStatus;
};

const mapStateToProps = state => {
  const forms = getForms(state);
  const formKeys = forms ? forms.keySeq() : [];
  const patientUuid = getCurrentPatientUuid(state);
  const patientNotes = selectVisitNotesContainerData(state);

  const activeVisit = getActiveVisitData(state);

  const riskFactors = getRiskfactors(state);
  const programStatus = getProgramStatus(state);

  const resolved = selectResolvedDiagnoses(state);
  const value = state.Visits.getIn(['list']);

  return {
    patientUuid,
    formsList: formKeys,
    selectedFormUuid: getSelectedFormUuid(state),
    patientNotes,
    activeVisit,
    riskFactors,
    resolved,
    hasVisitEnded: hasVisitEnded(state),
    programStatus,
    value,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { visitId, patientId, formId, formIndex } = getUuidsFromUrl(props);
  return {
    fetchEpisodes: () => {
      dispatch(selectVisitAction(visitId, patientId));
      dispatch(
        fetchEpisodesAction(REST_API_PATHNAME, {
          patientUuid: patientId,
          programUuid: programs.PREGNANCY_PROGRAM,
        })
      );
    },
    endVisit: () => {
      const stopDatetime = moment.utc().format();
      const visit = { stopDatetime, uuid: visitId };
      dispatch(saveVisitAction(REST_API_PATHNAME, visit));
    },
    updatePatientStatus: formPath => {
      const formUuid = formPath[0];
      const patientStatus = getPatientStatus(formUuid);
      const payload = {
        attributeType: visitAttributeType.PATIENT_STATUS,
        value: patientStatus,
      };
      dispatch(saveVisitAttributeAction(REST_API_PATHNAME, payload, visitId));
    },
    updateVisitStatus: (visitStatus, attributeUuid) => {
      const payload = {
        attributeType: visitAttributeType.PATIENT_STATUS,
        value: visitStatus,
        uuid: attributeUuid,
      };
      dispatch(saveVisitAttributeAction(REST_API_PATHNAME, payload, visitId));
    },
    fetchForms: () => {
      const formsUuids = Object.values(allForms);
      formsUuids.forEach(uuid => {
        dispatch(fetchFormAction(REST_API_PATHNAME, uuid));
      });
    },
    selectForm: () => {
      dispatch(selectFormAction(formId, formIndex));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(ClientDashboard));
