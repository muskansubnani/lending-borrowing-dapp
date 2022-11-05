import { Container } from "@chakra-ui/react";
import React from "react";
import { useContractAvailableLiquidity } from "../../data/hooks/contract/useContractAvailableLiquidity";
import { useNft } from "./../../data/context/nftContext";
import { CreateLoanModal } from "./createLoanModal";
import { GenericForm } from './../../components/Form/genericForm';
import { useBorrowerContractWrite } from "../../data/hooks/contract/write/useBorrowerContractWrite";

export const CreateLoan = () => {
  const  [createLoan] = useBorrowerContractWrite();
  const availableLiquidity = useContractAvailableLiquidity();
  console.log(availableLiquidity);
  const { selectedNft } = useNft();
  const maxAmount =
    selectedNft?.floorPrice > availableLiquidity
      ? availableLiquidity
      : selectedNft?.floorPrice;

  console.log(maxAmount);

  const handleSubmit = async (values) => {
    console.log("hello");
    console.log("values", JSON.stringify(values));

    let loanId;

    try {
      console.log(
        values.amount,
        parseInt(values.duration)
      );

      loanId = await createLoan(
        values.amount,
        parseInt(values.duration)
      );

      console.log(loanId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container m={3} mt={10}>
      {!selectedNft && <CreateLoanModal />}

      {selectedNft && (
        <GenericForm
          handleSubmit={handleSubmit}
          maxAmount={maxAmount}
          formType={"Loan"}
        />
      )}
    </Container>
  );
};
