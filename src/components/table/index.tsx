import React, { PropsWithChildren } from 'react';
import {
  Table,
  Paper,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody
} from '@mui/material';

interface TableProps<T extends Record<string, unknown>> {
  columnsList: { columnName: string; columnTitle: string; renderCell: (item: T) => JSX.Element }[];
  listData: T[];
}
const CustomTable = <T extends Record<string, unknown>>({
  columnsList,
  listData
}: PropsWithChildren<TableProps<T>>) => {
  if (!listData?.length) {
    return <div>No data</div>;
  }
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            {columnsList.map((item) => (
              <TableCell className='table_cell' key={`${item.columnName}`}>
                {item.columnTitle}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map((row, index) => (
            <TableRow key={index}>
              {columnsList.map((col) => (
                <TableCell key={col.columnName}>{col.renderCell(row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
