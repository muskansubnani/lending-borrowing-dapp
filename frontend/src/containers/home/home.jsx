import React from "react";
import { AccountSignup } from "../signup/accountSignup";
import { useWallet } from './../../data/context/walletContext';

export const Home = () => {
  const {walletType} = useWallet();

  return !walletType && <AccountSignup/>
};
