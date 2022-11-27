import { useEffect, useState } from "react";
import { useLenderBorrowerContract } from "./../../context/lenderBorrowerContractContext";
import { ethers } from "ethers";

export const useContractAvailableLiquidity = () => {
  const [availableLiquidity, setAvailableLiquidity] = useState(null);
  const { lenderBorrowerContract } = useLenderBorrowerContract();

  useEffect(() => {
    const getAvailableLiquidity = async () => {
      const liquidityAvailable =
        await lenderBorrowerContract.getLiquidityAvailable();

      setAvailableLiquidity(ethers.utils.formatEther(liquidityAvailable));
    };

    getAvailableLiquidity().catch(console.error);
  }, []);

  return availableLiquidity;
};
