import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useTransactionsForAccount = () => {
  const { address } = useAccount();
  const contractAddress = process.env.REACT_APP_LENDER_BORROWER_CONTRACT;
  const [userTransactions, setUserTransactions] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      const options = { method: "GET" };
      console.log("address", address);

      const url = `https://goerli.etherscan.io/address/${contractAddress}`;
      console.log("url", url);

      const response = await fetch(url, options);

      console.log("response", response);

      const transactions = await response.json();

      console.log("user transactioons", transactions);

      setUserTransactions(transactions);
    };

    getTransactions();
  }, [address]);

  return { userTransactions };
};
