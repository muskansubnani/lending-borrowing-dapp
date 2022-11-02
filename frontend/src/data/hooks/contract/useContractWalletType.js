import abi from "../../../contracts/LendBorrower.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useContractWalletType = () => {
  const { address } = useAccount();
  const [contractWalletType, setContractWalletType] = useState(null);

  //this should come from context, so smth like const {lenderBorrowerContract} = useLenderContract();
  const contractAbi = abi.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const lenderborrowerContract = new ethers.Contract(
    "0xB358B0851Feb9853Cf2D016E5c2653A847659098",
    contractAbi,
    provider
  );

  useEffect(() => {
    const getAccountType = async () => {
      const accountType = await lenderborrowerContract.getAccountType(address);

      setContractWalletType(accountType);
      console.log(accountType, 'accType');
    };

    getAccountType().catch(console.error);
  }, []);

  return { contractWalletType };
};
