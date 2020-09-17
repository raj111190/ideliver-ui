import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { injectIntl } from 'react-intl';
import PlusCircleIcon from '../svgIcon/plusCircleIcon';
import NoteIcon from '../svgIcon/noteIcon';
import CrossCircleIcon from '../svgIcon/crossCircleIcon';
import VcDialog from '../vcDialog/vcDialog';
import VcDiagnosisContainer from '../../features/vcDiagnosis/vcDiagnosisContainer';
import VcDiagnosisCardContent from '../vcDiagnosisCardContent/vcDiagnosisCardContent';
import VcFormContainer from '../../features/vcForm/vcFormContainer';
import { form } from '../../uuid';
import styles from './vcDashboardCard.scss';
import messages from '../../intl/messages';

export const CARD_OPTIONS = {
  POSSIBLE_DIAGNOSIS: 'Possible Diagnosis',
  CONFIRMED_DIAGNOSIS: 'Diagnosis',
  SUMMARY: 'Summary',
};

class VcDashboardCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      open: false,
    };
  }

  /* handles change of circle icon when close icon is clicked */
  handleImageChange = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
      open: true,
    }));
  };

  /* handles close of dialog when close button is clicked */
  handleDialogClose = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
      open: false,
    }));
  };

  /* handles opening of dialog when edit is clicked */
  openEditCommentDialog = () => {
    this.setState({
      open: true,
      expanded: true,
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const header = cx(styles.header, {
      [styles.backgroundColorGreen]:
        this.props.value === CARD_OPTIONS.POSSIBLE_DIAGNOSIS,
      [styles.backgroundColorPurple]:
        this.props.value === CARD_OPTIONS.CONFIRMED_DIAGNOSIS,
      [styles.backgroundColorGrey]: this.props.value === CARD_OPTIONS.SUMMARY,
    });

    /* handles display of dialog component based on state : expanded */
    const displayDialog =
      this.state.expanded === true &&
      this.props.value === CARD_OPTIONS.SUMMARY ? (
        <VcDialog
          title={formatMessage(messages.dialogHeaderSummary)}
          type={this.props.value}
          open={this.state.open}
          onToggle={this.handleDialogClose}
          dialogContent={
            <VcFormContainer
              className={styles.paper}
              location={this.props.location}
              uuid={form.VISIT_SUMMARY_FORM_UUID}
              onSubmit={this.handleDialogClose}
            />
          }
        />
      ) : this.state.expanded === true ? (
        <VcDiagnosisContainer
          type={this.props.value}
          open={this.state.open}
          onToggle={this.handleDialogClose}
          filtersSelected={this.props.filtersSelected}
          filterOptions={this.props.filterOptions}
          onSelection={this.props.onFiltersSelected}
          location={this.props.location}
          encounterUuid={this.props.encounterUuid}
        />
      ) : null;

    return (
      <div>
        <Card className={styles.card}>
          {this.props.value !== CARD_OPTIONS.POSSIBLE_DIAGNOSIS ? (
            <CardHeader
              classes={{
                title: styles.title,
                action: styles.action,
              }}
              title={this.props.title}
              className={header}
              action={
                <IconButton onClick={this.handleImageChange}>
                  {this.state.expanded === false ? (
                    this.props.filterOptions.length > 0 ? (
                      <NoteIcon />
                    ) : (
                      <PlusCircleIcon />
                    )
                  ) : (
                    <CrossCircleIcon />
                  )}
                </IconButton>
              }
            />
          ) : (
            <CardHeader
              classes={{
                title: styles.title,
                action: styles.action,
              }}
              title={this.props.title}
              className={header}
            />
          )}

          {this.props.value === CARD_OPTIONS.SUMMARY ? (
            <VcDiagnosisCardContent
              value={this.props.value}
              filterOptions={this.props.filterOptions}
              editComment={this.openEditCommentDialog}
            />
          ) : (
            <VcDiagnosisCardContent
              value={this.props.value}
              filterOptions={this.props.filterOptions}
              filtersSelected={this.props.filtersSelected}
            />
          )}

          {displayDialog}
        </Card>
      </div>
    );
  }
}

VcDashboardCard.propTypes = {
  /** title of the card */
  title: PropTypes.string.isRequired,
  /** type of the card */
  value: PropTypes.oneOf([
    CARD_OPTIONS.POSSIBLE_DIAGNOSIS,
    CARD_OPTIONS.CONFIRMED_DIAGNOSIS,
    CARD_OPTIONS.SUMMARY,
  ]),
  /** Complete list of options for diagnosis */
  filterOptions: PropTypes.array,
  /** List of diagnosis added */
  filtersSelected: PropTypes.array,
  /** Callback function for when a filter is selected */
  onFiltersSelected: PropTypes.func,
  /** Callback function for when a comment is added */
  onAddComment: PropTypes.func,
};

VcDashboardCard.defaultProps = {
  filtersSelected: [],
  filterOptions: [],
};

export default injectIntl(VcDashboardCard, { withRef: true });
