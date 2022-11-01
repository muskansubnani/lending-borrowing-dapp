import { useWallet } from "./../../data/context/walletContext";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useNft } from './../context/nftContext';

export const useNftCollectionsForOwner = () => {
  const { walletType } = useWallet();
  const { address } = useAccount();
  const {selectedNft} = useNft();

  const [ownerNftCollections, setOwnerNftCollections] = useState(null);

  useEffect(() => {
    if (
      !address ||
      !walletType ||
      walletType === "InActive" ||
      walletType === "lender" || 
      selectedNft
    ) {
      return;
    }
    
    const options = { method: "GET" };

    const getCollections = async () => {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v1/collections?asset_owner=${address}&offset=0&limit=300`,
        options
      );
      
      const collections = await response.json();

      setOwnerNftCollections(collections);
    };

    getCollections();
  }, []);

  return { ownerNftCollections };
};