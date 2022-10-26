import React, { useEffect } from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAccount } from "wagmi";

export const AccountSignup = () => {
  const navigate = useNavigate();
  const { address } = useAccount();

  useEffect(() => {
    //get wallet type if any 

    // if (address) {
    //   if (subscriberType === "lenderer") {
    //     navigation("/dashboard");
    //   } else if (subscriberType === "borrower") {
    //     navigation("/dashboard");
    //   }
    // }
  }, [address]);

  const onSelectionChanged = (selectedAccountType) => {

    //put it in context
    // console.log('selected', selectedAccountType);
    // navigate('/dashboard', { state: {accountType: selectedAccountType }});
  }
  
  return address && (
      <ButtonGroup variant="outline" spacing="6">
        <Button onClick={() => {onSelectionChanged("lenderer")}}>Lenderer</Button> 
        <Button onClick={() => {onSelectionChanged("borrower")}}>Borrower</Button>
      </ButtonGroup>
  );
};