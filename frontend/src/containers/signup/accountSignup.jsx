import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAccount } from "wagmi";
import { useWallet } from './../../data/context/walletContext';

export const AccountSignup = () => {
  const navigation = useNavigate();
  const { address } = useAccount();
  const { setWalletType } = useWallet();

  const onSelectionChanged = (selectedAccountType) => {
    setWalletType(selectedAccountType);
    navigation("/dashboard");
  };

  return (
    address && (
      <ButtonGroup variant="outline" spacing="6">
        <Button
          onClick={() => {
            onSelectionChanged("lenderer");
          }}
        >
          Lenderer
        </Button>
        <Button
          onClick={() => {
            onSelectionChanged("borrower");
          }}
        >
          Borrower
        </Button>
      </ButtonGroup>
    )
  );
};
