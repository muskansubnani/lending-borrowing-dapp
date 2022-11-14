import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  StackDivider,
  Box,
  Heading,
  Button,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";

import { useMemo } from "react";
import { DataTable } from "./../../components/table/dataTable";
import { useContractWalletType } from "../../data/hooks/contract/useContractWalletType";
import { useContractUserLendings } from "../../data/hooks/contract/useContractUserLendings";
import { useContractUserLoans } from "../../data/hooks/contract/useContractUserLoans";
import { useBorrowerContractWrite } from "../../data/hooks/contract/write/useBorrowerContractWrite";
import { useLenderContractWrite } from "../../data/hooks/contract/write/useLenderContractWrite";

export const AccountHistory = () => {
  const { retrieveFunds, redeemInterest } = useLenderContractWrite();
  const { payLoanMonthlyDeposit, payCompleteLoan } = useBorrowerContractWrite();
  const { contractWalletType } = useContractWalletType();
  const userLendings = useContractUserLendings();
  const userLoans = useContractUserLoans();

  const maturedLendings = userLendings.filter((x) => x.status === 1);
  const maturedLoans = userLoans.filter((x) => x.status === 1);
  const activeLoan = userLoans.find((x) => x.status === 0);
  const activeLendings = userLendings.filter((x) => x.status === 0);

  console.log(contractWalletType);
  console.log(userLendings);
  console.log(userLoans);

  console.log(maturedLendings);
  console.log(maturedLoans);

  console.log(activeLoan);
  console.log(activeLendings);

  const activeLenderColumns = useMemo(() => [
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
              disabled = {() => (props.row.original.startDateTimeMiliSecondsUnix +props.row.original.startDateTimeMiliSecondsUnix) }
              onClick={async () => retrieveFunds(props.row.original.id)}
            >
              Retrieve Matured Funds
            </Button>
          ),
        },
      ],
    },
  ]);

  const maturedLenderColumns = useMemo(() => [
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
  ]);

  const maturedLoanColumns = useMemo(() => [
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
  ]);

  if (contractWalletType === "lender"  && activeLendings) {
    return (
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Box>
          <Heading as="h4" size="md" mb={5}>
            Current Activity
          </Heading>
          <DataTable columns={activeLenderColumns} data={activeLendings} />
        </Box>
        <Box>
          <Heading as="h4" size="md" mb={5}>
            Archives
          </Heading>
          <Tabs>
            <TabList>
              <Tab>Lending</Tab>
              <Tab>Loans</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DataTable columns={maturedLenderColumns} data={maturedLendings} />
              </TabPanel>
              <TabPanel>
                <DataTable columns={maturedLoanColumns} data={maturedLoans} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    );
  } else if (contractWalletType === "borrower" && activeLoan) {
    return (
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Box>
          <VStack spacing={6} align="flex-start">
            <Heading>Active Loan</Heading>

            <HStack>
              <Text as="b" width="100%">
                {" "}
                Loan Amount{" "}
              </Text>
              <Input
                size="sm"
                width="100%"
                value={activeLoan.loanAmount}
                disabled
              />

              <Text as="b" width="100%">
                {" "}
                Interest Rate{" "}
              </Text>
              <Input size="sm" value={activeLoan.interest} disabled />

              <Text as="b" width="100%">
                {" "}
                Nft Address{" "}
              </Text>
              <Input size="sm" value={activeLoan.nftAddress} disabled />
            </HStack>

            <HStack>
              <Text as="b" width="100%">
                {" "}
                Nft Token ID{" "}
              </Text>
              <Input
                width="100%"
                value={activeLoan.nftTokenId}
                size="sm"
                disabled
              />

              <Text as="b" width="100%">
                {" "}
                Next Payment Date{" "}
              </Text>
              <Input
                width="100%"
                value={activeLoan.loanAmount}
                size="sm"
                disabled
              />

              <Text as="b" width="100%">
                {" "}
                Duration (years){" "}
              </Text>
              <Input
                width="100%"
                value={activeLoan.duration}
                size="sm"
                disabled
              />
            </HStack>

            <HStack>
              <Text as="b" width="100%">
                {" "}
                Remaining Amount{" "}
              </Text>
              <Input value={activeLoan.remainingAmount} size="sm" disabled />

              <Text as="b" width="100%">
                {" "}
                Monthly Payment{" "}
              </Text>
              <Input
                width="100%"
                value={activeLoan.loanAmount}
                size="sm"
                disabled
              />

              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                onClick={() => payLoanMonthlyDeposit(activeLoan.Id)}
              >
                {" "}
                Pay Monthly Deposit{" "}
              </Button>

              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                onClick={() => payCompleteLoan(activeLoan.Id)}
              >
                {" "}
                Pay Complete Loan{" "}
              </Button>
            </HStack>
          </VStack>
        </Box>

        <Box>
          <Tabs>
            <TabList>
              <Tab>Lending</Tab>
              <Tab>Loans</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DataTable columns={maturedLenderColumns} data={maturedLendings} />
              </TabPanel>
              <TabPanel>
                <DataTable columns={maturedLoanColumns} data={maturedLoans} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    );
  }
};
