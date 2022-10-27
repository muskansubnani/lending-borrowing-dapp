import { useNavigate } from "react-router";
import { useAccount } from "wagmi";
import { useWallet } from "./../../data/context/walletContext";
import { useEffect } from "react";
import abi from "./../../contracts/LendBorrower.json";
import { ethers } from "ethers";

export const HeaderContainer = () => {
  const navigation = useNavigate();
  const { address } = useAccount();
  const { walletType, setWalletType } = useWallet();

  const contractAbi = abi.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const lenderborrowerContract = new ethers.Contract(
    "0x235Ffe39149D38e3bE8788eb67f63e0D48B57228",
    contractAbi,
    provider
  );

  useEffect(() => {
    if (!address) {
      return;
    }

    const getAccountType = async () => {
      const accountType = await lenderborrowerContract.getAccountType(address);

      setWalletType(accountType);
    };

    getAccountType().catch(console.error);
  }, [address]);

  useEffect(() => {
    if (walletType === "InActive") {
      navigation("/signup");
      return;
    }

    navigation("/dashboard");
  }, [walletType]);

  return <div></div>;
};
