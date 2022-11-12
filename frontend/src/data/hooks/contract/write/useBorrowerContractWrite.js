import { useLenderBorrowerContract } from "./../../../context/lenderBorrowerContractContext";
import { useNft } from "./../../../context/nftContext";

export const useBorrowerContractWrite = () => {
  
  const { lenderBorrowerContract } = useLenderBorrowerContract();
  const { selectedNft } = useNft();

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
    await lenderBorrowerContract.payLoanMonthlyDeposit(loanId);
  };

  const payCompleteLoan = async (loanId) => {
    await lenderBorrowerContract.payCompleteLoan(loanId);
  };

  return [createLoan, payLoanMonthlyDeposit , payCompleteLoan];
};
