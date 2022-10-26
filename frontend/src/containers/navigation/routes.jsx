import React from "react";
import { Routes, Route } from "react-router-dom";
import { AccountSignup } from "./../signup/accountSignup";
import { Dashboard } from "./../dashboard/dashboard";
import {
  RequireWallet,
  WalletProvider,
} from "../../data/context/walletContext";
import Unauthorized from "./../../components/unauthorized/unauthorized";
import Header from "../../components/header/header";

export const NavigationRoutes = () => {
  return (
    <WalletProvider>
      <Routes>
        <Route element={<Header />}>
          <Route exact path="/signup" element={<AccountSignup />} />
          <Route exact path="/unauthorized" element={<Unauthorized />} />
          
          <Route element={<RequireWallet />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </WalletProvider>
  );
};
