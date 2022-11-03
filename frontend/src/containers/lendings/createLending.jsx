import React from "react";
import { GenericForm } from "../../components/Form/genericForm";
import { useAccount, useBalance } from "wagmi";

export const CreateLending = () => {
  const { address } = useAccount();
  const { data } = useBalance({ addressOrName: address });

  const handleSubmit = (values) => {
    console.log("hello");
    console.log("values", JSON.stringify(values));
  };

  return (
    <GenericForm
      handleSubmit={handleSubmit}
      maxAmount={parseFloat(data?.formatted)}
      formType={"Lending"}
    />
  );
};
