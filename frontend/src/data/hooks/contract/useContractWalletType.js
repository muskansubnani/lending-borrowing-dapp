import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useLenderBorrowerContract } from "../../context/lenderBorrowerContractContext.js";

export const useContractWalletType = () => {
  const { address } = useAccount();
  const [contractWalletType, setContractWalletType] = useState(null);
  const { lenderBorrowerContract } = useLenderBorrowerContract();

  useEffect(() => {
    const getAccountType = async () => {
      const accountType = await lenderBorrowerContract.getAccountType(address);

      setContractWalletType(accountType);
    };

    getAccountType().catch(console.error);
  }, [address]);

  return { contractWalletType };
};
