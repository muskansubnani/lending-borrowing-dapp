import React from "react";
import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUsersLendings } from "../../data/contractmethods/getUserLendings";
import { useLenderBorrowerContract } from "../../data/context/lenderBorrowerContractContext";
import { getUsersLoans } from "../../data/contractmethods/getUserLoans";
import { useContractWalletType } from '../../data/hooks/contract/useContractWalletType';

export const AccountHistory = () => {
 
    const {contractWalletType} = useContractWalletType();
    const [ lendings, setLendings ] = useState([]);
    const [ loans, setLoans ] = useState([]);
    const { lenderBorrowerContract } = useLenderBorrowerContract();

    useEffect(() => {

        const UserLendings = async () => {
           let userLendings = await getUsersLendings(
                lenderBorrowerContract
              );
          console.log("lendings",  userLendings);
          setLendings( userLendings);
        };
    
        UserLendings().catch(console.error);

        const UserLoans = async () => {
            let userLoans = await getUsersLoans(
                 lenderBorrowerContract
               );
           console.log("loans",  userLoans);
           setLoans( userLoans);
         };
     
         UserLoans().catch(console.error);

      }, []);
    console.log( contractWalletType);
    console.log(lendings);
    console.log(loans);
    
  return (
    <Container m={3} mt={10}>

  
    </Container>
  );
};
