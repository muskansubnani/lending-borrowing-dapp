import { ethers } from "ethers";
import { useLenderBorrowerContract } from "../../../context/lenderBorrowerContractContext";

export const useLenderContractWrite = () => {
  const { lenderBorrowerContract } = useLenderBorrowerContract();

  const createLender = async (amount, duration) => {
    console.log(amount.toString());
    const lenderTx = await lenderBorrowerContract.createLender(duration, {
      value: ethers.utils.parseEther(amount.toString()),
    });

    const receipt = await lenderTx.wait();

    return receipt;
  };

  const redeemInterest = async (lenderId) => {
    await lenderBorrowerContract.redeemLendersInterest(lenderId);
  };

  const retrieveFunds = async (lenderId) => {
    await lenderBorrowerContract.retrieveLendersFund(lenderId);
  };

  return [createLender, redeemInterest, retrieveFunds];
};
