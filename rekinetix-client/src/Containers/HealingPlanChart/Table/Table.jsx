import React from 'react';
import { useTable, useRowSelect } from 'react-table';
import MaUTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CheckboxCell from './Checkbox/Checkbox';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';

import './Table.css';
import utilities from '../utilities/utilities';

const Table = ({
  columns,
  data,
  addProcedureHandler,
  proceedToDeleteProcedure,
  updateSelectData,
  handleProceed,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      addProcedureHandler,
      proceedToDeleteProcedure,
      updateSelectData,
    },
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <>
              <CheckboxCell {...getToggleAllRowsSelectedProps()} />
            </>
          ),
          Cell: ({ row }) => (
            <>
              {row.original.role === 'PROCEDURE_DATA' && (
                <CheckboxCell {...row.getToggleRowSelectedProps()} />
              )}
            </>
          ),
        },
        ...columns,
      ]);
    },
  );

  const sendDataToAttendance = (rowIds, tableData) => {
    const attendance = utilities.getAttendanceValuesFromTable(
      rowIds,
      tableData,
    );
    handleProceed(attendance);
  };

  return (
    <TableContainer>
      <div className="Table-button-group">
        {Object.keys(selectedRowIds).length > 0 && (
          <Button
            variant="contained"
            onClick={(e) => sendDataToAttendance(selectedRowIds, data)}
          >
            Создать приём
          </Button>
        )}
      </div>
      <MaUTable {...getTableProps()} size="small">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell align="left" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
};

export default Table;
