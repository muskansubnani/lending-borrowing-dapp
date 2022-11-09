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
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack
} from "@chakra-ui/react";

import { useMemo } from "react";
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
            Header: "Interest",
            Cell: (props) => (
              <Button
              type="submit"  colorScheme="purple" width="auto"
              onClick={ () => console.log('row clicked info', props.row.original) }
            >
              Redeem Interest
            </Button>
            ),
          },

          {
            Header: "Matured Funds",
            Cell: (props) => (
              <Button
              type="submit"  colorScheme="purple" width="auto" 
              onClick={ () => console.log('row clicked info', props.row.original) }
            >
              Retrieve Matured Funds
            </Button>
            ),
          }
        ],
      },
    ]
  );

  const activeLoanColumns = useMemo(
    () => [
      {
        Header: "Active Loans",
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
            Header: "Interest",
            Cell: (props) => (
              <Button
                type="submit"  colorScheme="purple"  width="full"
                onClick={ () => console.log('row clicked info', props.row.original) }
              >
                Redeem Interest
              </Button>
            ),
          }
        ],
      },
    ]
  );

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
          },
          {
            Header: "Duration (years)",
            accessor: "DurationInYears",
          },
          
        ],
      },
    ]
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
          {
            Header: "Interest",
            Cell: (props) => (
              <button
                type="button"
                onClick={() => console.log('row clicked info', props.row.original)}
              >
                Redeem
              </button>
            ),
          },
        ],
      },
    ]
  );




if(contractWalletType =="lender")
{
  return (
    <VStack
  divider={<StackDivider borderColor='gray.200' />}
  spacing={4}
  align='stretch'
>
  <Box>
  <Heading as='h4' size='md'  mb={5}>
  Current Activity
  </Heading>
  <DataTable columns={activeLenderColumns} data={userLendings} />
  </Box>
  <Box>
  <Heading as='h4' size='md' mb={5}>
  Archives
  </Heading>
  <Tabs>
      <TabList>
        <Tab>Lending</Tab>
        <Tab>Loans</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DataTable columns={lenderColumns} data={userLendings} />
        </TabPanel>
        <TabPanel>
          <DataTable columns={loanColumns} data={userLoans} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
</VStack>
  );
}

else 

{return (
<VStack
  divider={<StackDivider borderColor='gray.200' />}
  spacing={4}
  align='stretch'
>
  <Box>
          <VStack spacing={6} align="flex-start">
         
            <Heading>Active Loan</Heading>
            <HStack>
            <FormControl>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <Input
                id="amount"
                name="amount"
                type="number"
                variant="filled"
                disabled
              />
            
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="duration">Duration</FormLabel>
              <Select  id="duration"
                name="duration"
                type="number"
                variant="filled"
                placeholder ="select year(s)"
                size ="md"
                >
                <option value = "1">1</option>
                <option value = "2">2</option>
              </Select>

            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              Create
            </Button>
            </HStack>
          </VStack>
    












   loan




  </Box>



  <Box>
    

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


  </Box>
</VStack>



);


}
};
