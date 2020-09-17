import { connect } from 'react-redux';
import { REST_API_PATHNAME } from '../../paths';
import VcImage from './vcImage';
import { savePatientImageAction } from '../../state/ui/patient/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, props) => ({
  onChange: data => {
    const payload = {
      person: props.personId,
      base64EncodedImage: data,
    };
    dispatch(
      savePatientImageAction(REST_API_PATHNAME, props.personId, payload)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VcImage);
