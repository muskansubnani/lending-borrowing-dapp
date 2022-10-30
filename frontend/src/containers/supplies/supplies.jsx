import React from "react";
import { useNftCollectionsForOwner } from "../../data/hooks/useCollectionsForOwner";
import { useNftsForOwner } from './../../data/hooks/useNftsForOwner';

export const Supplies = () => {
  const {ownerNfts} = useNftsForOwner();
  const {ownerNftCollections} = useNftCollectionsForOwner();

  console.log('ownerNfts', ownerNfts);
  console.log('ownerNftCollections', ownerNftCollections);
  
  return <div></div>;
};
