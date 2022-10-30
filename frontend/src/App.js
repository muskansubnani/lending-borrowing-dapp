import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RequireWallet, WalletProvider } from "./data/context/walletContext";
import Unauthorized from "./components/unauthorized/unauthorized";
import { Dashboard } from "./containers/dashboard/dashboard";
import { AccountSignup } from "./containers/signup/accountSignup";
import Header from "./components/header/header";
import { HeaderContainer } from "./containers/header/headerContainer";
import { Home } from "./containers/home/home";
import { Supplies } from './containers/supplies/supplies';
import { Loans } from './containers/loans/loans';
import { History } from './containers/history/history';
import { Faq } from './containers/faq/faq';

const App = () => {
  return (
    <WalletProvider>
      <BrowserRouter>
      <Dashboard>
        <Header>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<AccountSignup />} />
              <Route exact path="/unauthorized" element={<Unauthorized />} />
              <Route exact path="/faq" element={<Faq />} />

              <Route element={<RequireWallet />}>
                <Route exact path="/supplies" element={<Supplies />} />
                <Route exact path="/loans" element={<Loans />} />
                <Route exact path="/history" element={<History />} />
              </Route>
            </Routes>
        </Header>
        </Dashboard>
        <HeaderContainer />
      </BrowserRouter>
    </WalletProvider>
  );
};

export default App;
