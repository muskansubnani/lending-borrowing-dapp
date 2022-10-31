import { useWallet } from "./../../data/context/walletContext";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useNftCollectionsForOwner = () => {
  const { walletType } = useWallet();
  const { address } = useAccount();

  const [ownerNftCollections, setOwnerNftCollections] = useState(null);

  useEffect(() => {
    if (
      !address ||
      !walletType ||
      walletType === "InActive" ||
      walletType === "borrower"
    ) {
      return;
    }

    const options = { method: "GET" };

    fetch(
      `https://testnets-api.opensea.io/api/v1/collections?asset_owner=${address}&offset=0&limit=300`,
      options
    )
      .then((response) => response.json())
      .then((response) => setOwnerNftCollections(response))
      .catch((err) => console.error(err));
  }, [address, walletType]);

  return { ownerNftCollections };
};
