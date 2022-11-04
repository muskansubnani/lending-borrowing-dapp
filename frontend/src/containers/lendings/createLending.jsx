import React from "react";
import { Container } from "@chakra-ui/react";
import { GenericForm } from "../../components/Form/genericForm";
import { useAccount, useBalance } from "wagmi";
import { createLender  } from "../../data/contractmethods/createLender";
import { useLenderBorrowerContract } from "../../data/context/lenderBorrowerContractContext";

export const CreateLending = () => {
  const { address } = useAccount();
  const { lenderBorrowerContract } = useLenderBorrowerContract();
  const { data } = useBalance({ addressOrName: address });

  const handleSubmit = async (values) => {
    console.log("hello");
    console.log("values", JSON.stringify(values));
    let x;

    try {
      console.log(lenderBorrowerContract);

      console.log(
        values.amount,
        parseInt(values.duration)
      );

      x = await createLender(
        lenderBorrowerContract,
        values.amount,
        parseInt(values.duration),
      );

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
