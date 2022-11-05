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

  return [createLoan];
};
