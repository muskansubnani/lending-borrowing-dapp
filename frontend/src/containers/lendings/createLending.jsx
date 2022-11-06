import React from "react";
import { Container } from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";
import { GenericForm } from "./../../components/form/genericForm";
import { useLenderContractWrite } from "../../data/hooks/contract/write/useLenderContractWrite";

export const CreateLending = () => {
  const { address } = useAccount();
  const { data } = useBalance({ addressOrName: address });
  const [createLender] = useLenderContractWrite();

  const handleSubmit = async (values) => {
    console.log("hello");
    console.log("values", JSON.stringify(values));
    let x;

    try {
      console.log(values.amount, parseInt(values.duration));

      x = await createLender(values.amount, parseInt(values.duration));

      console.log(x);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container m={3} mt={10}>
      <GenericForm
        handleSubmit={handleSubmit}
        maxAmount={parseFloat(data?.formatted)}
        formType={"Lending"}
      />
    </Container>
  );
};
