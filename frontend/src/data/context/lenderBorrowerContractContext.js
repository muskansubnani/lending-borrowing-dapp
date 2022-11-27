import { createContext, useContext, useState, useEffect } from "react";
import abi from "../../contracts/LendBorrowContract.json";
import { ethers } from "ethers";

const LenderBorrowerContractContext = createContext(null);

export const useLenderBorrowerContract = () =>
  useContext(LenderBorrowerContractContext);

export const LenderBorrowerContractProvider = ({ children }) => {
  const getContract = () => {
    const contractAbi = abi.abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(
      process.env.REACT_APP_LENDER_BORROWER_CONTRACT,
      contractAbi,
      signer
    );

    return contract;
  };

  const [lenderBorrowerContract] = useState(getContract());

  return (
    <LenderBorrowerContractContext.Provider value={{ lenderBorrowerContract }}>
      {children}
    </LenderBorrowerContractContext.Provider>
  );
};
