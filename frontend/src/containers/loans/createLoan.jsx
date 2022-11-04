import { Container } from "@chakra-ui/react";
import React from "react";
import { GenericForm } from "./../../components/Form/genericForm";
import { useContractAvailableLiquidity } from "../../data/hooks/contract/useContractAvailableLiquidity";
import { useNft } from "./../../data/context/nftContext";
import { CreateLoanModal } from "./createLoanModal";
import { useLenderBorrowerContract } from "../../data/context/lenderBorrowerContractContext";
import { createLoan } from "../../data/contractmethods/createLoan";

export const CreateLoan = () => {
  const availableLiquidity = useContractAvailableLiquidity();
  const { lenderBorrowerContract } = useLenderBorrowerContract();
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
      console.log(lenderBorrowerContract);
      console.log(
        values.amount,
        parseInt(values.duration),
        selectedNft.contractAddress,
        parseInt(selectedNft.tokenId),
        10000
      );

      loanId = await createLoan(
        lenderBorrowerContract,
        values.amount,
        parseInt(values.duration),
        selectedNft.contractAddress,
        parseInt(selectedNft.tokenId),
        10000
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
