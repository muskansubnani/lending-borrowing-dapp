import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router";

export const AccountSignup = () => {
  const { address } = useAccount();
  const navigation = useNavigate();

  return (
    address && (
      <ButtonGroup variant="outline" spacing="6">
        <Button onClick={() => navigation("/dashboard")}>Lenderer</Button> 
        <Button onClick={() => navigation("/dashboard")}>Borrower</Button>
      </ButtonGroup>
    )
  );
};
//keep in context or send by query params? hmm 
