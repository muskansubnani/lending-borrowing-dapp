import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Alchemy, Network } from "alchemy-sdk";

export const useTransactionsForAccount = () => {
  const { address } = useAccount();
  const contractAddress = process.env.REACT_APP_LENDER_BORROWER_CONTRACT;
  const [userTransactions, setUserTransactions] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      const config = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_GOERLI,
      };
    
      const alchemy = new Alchemy(config);

      const transactions = await alchemy.core.getAssetTransfers({
        fromAddress: contractAddress,
        toAddress: address,
        category: ["external", "erc721"], //internal when it works :-/
      });

      setUserTransactions(transactions);
    };

    getTransactions();
  }, [address]);

  return { userTransactions };
};
