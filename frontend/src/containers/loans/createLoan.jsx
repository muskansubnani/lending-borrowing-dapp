import { Container } from "@chakra-ui/react";
import {React, useState} from "react";
import { useContractAvailableLiquidity } from "../../data/hooks/contract/useContractAvailableLiquidity";
import { useNft } from "./../../data/context/nftContext";
import { CreateLoanModal } from "./createLoanModal";
import { useBorrowerContractWrite } from "../../data/hooks/contract/write/useBorrowerContractWrite";
import { GenericForm } from "./../../components/form/genericForm";
import { Loading } from "../../components/loading/loading";
import { useNavigate } from "react-router";

export const CreateLoan = () => {
  const [loading, setLoading] = useState(false);
  const { createLoan } = useBorrowerContractWrite();
  const availableLiquidity = useContractAvailableLiquidity();
  const navigation = useNavigate();
  const { selectedNft } = useNft();
  const maxAmount =
    selectedNft?.floorPrice > availableLiquidity
      ? availableLiquidity
      : selectedNft?.floorPrice;

  console.log(maxAmount);

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("hello");
    console.log("values", JSON.stringify(values));

    let loanId;

    console.log(values.amount, parseInt(values.duration));

    loanId = await createLoan(values.amount, parseInt(values.duration));

    console.log(loanId);
    setLoading(false);
    navigation(`/history`);
  };

  return loading ? (
    <Loading />
  ) : (
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
