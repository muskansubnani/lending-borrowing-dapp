import { useWallet } from "./../../data/context/walletContext";
import { FiHome, FiTrendingUp, FiCompass } from "react-icons/fi";
import { useEffect, useState } from "react";

export const useLinkItems = () => {
  const { walletType } = useWallet();
  const [linkItems, setLinkItems] = useState([]);

  useEffect(() => {
    const items = getLinkItems(walletType);

    setLinkItems(items);
  }, [walletType]);

  return { linkItems };
};

const getLinkItems = (walletType) => {
  if (walletType === "borrower") {
    return [
      { name: "New Loan", icon: FiTrendingUp, path: "supplies" },
      { name: "Loans", icon: FiTrendingUp, path: "loans" },
      { name: "History", icon: FiCompass, path: "history" },
      { name: "FAQ", icon: FiCompass, path: "faq" },
    ];
  }

  if (walletType === "lender") {
    return [
      { name: "New Lending", icon: FiTrendingUp, path: "createlending" },
      { name: "History", icon: FiCompass, path: "history" },
      { name: "FAQ", icon: FiCompass, path: "faq" },
    ];
  }

  return [
    { name: "Home", icon: FiHome, path: "signup" },
    { name: "FAQ", icon: FiCompass, path: "faq" },
  ];
};