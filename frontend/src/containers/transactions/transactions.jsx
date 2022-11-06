import React, { useMemo } from "react";
import { useTransactionsForAccount } from "./../../data/hooks/useTransactionsForAccount";
import { DataTable } from "./../../components/table/dataTable";
export const Transactions = () => {
  const { userTransactions } = useTransactionsForAccount();

  const columns = useMemo(
    () => [
      {
        Header: "Transactions",
        columns: [
          {
            Header: "Hash",
            accessor: "hash",
          },
          {
            Header: "Value",
            accessor: "value",
          },
          {
            Header: "Asset",
            accessor: "asset",
          },
          {
            Header: "Category",
            accessor: "category",
          },
        ],
      },
    ],
    []
  );

  return (
    userTransactions && (
      <DataTable columns={columns} data={[...userTransactions]} />
    )
  );
};
