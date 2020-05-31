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

  const getProcedureFromRow = (title, area) => ({
    procedureName: title,
    procedureArea: area,
    procedureDynamic: 1,
    procedureIsNew: false,
  });

  const attendanceDTO = {
    attendanceDate: new Date().toISOString(),
    patientName: 'Петров Иван Сидорович',
    medicName: 'Сидоров Петр Иванович',
    firstStage: [],
    secondStage: [],
    thirdStage: [],
    fourthStage: [],
    fifthStage: [],
    patientDynamic: 1,
    beforeAttendance: {
      comments: '',
      pain: '5',
    },
    afterAttendance: {
      comments: '',
      pain: '5',
    },
  };

  const getDataByIndexes = (array, indexes) =>
    array.filter((_, id) => indexes.includes(id));

  const mapRowsToAttendance = (rows) =>
    rows.reduce((acc, { stage, rowTitle, procedureArea }) => {
      const newProcedure = getProcedureFromRow(rowTitle, procedureArea);
      acc[stage] = [...acc[stage], newProcedure];
      return acc;
    }, attendanceDTO);

  const sendDataToAttendance = () => {
    const selectedRows = getDataByIndexes(
      data,
      Object.keys(selectedRowIds).map((x) => parseInt(x, 10)),
    );
    const procedureRows = selectedRows.filter(
      ({ purpose }) => purpose && purpose === 'procedureData',
    );
    const attendance = mapRowsToAttendance(procedureRows);
    handleProceed(attendance);
  };

  return (
    <TableContainer>
      <div className="Table-button-group">
        {Object.keys(selectedRowIds).length > 0 && (
          <Button
            variant="contained"
            onClick={sendDataToAttendance}
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
