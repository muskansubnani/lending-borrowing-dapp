import React from "react";
import { GenericForm } from "../../components/Form/genericForm";
import { useAccount, useBalance } from "wagmi";

export const CreateLending = () => {
 const {address} = useAccount();
 const { data} = useBalance({ addressOrName: address});

 return <GenericForm maxAmount={parseFloat(data?.formatted)} formType = {"Lending"} />
};