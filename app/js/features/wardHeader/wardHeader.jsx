import React from 'react';
import Proptypes from 'prop-types';
import { injectIntl } from 'react-intl';
import VcHeader from '../../components/vcHeader/vcHeader';
import messages from '../../intl/messages';

const WardHeader = props => {
  const { formatMessage } = props.intl;

  return (
    <VcHeader
      title={formatMessage(messages.wardHeader)}
      onSearchChange={props.onSearchChange}
      onClose={props.onSearchClose}
      onEnter={props.onEnter}
      searchPlaceholder={formatMessage(messages.wardSearchPlaceholder)}
      searchText={props.searchText}
    ></VcHeader>
  );
};

WardHeader.propTypes = {
  /** (SearchButton specific) The search text */
  searchText: Proptypes.string,
  /** (SearchButton specific) callback called when the search text changes */
  onSearchChange: Proptypes.func,
  /** (SearchButton specific) Callback called when close key (X) is pressed */
  onSearchClose: Proptypes.func,
  /** (SearchButton specific) Callback called when enter key is pressed */
  onEnter: Proptypes.func,
};

WardHeader.defaultProps = {
  searchText: '',
  onSearchClose: () => {},
};

export default injectIntl(WardHeader);
