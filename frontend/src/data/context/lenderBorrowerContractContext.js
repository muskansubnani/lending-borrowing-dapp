import { createContext, useContext, useState, useEffect } from "react";
import abi from "../../contracts/LendBorrower.json";
import { ethers } from "ethers";

const LenderBorrowerContractContext = createContext(null);

export const useLenderBorrowerContract = () =>
  useContext(LenderBorrowerContractContext);

export const LenderBorrowerContractProvider = ({ children }) => {
  const getContract = () => {
    const contractAbi = abi.abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      "0x63105a61c867b2aB8Fd61098D0449C3FC43f5C83",
      contractAbi,
      provider
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
