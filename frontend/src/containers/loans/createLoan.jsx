import { Container } from "@chakra-ui/react";
import React from "react";
import { GenericForm } from "./../../components/Form/genericForm";
import { useContractAvailableLiquidity } from "../../data/hooks/contract/useContractAvailableLiquidity";
import { useNft } from "./../../data/context/nftContext";
import { CreateLoanModal } from "./createLoanModal";
import { ethers } from "ethers";

export const CreateLoan = () => {
  const availableLiquidity = useContractAvailableLiquidity();


  console.log(availableLiquidity);
  const { selectedNft } = useNft();
  const maxAmount =
    selectedNft?.floorPrice > availableLiquidity
      ? availableLiquidity
      : selectedNft?.floorPrice;


      console.log(maxAmount);

  const handleSubmit = (values) => {
    console.log("hello");
    console.log("values", JSON.stringify(values));
  };

  return (
    <Container m={3} mt={10}>
      {!selectedNft && <CreateLoanModal />}

      {selectedNft && (
        <GenericForm handleSubmit={handleSubmit} maxAmount={maxAmount} />
      )}
    </Container>
  );
};
