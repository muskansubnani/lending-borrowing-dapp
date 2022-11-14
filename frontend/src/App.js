import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RequireWallet, WalletProvider } from "./data/context/walletContext";
import Unauthorized from "./components/unauthorized/unauthorized";
import { Dashboard } from "./containers/dashboard/dashboard";
import { AccountSignup } from "./containers/signup/accountSignup";
import Header from "./components/header/header";
import { HeaderContainer } from "./containers/header/headerContainer";
import { CreateLending } from "./containers/lendings/createLending";
import { AccountHistory } from "./containers/history/history";
import { Faq } from "./containers/faq/faq";
import { NftProvider } from "./data/context/nftContext";
import { LenderBorrowerContractProvider } from "./data/context/lenderBorrowerContractContext";
import { CreateLoan } from "./containers/loans/createLoan";
import { Transactions } from "./containers/transactions/transactions";

const App = () => {
  return (
    <LenderBorrowerContractProvider>
      <WalletProvider>
        <NftProvider>
          <BrowserRouter>
            <Dashboard>
              <Header>
                <Routes>
                  <Route exact path="/signup" element={<AccountSignup />} />
                  <Route
                    exact
                    path="/unauthorized"
                    element={<Unauthorized />}
                  />
                  <Route exact path="/faq" element={<Faq />} />

                  <Route element={<RequireWallet />}>
                    <Route exact path="/createLoan" element={<CreateLoan />} />
                    <Route
                      exact
                      path="/createlending"
                      element={<CreateLending />}
                    />
                    <Route exact path="/history" element={<AccountHistory/>} />
                    <Route exact path="/transactions" element={<Transactions />} />
                  </Route>
                </Routes>
              </Header>
            </Dashboard>
            <HeaderContainer />
          </BrowserRouter>
        </NftProvider>
      </WalletProvider>
    </LenderBorrowerContractProvider>
  );
};

export default App;
