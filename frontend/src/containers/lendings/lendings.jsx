import React from "react";
import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUsersLendings } from "../../data/contractmethods/getUserLendings";
import { useLenderBorrowerContract } from "../../data/context/lenderBorrowerContractContext";

export const Lendings = () => {
    const [ lendings, setLendings ] = useState([]);
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
      }, []);
    
    console.log(lendings);
    
  return (
    <Container m={3} mt={10}>

  
    </Container>
  );
};
