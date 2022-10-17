import React from "react";
import { Routes, Route } from "react-router-dom";
import { Borrower } from "../borrower/borrower";
import { Lenderer } from "../lenderer/lenderer";
import { AccountSignup } from "./../signup/accountSignup";
import { App } from "./../../App";

export const NavigationRoutes = () => {
  console.log("lm");
  return (
    <Routes>
      {/* <Route exact path="/" element={<App />} /> */}
      <Route
        exact path="/signup"
        element={console.log("da") && <AccountSignup />}
      />
      <Route exact path="/borrower" element={<Borrower />} />
      <Route exact path="/lenderer" element={<Lenderer />} />
    </Routes>
  );
};
