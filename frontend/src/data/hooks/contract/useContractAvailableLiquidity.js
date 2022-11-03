import { useEffect, useState } from "react";
import { useLenderBorrowerContract } from "./../../context/lenderBorrowerContractContext";

export const useContractAvailableLiquidity = () => {
  const [availableLiquidity, setAvailableLiquidity] = useState(null);
  const { lenderBorrowerContract } = useLenderBorrowerContract();

  useEffect(() => {
    const getAvailableLiquidity = async () => {
      const liquidityAvailable =
        await lenderBorrowerContract.getLiquidityAvailable();

      console.log("available Liquidity", liquidityAvailable);

      setAvailableLiquidity(liquidityAvailable.toNumber());
    };

    getAvailableLiquidity().catch(console.error);
  }, []);

  return { availableLiquidity };
};
