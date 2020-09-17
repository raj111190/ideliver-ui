import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import VcForm from './vcForm';
import { REST_API_PATHNAME } from '../../paths';
import { concept } from '../../uuid';
import {
  getSelectedFormData,
  getSelectedFormIndex,
  getSelectedFormMetaData,
  getSelectedFormUuid,
  getUuidsFromUrl,
  isSubmitting,
} from '../../state/ui/form/selectors';
import {
  setFormDataAction,
  submitFormAction,
} from '../../state/ui/form/actions';
import {
  getSelectedFormResourceData,
  getSelectedFormResourceIndex,
} from '../../state/ui/formResource/selectors';
import {
  selectFormResourceAction,
  fetchFormResourceAction,
} from '../../state/ui/formResource/actions';

const mapStateToProps = (state, props) => {
  const formData = getSelectedFormData(state);
  const formMetaData = getSelectedFormMetaData(state);
  const formId = getSelectedFormUuid(state);
  const formIndex = getSelectedFormIndex(state);
  const formResourceData = getSelectedFormResourceData(state);
  const nextFormIndex = getSelectedFormResourceIndex(state);
  const pncLocation = props.location.pathname;
  const pncUrlSplit = pncLocation.split('/');

  return {
    metadata: formMetaData,
    data: formData,
    submittingForm: isSubmitting(state),
    pncLocation,
    pncUrlSplit,
    formId,
    formIndex,
    formResourceData,
    nextFormIndex,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { visitId, formId, formIndex } = getUuidsFromUrl(props);
  const encounterPath = [props.uuid ? props.uuid : formId];
  if (props.index != null) {
    encounterPath.push(props.index);
  }
  if (formIndex !== undefined && formIndex !== null) {
    encounterPath.push(formIndex);
  }
  return {
    onSubmit: encounterTypeId => {
      dispatch(
        submitFormAction(
          REST_API_PATHNAME,
          visitId,
          encounterPath,
          encounterTypeId
        )
      );
      if (props.onSubmit) {
        props.onSubmit(encounterPath);
      }
    },
    onChange: (fieldId, data, fieldsToVoid) => {
      dispatch(setFormDataAction([...encounterPath, fieldId], data));
      if (props.onEveryChange && fieldId !== concept.FORM_METADATA) {
        props.onEveryChange(fieldsToVoid);
      }
    },
    selectFormResource: (formId, formIndex) => {
      dispatch(fetchFormResourceAction(REST_API_PATHNAME, formId));
      dispatch(selectFormResourceAction(formId, formIndex));
    },
    onSuccess: () => {
      if (props.onSubmit) {
        props.onSubmit(encounterPath);
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(VcForm));
