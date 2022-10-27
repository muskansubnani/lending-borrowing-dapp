import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RequireWallet, WalletProvider } from "./data/context/walletContext";
import Unauthorized from "./components/unauthorized/unauthorized";
import { Dashboard } from "./containers/dashboard/dashboard";
import { AccountSignup } from "./containers/signup/accountSignup";
import Header from "./components/header/header";
import { HeaderContainer } from "./containers/header/headerContainer";

const App = () => {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route exact path="/" element={<div>Welcome to hellvan</div>} />
            <Route exact path="/signup" element={<AccountSignup />} />
            <Route exact path="/unauthorized" element={<Unauthorized />} />

            <Route element={<RequireWallet />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Header>
        <HeaderContainer/>
      </BrowserRouter>
    </WalletProvider>
  );
};

export default App;
