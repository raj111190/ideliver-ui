import React from 'react';
import styles from './vcDiagnosisDisplay.scss';

/**
 * Component that displays the list of diagnoses for a given patient
 * @param {*} props
 * @author anthony.adams
 */
const VcDiagnosisDisplay = props => {
  const diagnoses = props.value;
  const diagnosisDisplay = diagnoses.join(', ');
  return <div className={styles.diagnosis}> {diagnosisDisplay}</div>;
};

export default VcDiagnosisDisplay;
