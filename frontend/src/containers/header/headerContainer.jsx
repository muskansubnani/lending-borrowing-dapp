import { useNavigate } from "react-router";
import { useAccount } from "wagmi";
import { useWallet } from "./../../data/context/walletContext";
import { useEffect } from "react";
import { useContractWalletType } from './../../data/hooks/contract/useContractWalletType';

export const HeaderContainer = () => {
  const navigation = useNavigate();
  const { address } = useAccount();
  const { setWalletType } = useWallet();
  const {contractWalletType} = useContractWalletType();

  useEffect(() => {
    if (!address) {
      return;
    }
    console.log(contractWalletType, 'wlaletType')
    setWalletType(contractWalletType);
  }, [address]);

  useEffect(() => {
    if(!contractWalletType)
      return;
      
    if (contractWalletType === "InActive") {
      navigation("/signup");
      return;
    }

    navigation(`/`);
    return;
  }, [contractWalletType]);

  return <div></div>;
};