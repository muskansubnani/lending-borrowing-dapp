import { useWallet } from "./../../data/context/walletContext";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Alchemy, Network } from "alchemy-sdk";
import { useNft } from './../context/nftContext';

export const useNftsForOwner = () => {
  const { walletType } = useWallet();
  const { address } = useAccount();
  const [ownerNfts, setOwnerNfts] = useState(null);
  const {selectedNft} = useNft();

  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_GOERLI,
  };

  const alchemy = new Alchemy(config);

  useEffect(() => {
    if (
      !address ||
      !walletType ||
      walletType === "InActive" ||
      walletType === "lender" || 
      selectedNft
    )
      return;

    const getNftsForOwner = async () => {
      const response = await alchemy.nft.getNftsForOwner(address);
      const ownedNfts = response["ownedNfts"];

      setOwnerNfts(ownedNfts);
    };

    getNftsForOwner();
  }, []);

  return { ownerNfts };
};