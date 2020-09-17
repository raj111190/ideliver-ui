import React from 'react';
import { injectIntl } from 'react-intl';
import Button from '@material-ui/core/Button';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './vcDialog.scss';
import messages from '../../intl/messages';

const VcDialog = props => {
  const { formatMessage } = props.intl;
  const dialogTitle = cx(styles.dialogTitle, {
    [styles.backgroundColorPurple]: props.type === 'Diagnoses',
    [styles.backgroundColorGrey]: props.type === 'Summary',
  });
  const closeButton = cx(styles.closeButton, {
    [styles.colorWhite]: props.type === 'Diagnoses' || props.type === 'Summary',
  });

  return (
    <div>
      <Dialog classes={{ paper: styles.paper }} open={props.open} keepMounted>
        {props.title ? (
          <DialogTitle className={dialogTitle}>
            <label className={styles.otherLabel}>
              <b>{props.title}</b>
            </label>
            <DialogActions>
              <Button className={closeButton} onClick={props.onToggle}>
                <b> {formatMessage(messages.close)}</b>
              </Button>
            </DialogActions>
          </DialogTitle>
        ) : null}

        {props.dialogContent}

        {props.dialogFooter}
      </Dialog>
    </div>
  );
};

VcDialog.propTypes = {
  /** title of dialog box */
  title: PropTypes.string,
  /** type of dialog box */
  type: PropTypes.oneOf(['Diagnoses', 'Summary']).isRequired,
  /** default state of dialog box */
  open: PropTypes.bool,
  /** Call Back function to toggle state of dialog box */
  onToggle: PropTypes.func,
  /** content to be displayed inside dialog content */
  dialogContent: PropTypes.node,
  /** content to be displayed inside dialog content */
  dialogFooter: PropTypes.node,
};

VcDialog.defaultProps = {
  open: false,
  dialogContent: null,
  dialogFooter: null,
  title: undefined,
};

export default injectIntl(VcDialog);
