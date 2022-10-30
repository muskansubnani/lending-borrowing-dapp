import { useWallet } from "./../../data/context/walletContext";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Alchemy, Network } from "alchemy-sdk";

export const useNftsForOwner = () => {
  const { walletType } = useWallet();
  const { address } = useAccount();

  const [ownerNfts, setOwnerNfts] = useState([]);

  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_GOERLI,
  };

  const alchemy = new Alchemy(config);

  useEffect(() => {
    if (!address || !walletType || walletType === "InActive")
     return;

    const getNftsForOwner = async () => {
      const response = await alchemy.nft.getNftsForOwner(address);
      const nfts = response["ownedNfts"];

      console.log(nfts, 'nfts');

      setOwnerNfts(nfts);
    };

    getNftsForOwner();
  }, [address, walletType]);

  return { ownerNfts };
};