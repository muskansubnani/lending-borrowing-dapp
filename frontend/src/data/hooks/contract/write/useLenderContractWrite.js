import { ethers } from "ethers";
import { useLenderBorrowerContract } from "../../../context/lenderBorrowerContractContext";
import { useToast } from "@chakra-ui/react";

export const useLenderContractWrite = () => {
  const { lenderBorrowerContract } = useLenderBorrowerContract();
  const toast = useToast();

  const createLender = async (amount, duration) => {
    try {
      const lenderTx = await lenderBorrowerContract.createLender(duration, {
        value: ethers.utils.parseEther(amount.toString()),
      });

      const receipt = await lenderTx.wait();

      toast({
        title: "Transaction succeded",
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });

      return receipt;
    } catch (exception) {
      toast({
        title: `${exception.error.message}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  const redeemInterest = async (lenderId) => {
    try {
      await lenderBorrowerContract.redeemLendersInterest(lenderId);

      toast({
        title: "Transaction succeded",
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (exception) {
      toast({
        title: `${exception.error.message}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  const retrieveFunds = async (lenderId) => {
    try {
      await lenderBorrowerContract.retrieveLendersFund(lenderId);

      toast({
        title: "Transaction succeded",
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (exception) {
      toast({
        title: `${exception.error.message}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  return { createLender, redeemInterest, retrieveFunds };
};
