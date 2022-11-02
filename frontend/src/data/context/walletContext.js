import { createContext, useContext, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const WalletContext = createContext(null);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [walletType, setWalletType] = useState(null);

  useEffect(() => {


  }, []);

  return (
    <WalletContext.Provider value={walletType}>
      {children}
    </WalletContext.Provider>
  );
};

export const RequireWallet = () => {
  const { walletType } = useWallet();
  const location = useLocation();

  if (!walletType) {
    return (
      <Navigate
        to={{ pathname: "/unauthorized", state: { from: location } }}
        replace
      />
    );
  }

  return <Outlet />;
};
