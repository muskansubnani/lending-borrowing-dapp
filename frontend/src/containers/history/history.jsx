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

import { DataTable } from "./../../components/table/dataTable";
import { useContractWalletType } from "../../data/hooks/contract/useContractWalletType";
import { useContractUserLendings } from "../../data/hooks/contract/useContractUserLendings";
import { useContractUserLoans } from "../../data/hooks/contract/useContractUserLoans";
import { useBorrowerContractWrite } from "../../data/hooks/contract/write/useBorrowerContractWrite";
import { useHistoryColumns } from "./../../data/hooks/useHistoryColumns";

export const AccountHistory = () => {
  const { payLoanMonthlyDeposit, payCompleteLoan } = useBorrowerContractWrite();
  const { contractWalletType } = useContractWalletType();
  const userLendings = useContractUserLendings();
  const userLoans = useContractUserLoans();
  const { activeLenderColumns, maturedLenderColumns, maturedLoanColumns } =
    useHistoryColumns();

  const maturedLendings = userLendings.filter((x) => x.status === 1);
  const maturedLoans = userLoans.filter((x) => x.status === 1);
  const activeLoan = userLoans.find((x) => x.status === 0);
  const activeLendings = userLendings.filter((x) => x.status === 0);

  if (contractWalletType === "lender" && activeLendings) {
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
                <DataTable
                  columns={maturedLenderColumns}
                  data={maturedLendings}
                />
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
                <DataTable
                  columns={maturedLenderColumns}
                  data={maturedLendings}
                />
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
