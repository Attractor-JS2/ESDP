import React from 'react';
import { useTable } from 'react-table';
import MaUTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Table = ({ columns, data, addProcedureHandler, proceedToDeleteProcedure, updateSelectData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    addProcedureHandler,
    proceedToDeleteProcedure,
    updateSelectData,
  });

  return (
    <MaUTable {...getTableProps()} size="small" >
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                return <TableCell align="left" {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

export default Table;
