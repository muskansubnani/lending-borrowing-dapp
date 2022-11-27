import React from "react";
import { ButtonGroup, Button, VStack, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAccount } from "wagmi";
import { useWallet } from "./../../data/context/walletContext";
import { useContractAvailableLiquidity } from "../../data/hooks/contract/useContractAvailableLiquidity";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

export const AccountSignup = () => {
  const navigation = useNavigate();
  const availableLiquidity = useContractAvailableLiquidity();
  const { address } = useAccount();
  const { setWalletType } = useWallet();

  const onSelectionChanged = (selectedAccountType) => {
    setWalletType(selectedAccountType);

    if(selectedAccountType === "borrower"){
      navigation(`/createLoan`);
      return;
    }

    if(selectedAccountType === "lender"){
      navigation(`/createlending`);
      return;
    }
  };

  return (
    address && (
      <VStack>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Stat
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <StatLabel fontSize="lg"> Liquidity Available </StatLabel>
            <StatNumber> {availableLiquidity} ETH </StatNumber>
          </Stat>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          py={12}
          mb={2}
        >
          <ButtonGroup colorScheme="black" variant="outline" spacing="6">
            <Button
              size="lg"
              onClick={() => {
                onSelectionChanged("lender");
              }}
            >
              Lender
            </Button>
            <Button
              size="lg"
              onClick={() => {
                onSelectionChanged("borrower");
              }}
            >
              Borrower
            </Button>
          </ButtonGroup>
        </Box>
      </VStack>
    )
  );
};
