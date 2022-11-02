import React, { useEffect, useState } from "react";
import { OverlayModal } from "../../components/modal/overlayModal";
import { useNftCollectionsForOwner } from "../../data/hooks/useCollectionsForOwner";
import { useNftsForOwner } from "../../data/hooks/useNftsForOwner";
import { Nft } from "../../data/models/nft";

export const CreateLoanModal = () => {
  const { ownerNfts } = useNftsForOwner();
  const { ownerNftCollections } = useNftCollectionsForOwner();
  const [nftModalData, setNftModalData] = useState([]);

  useEffect(() => {
    if (!ownerNfts || !ownerNftCollections) return;

    getNftModalData();
  }, [ownerNfts, ownerNftCollections]);

  const getNftModalData = () => {
    let nfts = [];

    for (const collection of ownerNftCollections) {
      for (const nft of ownerNfts) {
        if (
          collection.primary_asset_contracts[0].address === nft.contract.address
        ) {
          nfts.push(
            new Nft(
              nft.contract.address,
              nft.tokenId,
              nft.title,
              nft.tokenType,
              collection.stats.floor_price
            )
          );
        }
      }
    }

    setNftModalData(nfts);
  };

  return (
    <OverlayModal
      buttonText="Select NFT as guarantee"
      title="Select NFT"
      size="xl"
      modalData={nftModalData}
    />
  );
};