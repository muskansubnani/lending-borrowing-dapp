import { useLenderBorrowerContract } from "./../../../context/lenderBorrowerContractContext";
import { useNft } from "./../../../context/nftContext";
import { useToast } from "@chakra-ui/react";

export const useBorrowerContractWrite = () => {
  const { lenderBorrowerContract } = useLenderBorrowerContract();
  const { selectedNft } = useNft();
  const toast = useToast();

  const createLoan = async (amount, duration) => {
    const loanId = await lenderBorrowerContract.createLoan(
      amount,
      duration,
      selectedNft.contractAddress,
      selectedNft.tokenId,
      selectedNft.floorPrice
    );

    return loanId;
  };

  const payLoanMonthlyDeposit = async (loanId) => {
    try {
      await lenderBorrowerContract.payLoanMonthlyDeposit(loanId);

      toast({
        title: "Transaction succeded",
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch {
      toast({
        title: "Transaction failed",
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  const payCompleteLoan = async (loanId) => {
    try {
      await lenderBorrowerContract.payCompleteLoan(loanId);

      toast({
        title: "Transaction succeded",
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch {
      toast({
        title: "Transaction failed",
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  return { createLoan, payLoanMonthlyDeposit, payCompleteLoan };
};
