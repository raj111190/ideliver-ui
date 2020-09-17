import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Map } from 'immutable';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import WardHeader from '../wardHeader/wardHeader';
import styles from './visits.scss';
import VcTable from '../../components/vcTable/vcTable';
import MainSidebar from '../../features/mainSidebar/mainSidebar';
import Tabs from './tabs';
import messages from '../../intl/messages';
import { form } from '../../uuid';
const DEFAULT_FILTERS = {
  acuity: [0, 1, 2, 3, 4],
  status: [0, 1, 2, 3, 4],
};

class Visits extends React.Component {
  constructor(props) {
    super(props);
    const searchText =
      props &&
      props.location &&
      props.location.state &&
      props.location.state.searchText
        ? props.location.state.searchText
        : '';
    this.state = {
      pageLoad: true,
      activeTabs: 'every',
      pageSize: 10,
      pageIndex: 0,
      pageSize: 10,
      data: [],
      pollingInterval: 60000,
      searchText,
      sortKey: 'startDatetime',
      sortOrder: 'desc',
      filters: {
        acuity: {
          labels: ['1', '2', '3', '4', '5'],
          selected: DEFAULT_FILTERS.acuity,
        },
        status: {
          labels: ['Intake', 'ANC', 'PNC', 'Labor', 'Not at clinic'],
          selected: DEFAULT_FILTERS.status,
        },
      },
    };
  }
  componentDidUpdate(props, state) {
    const data =
      this.props && this.props.value && this.props.value.results
        ? this.props.value.results
        : this.state.data;
    if (props.value !== this.props.value) {
      this.props && this.props.value ? this.setState({ data: data }) : null;
    }
  }
  componentDidMount() {
    this.fetchVisits();
    this.props.fetchForms();
    this.props.fetchFormsResource();
    this.visitPoller = setInterval(
      this.fetchVisits,
      this.state.pollingInterval
    );
    this.setDataState = setTimeout(() => {
      const state = Object.assign({}, this.state, {
        data: this.props.value.results,
      });
      this.setState(state);
    }, 2000);

    this.setDataLoader = setTimeout(() => {
      this.setState({ pageLoad: false });
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.visitPoller);
    clearTimeout(this.setDataState);
    clearTimeout(this.setDataLoader);
  }

  filterWardDashBoard = statusLabel => {
    const selectedFilters =
      statusLabel === 'every'
        ? DEFAULT_FILTERS.status
        : [this.state.filters.status.labels.indexOf(statusLabel)];
    const newStateMap = Map(this.state)
      .setIn(['filters', 'status', 'selected'], selectedFilters)
      .setIn(['pageIndex'], 0);
    const newState = newStateMap.toJS();
    this.props.dispatchFetchVisitsAction(newState);
    this.setState(newState);
    this.setState({
      activeTabs: statusLabel,
      pageIndex: 0,
    });
  };

  pageReload = () => {
    window.location.reload(false);
  };

  fetchVisits = () => {
    this.props.dispatchFetchVisitsAction(this.state);
  };

  handleChangePage = (...args) => {
    const state = Object.assign({}, this.state, { pageIndex: args[1] });
    this.props.dispatchFetchVisitsAction(state);
    this.setState(state);
  };

  handleRowsChange = event => {
    const state = Object.assign({}, this.state, {
      pageSize: event.target.value,
      pageIndex: 0,
    });
    this.props.dispatchFetchVisitsAction(state);
    this.setState(state);
  };

  handleEnter = value => {
    const state = Object.assign({}, this.state, { searchText: value.trim() });
    this.props.dispatchFetchVisitsAction(state);
    this.setState(state);
  };

  handleSearchClose = () => {
    const state = Object.assign({}, this.state, { searchText: '' });
    this.props.dispatchFetchVisitsAction(state);
    this.setState(state);
  };

  handleSearchTextChange = event => {
    const state = Object.assign({}, this.state, {
      searchText: event.target.value && event.target.value.trim(),
    });
    this.setState(state);
  };

  handleSort = (sortKey, sortOrder) => {
    const state = Object.assign({}, this.state, { sortKey, sortOrder });
    this.props.dispatchFetchVisitsAction(state);
    this.setState(state);
  };

  handleFilterChange = (filterKey, selectedIndex) => {
    if (this.state.activeTabs === 'every') {
      let selectedFilters = [...this.state.filters[filterKey].selected];
      if (selectedIndex === -1) {
        // select all
        selectedFilters = DEFAULT_FILTERS[filterKey];
      } else if (selectedFilters.indexOf(selectedIndex) !== -1) {
        // use unselected
        selectedFilters = selectedFilters.filter(f => f !== selectedIndex);
      } else {
        // user selected
        selectedFilters = [...selectedFilters, selectedIndex];
      }
      const newStateMap = Map(this.state).setIn(
        ['filters', filterKey, 'selected'],
        selectedFilters
      );
      const newState = newStateMap.toJS();
      this.props.dispatchFetchVisitsAction(newState);
      this.setState(newState);
    }
    return false;
  };
  render() {
    const { formatMessage } = this.props.intl;

    const columnData = [
      {
        id: 'givenName',
        sortable: true,
        numeric: false,
        disablePadding: false,
        label: 'First Name',
      },
      {
        id: 'familyName',
        sortable: true,
        numeric: false,
        disablePadding: false,
        label: 'Last Name',
      },
      {
        id: 'mrn',
        sortable: true,
        numeric: true,
        disablePadding: false,
        label: 'MRN',
      },
      {
        id: 'status',
        sortable: true,
        numeric: false,
        disablePadding: false,
        label: 'Status',
      },
      {
        id: 'acuity',
        sortable: true,
        numeric: true,
        disablePadding: false,
        label: 'Acuity',
      },
      {
        id: 'startDatetime',
        sortable: true,
        numeric: true,
        disablePadding: false,
        label: 'Admission Time',
      },
      {
        id: 'edd',
        sortable: true,
        numeric: true,
        disablePadding: false,
        label: 'Estimated Delivery Date',
      },
      {
        id: 'diagnosis',
        sortable: false,
        numeric: false,
        disablePadding: false,
        label: 'Diagnosis',
      },
    ];
    const progressBar =
      this.props.value.results && this.props.value.results.length > 0 ? null : (
        <LinearProgress />
      );

    return [
      <div>
        {this.state.pageLoad && !this.props.value.totalCount ? (
          <div className={styles.popUp}>
            <img src="img/loading.gif" />
          </div>
        ) : null}
      </div>,
      <MainSidebar location={this.props.location.pathname} key="mainSidebar" />,
      <div key="visits">
        <AppBar className={styles.filterCon} position="static">
          <Tabs
            onLoad={this.pageReload}
            activeTabs={this.state.activeTabs}
            onClick={this.filterWardDashBoard}
            labels={this.state.filters.status.labels}
          />
        </AppBar>

        <WardHeader
          key="wardHeader"
          searchText={this.state.searchText}
          onSearchClose={this.handleSearchClose}
          onSearchChange={this.handleSearchTextChange}
          onEnter={this.handleEnter}
        />
        {progressBar}
        <div key="body" className={styles.container}>
          <VcTable
            onRowClick={(event, visit) => {
              this.props.selectVisit(visit.id, visit.patient);
              this.props.selectForm(form.GENERAL_INFO_FORM_UUID);
              this.props.selectFormResource(form.GENERAL_INFO_FORM_UUID);
              this.props.history.push(
                `/client/${visit.id}/${visit.patient}/${form.GENERAL_INFO_FORM_UUID}`
              );
            }}
            isStatus={this.state.activeTabs}
            filterLabels={this.state.filters.status.labels}
            page={this.state.pageIndex}
            totalCount={this.props.value.totalCount}
            rowsPerPage={this.state.pageSize}
            columnData={columnData}
            data={this.state.data}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleRowsChange}
            order={this.state.sortOrder}
            orderBy={this.state.sortKey}
            onSort={this.handleSort}
            onFilter={this.handleFilterChange}
            dataTest="ideliver-visits-table"
          />
          {this.props.value.totalCount === 0 &&
          this.state.activeTabs === 'every' ? (
            <Typography
              className={styles.results}
              variant="h4"
              color="textSecondary"
            >
              {formatMessage(messages.wardVisitsNoResult)}
            </Typography>
          ) : null}
        </div>
      </div>,
    ];
  }
}

export default withRouter(injectIntl(Visits));
