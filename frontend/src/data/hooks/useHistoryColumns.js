import { useWallet } from "./../context/walletContext";
import { useMemo } from "react";
import { useLenderContractWrite } from "./contract/write/useLenderContractWrite";
import { Button } from '@chakra-ui/react';

export const useHistoryColumns = () => {
  const { walletType } = useWallet();
  const { retrieveFunds, redeemInterest } = useLenderContractWrite();

  const activeLenderColumns = useMemo(
    () => [
      {
        Header: "Active Lendings",
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
          },
          {
            Header: "Duration (years)",
            accessor: "durationInYears",
          },
          {
            Header: "Interest",
            Cell: (props) => (
              <Button
                type="submit"
                colorScheme="purple"
                width="auto"
                onClick={async () => redeemInterest(props.row.original.id)}
              >
                Redeem Interest
              </Button>
            ),
          },

          {
            Header: "Matured Funds",
            Cell: (props) => (
              <Button
                type="submit"
                colorScheme="purple"
                width="auto"
                onClick={async () => retrieveFunds(props.row.original.id)}
              >
                Retrieve Matured Funds
              </Button>
            ),
          },
        ],
      },
    ],
    [walletType]
  );

  const maturedLenderColumns = useMemo(
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
          },
          {
            Header: "Duration (years)",
            accessor: "durationInYears",
          },
        ],
      },
    ],
    [walletType]
  );

  const maturedLoanColumns = useMemo(
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
    [walletType]
  );

  return { activeLenderColumns, maturedLenderColumns, maturedLoanColumns };
};
