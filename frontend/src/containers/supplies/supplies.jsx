import { Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { OverlayModal } from "../../components/modal/overlayModal";
import { useNftCollectionsForOwner } from "../../data/hooks/useCollectionsForOwner";
import { useNftsForOwner } from "./../../data/hooks/useNftsForOwner";
import { Nft } from "./../../data/models/nft";
import { useNft } from "./../../data/context/nftContext";
import { GenericForm } from "./../../components/Form/genericForm";
import { useContractAvailableLiquidity } from "../../data/hooks/contract/useContractAvailableLiquidity";

export const Supplies = () => {
  const { ownerNfts } = useNftsForOwner();
  const { ownerNftCollections } = useNftCollectionsForOwner();
  const [nftModalData, setNftModalData] = useState([]);
  const { selectedNft } = useNft();
  const { availableLiquidity } = useContractAvailableLiquidity();

  console.log("aAa", availableLiquidity);

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

  const maxAmount =
    selectedNft?.floorPrice > availableLiquidity
      ? availableLiquidity
      : selectedNft?.floorPrice;

  const handleSubmit = (values) => {
    console.log("hello");
    console.log("values", JSON.stringify(values));
  };

  return (
    <Container m={3} mt={10}>
      {!selectedNft && (
        <OverlayModal
          buttonText="Select NFT as guarantee"
          title="Select NFT"
          size="xl"
          modalData={nftModalData}
        />
      )}

      {selectedNft && (
        <>
          <GenericForm handleSubmit={handleSubmit} maxAmount={maxAmount} />
        </>
      )}
    </Container>
  );
};
