import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import ErrorMessages from './errorMessages';
import { dismissErrorAction } from '../../state/error/actions';
import { getErrorMessages } from '../../state/error/selectors';

const mapStateToProps = state => {
  return {
    errors: getErrorMessages(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dismissError: message => {
      dispatch(dismissErrorAction(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(ErrorMessages));
