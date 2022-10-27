import Header from "../../components/header/header";
import { useNavigate } from "react-router";
import { useAccount } from "wagmi";
import { useWallet } from "./../../data/context/walletContext";
import { useEffect } from "react";

export const HeaderContainer = () => {
  const navigation = useNavigate();
  const { address } = useAccount();
  const { setWalletType } = useWallet();

  useEffect(() => {
    if (!address) {
      return;
    }

    let walletType= null;

    if (!walletType) {
      navigation("/signup");
      return;
    }

    setWalletType(walletType);
    navigation("/dashboard");
  }, [address]);

  return null;
};
