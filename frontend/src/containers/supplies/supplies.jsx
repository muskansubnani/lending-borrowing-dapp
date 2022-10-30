import React from "react";
import { useNftsForOwner } from './../../data/hooks/useNftsForOwner';

export const Supplies = () => {
  const {ownerNfts} = useNftsForOwner();
  
  return <div></div>;
};
