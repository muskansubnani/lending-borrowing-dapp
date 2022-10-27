import abi from "./../contracts/LendBorrower.json";
import { ethers, utils } from "ethers";
import { useState } from "react";

function useContractProvider() {
  const [contract, setContract] = useState(null);

  if (contract) return contract;

  const contractAbi = abi.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const lenderborrowerContract = new ethers.Contract(
    "0x235Ffe39149D38e3bE8788eb67f63e0D48B57228",
    contractAbi,
    provider
  );

  setContract(contract);

  return lenderborrowerContract;
}

export default useContractProvider