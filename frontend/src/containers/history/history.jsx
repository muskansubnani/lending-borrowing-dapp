import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { DataTable } from "./../../components/table/dataTable";
import { useContractWalletType } from "../../data/hooks/contract/useContractWalletType";
import { useContractUserLendings } from "../../data/hooks/contract/useContractUserLendings";
import { useContractUserLoans } from "../../data/hooks/contract/useContractUserLoans";

export const AccountHistory = () => {
  const { contractWalletType } = useContractWalletType();
  const userLendings = useContractUserLendings();
  const userLoans = useContractUserLoans();

  console.log(contractWalletType);
  console.log(userLendings);
  console.log(userLoans);

  const lenderColumns = useMemo(
    () => [
      {
        Header: "Archived Lendings",
        columns: [
          {
            Header: "Amount",
            accessor: "lendingAmount",
          },
          {
            Header: "Rate Of Return",
            accessor: "rateOfReturn",
          },
          {
            Header: "Start Date",
            accessor: "startDate",
          }, //,
          // {
          //   Header: "Duration",
          //   accessor: "duration",
          // },
        ],
      },
    ],
    []
  );

  const loanColumns = useMemo(
    () => [
      {
        Header: "Archived Loans",
        columns: [
          {
            Header: "Amount",
            accessor: "loanAmount",
          },
          {
            Header: "Interest Rate",
            accessor: "interest",
          },
          {
            Header: "Collateral NFT Address",
            accessor: "nftAddress",
          },
          {
            Header: "Collateral NFT Token ID",
            accessor: "nftTokenId",
          },
          {
            Header: "Start Date",
            accessor: "createdDate",
          },
          {
            Header: "Duration",
            accessor: "duration",
          },
        ],
      },
    ],
    []
  );

  return (
    <Tabs>
      <TabList>
        <Tab>Lending</Tab>
        <Tab>Loans</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DataTable columns={lenderColumns} data={[...userLendings]} />
        </TabPanel>
        <TabPanel>
          <DataTable columns={loanColumns} data={[...userLoans]} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
