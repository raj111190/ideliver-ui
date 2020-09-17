import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { injectIntl } from 'react-intl';
import DiagnosisIcon from '../svgIcon/diagnosisIcon';
import styles from './vcDiagnosisCardContent.scss';
import messages from '../../intl/messages';
import { CARD_OPTIONS } from '../vcDashboardCard/vcDashboardCard';

const VcDiagnosisCardContent = props => {
  const { formatMessage } = props.intl;

  let cardContent;
  if (props.filterOptions.length > 0) {
    cardContent = props.filterOptions.map((content, index) => (
      <p key={index}>{content}</p>
    ));
  } else if (props.value === CARD_OPTIONS.CONFIRMED_DIAGNOSIS) {
    cardContent = formatMessage(messages.cardContentDiagnosis);
  } else if (props.value === CARD_OPTIONS.POSSIBLE_DIAGNOSIS) {
    cardContent = formatMessage(messages.cardContentPossibleDiagnosis);
  } else {
    cardContent = formatMessage(messages.cardContentSummary);
  }

  const main = cx({
    [styles.backgroundColorIconGreen]:
      props.value === CARD_OPTIONS.POSSIBLE_DIAGNOSIS,
    [styles.backgroundColorIconPurple]:
      props.value === CARD_OPTIONS.CONFIRMED_DIAGNOSIS,
  });

  const label = cx(styles.label, {
    [styles.backgroundColorLabelGreen]:
      props.value === CARD_OPTIONS.POSSIBLE_DIAGNOSIS,
    [styles.backgroundColorLabelPurple]:
      props.value === CARD_OPTIONS.CONFIRMED_DIAGNOSIS,
  });

  const getDiagnosisIcon = <DiagnosisIcon />;

  const getOptions = filters =>
    filters.length > 0 ? (
      filters.map((filter, index) => (
        <div className={styles.fullRow} key={index}>
          <div className={styles.row}>
            <div className={main}>
              {props.value === CARD_OPTIONS.SUMMARY
                ? undefined
                : getDiagnosisIcon}
            </div>
            <label
              className={
                props.value === CARD_OPTIONS.SUMMARY
                  ? styles.summaryLabel
                  : label
              }
            >
              {props.value === CARD_OPTIONS.SUMMARY
                ? props.filterOptions
                : props.filterOptions[filter]}
            </label>
            <br />
          </div>
          <Divider className={styles.divider} light />
        </div>
      ))
    ) : (
      <div className={styles.para}>{cardContent}</div>
    );

  return (
    <CardContent className={styles.overflow}>
      {props.value === CARD_OPTIONS.SUMMARY
        ? getOptions(props.filterOptions)
        : getOptions(props.filtersSelected)}
    </CardContent>
  );
};

VcDiagnosisCardContent.propTypes = {
  /** type of the card */
  value: PropTypes.oneOf(['Summary', 'Possible Diagnosis', 'Diagnosis'])
    .isRequired,
  /** List of diagnosis added */
  filtersSelected: PropTypes.array,
  /** Complete list of options for diagnosis */
  filterOptions: PropTypes.array,
  /** callback function when edit button is clicked */
  editComment: PropTypes.func,
};

VcDiagnosisCardContent.defaultProps = {
  filtersSelected: [],
  filterOptions: [],
};

export default injectIntl(VcDiagnosisCardContent);
