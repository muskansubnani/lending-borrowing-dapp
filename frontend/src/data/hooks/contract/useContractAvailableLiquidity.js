import abi from "../../../contracts/LendBorrower.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useContractAvailableLiquidity = () => {
  const [availableLiquidity, setAvailableLiquidity] = useState(null);

  //this should come from context, so smth like const {lenderBorrowerContract} = useLenderContract();
  const contractAbi = abi.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const lenderborrowerContract = new ethers.Contract(
    "0xB358B0851Feb9853Cf2D016E5c2653A847659098",
    contractAbi,
    provider
  );

  useEffect(() => {
    const getAvailableLiquidity = async () => {
      const liquidityAvailable = await lenderborrowerContract.getLiquidityAvailable();

      setAvailableLiquidity(liquidityAvailable.toNumber());
    };

    getAvailableLiquidity().catch(console.error);
  }, []);

  return { availableLiquidity };
};
