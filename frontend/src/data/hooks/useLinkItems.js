import { useWallet } from "./../../data/context/walletContext";
import { FiHome, FiTrendingUp, FiCompass } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useContractWalletType } from "./contract/useContractWalletType";

export const useLinkItems = () => {
  const { walletType } = useWallet();
  const { contractWalletType } = useContractWalletType();

  const [linkItems, setLinkItems] = useState([]);

  useEffect(() => {
    if(!walletType)
      return;
      
    const items = getLinkItems(walletType, contractWalletType);

    setLinkItems(items);
  }, [walletType]);

  return { linkItems };
};

const getLinkItems = (walletType, contractWalletType) => {
  return contractWalletType === "InActive"
    ? getLinkItemsForNewCustomer(walletType)
    : getLinkItemsForExistingCustomer(walletType);
};

const getLinkItemsForNewCustomer = (walletType) => {
  if (walletType === "borrower") {
    return [
      { name: "New Loan", icon: FiTrendingUp, path: "createLoan" },
      { name: "FAQ", icon: FiCompass, path: "faq" },
    ];
  }

  if (walletType === "lender") {
    return [
      { name: "New Lending", icon: FiTrendingUp, path: "createlending" },
      { name: "FAQ", icon: FiCompass, path: "faq" },
    ];
  }

  return [
    { name: "Home", icon: FiHome, path: "signup" },
    { name: "FAQ", icon: FiCompass, path: "faq" },
  ];
};

const getLinkItemsForExistingCustomer = (walletType) => {
  if (walletType === "borrower") {
    return [
      { name: "Account History", icon: FiTrendingUp, path: "history" },
      { name: "Transactions", icon: FiCompass, path: "transactions" },
      { name: "FAQ", icon: FiCompass, path: "faq" },
    ];
  }

  if (walletType === "lender") {
    return [
      { name: "New Lending", icon: FiTrendingUp, path: "createlending" },
      { name: "Account History", icon: FiTrendingUp, path: "history" },
      { name: "Transactions", icon: FiCompass, path: "transactions" },
      { name: "FAQ", icon: FiCompass, path: "faq" },
    ];
  }

  return [
    { name: "Home", icon: FiHome, path: "signup" },
    { name: "FAQ", icon: FiCompass, path: "faq" },
  ];
};
