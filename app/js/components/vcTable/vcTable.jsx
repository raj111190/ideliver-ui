import React from 'react';
import Proptypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import VcTableColumnHeader from '../vcTableColumnHeader/vcTableColumnHeader';
import styles from './vcTable.scss';

/**
 * Table for displaying data used for visits and tasks
 * @param {*} props
 */
const VcTable = props => {
  const {
    columnData,
    data,
    order,
    orderBy,
    rowsPerPage,
    page,
    totalCount,
    onChangePage,
    onChangeRowsPerPage,
    onSort,
    onFilter,
    isStatus,
    filterLabels,
  } = props;

  return (
    <Table className={styles.table}>
      <TableHead>
        <TableRow className={styles.header}>
          {columnData.map(column => (
            <TableCell key={column.id} numeric={column.numeric} padding="none">
              <VcTableColumnHeader
                sortable={column.sortable}
                direction={orderBy === column.id ? order : null}
                filterOptions={column.filterOptions}
                filtersSelected={column.filtersSelected}
                onSort={onSort}
                onFilter={onFilter}
                numeric={column.numeric}
                value={column.id}
                isStatus={isStatus}
                filterLabels={filterLabels}
              >
                {column.label}
              </VcTableColumnHeader>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(n => (
          <TableRow
            hover
            onClick={event => props.onRowClick(event, n)}
            tabIndex={-1}
            key={`${n.id} row`}
          >
            {columnData.map(column => (
              <TableCell
                key={n.id + column.id}
                padding={column.disablePadding ? 'none' : 'default'}
                numeric={column.numeric}
              >
                {n[column.id]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {props.withPaging ? (
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={columnData.length}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 20, 30, 40, 50]}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  );
};

VcTable.propTypes = {
  /** array of records to be displayed in the table */
  data: Proptypes.arrayOf(Proptypes.object),
  /**
   * array of column definitions each with keys:
   * id, sortable, filterOptions, numeric, disablePadding, label
   */
  columnData: Proptypes.arrayOf(Proptypes.object).isRequired,
  /** order for the sorted column */
  order: Proptypes.oneOf(['asc', 'desc']),
  /** id of the column that it is sorted by */
  orderBy: Proptypes.string,
  /** number of rows per page */
  rowsPerPage: Proptypes.oneOf([10, 20, 30, 40, 50]),
  /** page number */
  page: Proptypes.number,
  /** Total count of elements */
  totalCount: Proptypes.number,
  /** callback function for the onChangePage event */
  onChangePage: Proptypes.func,
  /** callback function for the onChangeRowsPerPage event */
  onChangeRowsPerPage: Proptypes.func,
  /** callback function for the onSort event */
  onSort: Proptypes.func,
  /** callback function for the onRowClick event */
  onRowClick: Proptypes.func,
  /** if true shows the footer with pagination */
  withPaging: Proptypes.bool,
  /** callback function for the onFilter event */
  onFilter: Proptypes.func,
  /** for disable and checked the checkbox for parent data flow */
  filterLabels: Proptypes.array,
  /** passing tab name that is clicked */
  isStatus: Proptypes.string,
};

VcTable.defaultProps = {
  data: [],
  filterLabels: [],
  page: 0,
  totalCount: 0,
  rowsPerPage: 10,
  isStatus: 'every',
  onChangePage: () => {},
  onRowClick: () => {},
  withPaging: true,
  onFilter: () => {},
};

export default VcTable;
