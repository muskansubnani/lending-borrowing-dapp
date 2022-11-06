import React from "react";
import { useTable, useSortBy } from "react-table";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

export const DataTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                userSelect="none"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                <Flex alignItems="center">
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <ChevronDownIcon ml={1} w={4} h={4} />
                    ) : (
                      <ChevronUpIcon ml={1} w={4} h={4} />
                    )
                  ) : (
                    ""
                  )}
                </Flex>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);

          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
