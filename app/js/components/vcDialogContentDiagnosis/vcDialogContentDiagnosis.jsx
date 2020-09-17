import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import DiagnosisIcon from '../svgIcon/diagnosisIcon';
import styles from './vcDialogContentDiagnosis.scss';

class VcDialogContentDiagnosis extends React.Component {
  render() {
    const checkbox = cx(styles.checkbox, {
      [styles.backgroundColorSVGGreen]:
        this.props.type === 'Possible Diagnosis',
      [styles.backgroundColorSVGPurple]: this.props.type === 'Diagnosis',
    });

    const label = cx(styles.label, {
      [styles.backgroundColorLabelGreen]:
        this.props.type === 'Possible Diagnosis',
      [styles.backgroundColorLabelPurple]: this.props.type === 'Diagnosis',
    });

    const main = cx({
      [styles.backgroundColorIconGreen]:
        this.props.type === 'Possible Diagnosis',
      [styles.backgroundColorIconPurple]: this.props.type === 'Diagnosis',
    });

    const dialogContent = this.props.filterOptions.map((option, index) => (
      <div
        className={styles.fullRow}
        key={option + index}
        onClick={() => {
          this.props.onSelection(this.props.filterOptions.indexOf(option));
        }}
      >
        <div className={styles.row}>
          <div className={main}>
            <DiagnosisIcon />
          </div>
          <label className={label}>{option}</label>
          <Checkbox
            checked={this.props.filtersSelected.indexOf(index) !== -1}
            className={checkbox}
            color="primary"
          />
          <br />
        </div>
        <Divider light />
      </div>
    ));

    return (
      <div>
        <DialogContent className={styles.dialogContent}>
          {dialogContent}
        </DialogContent>
      </div>
    );
  }
}

VcDialogContentDiagnosis.propTypes = {
  /** type of dialog box */
  type: PropTypes.oneOf(['Diagnosis', 'Possible Diagnosis']).isRequired,
  /** Call Back function when filter selected changes */
  onSelection: PropTypes.func.isRequired,
  /** List of options provided for diagnosis */
  filterOptions: PropTypes.array,
  /** List of options selected */
  filtersSelected: PropTypes.array,
};

VcDialogContentDiagnosis.defaultProps = {
  filterOptions: [],
  filtersSelected: [],
};

export default VcDialogContentDiagnosis;
