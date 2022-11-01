import React from "react";
import { GenericForm } from "../../components/Form/genericForm";
import { useAccount, useBalance } from "wagmi";

export const CreateLending = () => {

    const {address} = useAccount();
    const { data, isError, isLoading } = useBalance({
      addressOrName: address,
    });
    console.log(data, 'dada');

  return <GenericForm maxAmount={100} formType = {"Lending"} />
};