import { createContext, useContext } from "react";
import abi from "../../contracts/LendBorrower.json";
import { ethers } from "ethers";

const LenderBorrowerContractContext = createContext(null);

export const useLenderBorrowerContract = () => useContext(LenderBorrowerContractContext);

export const LenderBorrowerContractProvider = ({ children }) => {

  const contractAbi = abi.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const lenderBorrowerContract = new ethers.Contract(
    "0xB358B0851Feb9853Cf2D016E5c2653A847659098",
    contractAbi,
    provider
  );

  return (
    <LenderBorrowerContractContext.Provider value={ lenderBorrowerContract }>
      {children}
    </LenderBorrowerContractContext.Provider>
  );
};