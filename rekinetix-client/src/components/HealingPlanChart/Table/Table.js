import React from 'react';
import { useTable, useRowSelect } from 'react-table';
import MaUTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CheckboxCell from './Checkbox/Checkbox';
import { TableContainer } from '@material-ui/core';

const Table = ({
  columns,
  data,
  addProcedureHandler,
  proceedToDeleteProcedure,
  updateSelectData,
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
            <div>
              <CheckboxCell {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <CheckboxCell {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  const getDataByIndexes = (array, indexes) =>
    array.filter((_, id) => indexes.includes(id));

  const getSelectedRows = () => {
    console.log(selectedRowIds);
    const selectedRows = getDataByIndexes(
      data,
      Object.keys(selectedRowIds).map((x) => parseInt(x, 10)),
    );
    console.dir(selectedRows);
  };

  return (
    <TableContainer>
      <div>
        <button onClick={getSelectedRows}>Log</button>
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
