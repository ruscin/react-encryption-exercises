/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

export function MyTable(props) {
  const { rows, name } = props;

  return (
    <TableContainer component={Paper}>
      <Table
        className={name}
        aria-label="simple table"
        style={{
          minWidth: "800px",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Tryb</TableCell>
            <TableCell align="center">średnia</TableCell>
            <TableCell align="center">min</TableCell>
            <TableCell align="center">max</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.averageTime}</TableCell>
              <TableCell align="center">{row.min}</TableCell>
              <TableCell align="center">{row.max}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
