import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import Vitals from './vitals';
import { getAllSelectedFormData } from '../../state/ui/form/selectors';
import { selectFormAction } from '../../state/ui/form/actions';

const mapStateToProps = state => {
  const formData = getAllSelectedFormData(state);
  return {
    data: formData,
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
)(withImmutablePropsToJS(Vitals));
