import React from "react";
import { useTransactionsForAccount } from "./../../data/hooks/useTransactionsForAccount";

export const Transactions = () => {
  const { userTransactions } = useTransactionsForAccount();
  console.log("user transactioons", userTransactions);

  return <div>Transactions </div>;
};
