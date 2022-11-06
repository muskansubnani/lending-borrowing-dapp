import React from "react";
import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUsersLendings } from "../../data/contractmethods/getUserLendings";
import { useLenderBorrowerContract } from "../../data/context/lenderBorrowerContractContext";
import { getUsersLoans } from "../../data/contractmethods/getUserLoans";
import { useContractWalletType } from '../../data/hooks/contract/useContractWalletType';
import { useContractUserLendings } from '../../data/hooks/contract/useContractUserLendings';
import { useContractUserLoans } from '../../data/hooks/contract/useContractUserLoans';

export const AccountHistory = () => {
 
    const {contractWalletType} = useContractWalletType();
    const userLendings = useContractUserLendings();
    const userLoans = useContractUserLoans();
    
    console.log( contractWalletType);
    console.log(userLendings);
    console.log(userLoans);
    
  return (
    <Container m={3} mt={10}>

  
    </Container>
  );
};
