import React from 'react';
import { FormattedDate } from 'react-intl';
import Proptypes from 'prop-types';
import cx from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { VcSearchButton } from '@vecnacares/vc-ui';
import styles from './vcHeader.scss';

/**
 * Header component with title and date that renders children within itself
 * @param {*} props
 */
const VcHeader = props => {
  const titleSection = title => {
    if (title) {
      return (
        <Typography variant="h3" color="inherit">
          {title}
        </Typography>
      );
    }
    return null;
  };

  return (
    <AppBar className={cx(styles.header, props.className)} position="static">
      <Toolbar className={styles.title}>
        {titleSection(props.title)}
        <div className={styles.buttons}>
          <VcSearchButton
            onClose={props.onClose}
            onSearchChange={props.onSearchChange}
            onEnter={props.onEnter}
            searchPlaceholder={props.searchPlaceholder}
            value={props.searchText}
            dataTest="ideliver-search-button"
          />
          <FormattedDate
            value={Date.now()}
            weekday="short"
            month="2-digit"
            day="2-digit"
          />
          {props.children}
        </div>
      </Toolbar>
    </AppBar>
  );
};

VcHeader.propTypes = {
  /** String to be shown as title */
  title: Proptypes.string,
  /** (SearchButton specific) The search text */
  searchText: Proptypes.string,
  /** (SearchButton specific) Callback called when close key (X) is pressed */
  onClose: Proptypes.func,
  /** (SearchButton specific) callback called when the search text changes */
  onSearchChange: Proptypes.func,
  /** (SearchButton specific) Callback called when enter key is pressed */
  onEnter: Proptypes.func,
  /** (SearchButton specific) whether should clear and run on enter on timeout */
  searchPlaceholder: Proptypes.string,
};

VcHeader.defaultProps = {
  title: '',
  searchText: '',
  onSearchChange: event => console.log('Implement search', event),
  onEnter: () => {},
  onClose: () => {},
  searchPlaceholder: '',
};

export default VcHeader;
