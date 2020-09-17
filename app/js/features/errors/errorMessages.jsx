import React from 'react';
import PropTypes from 'prop-types';
import { VcNotification } from '@vecnacares/vc-ui';
import styles from './errorMessages.scss';

const ErrorMessages = props => {
  const { errors, dismissError } = props;
  const getMessage = error => {
    return (
      <span className={styles.errorMessages}>
        <span className={styles.errorMessage}>{error.errorMessage}</span>
        {error.errorDescription && error.errorDescription.length ? (
          <span className={styles.errorDetail}>{error.errorDescription}</span>
        ) : null}
      </span>
    );
  };

  return errors.map(error => {
    return (
      <VcNotification
        open={!!error}
        message={getMessage(error)}
        variant="error"
        onClose={() => dismissError(error)}
        autoHideDuration={null}
      />
    );
  });
};

ErrorMessages.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({})),
  dismissError: PropTypes.func.isRequired,
};

export default ErrorMessages;
