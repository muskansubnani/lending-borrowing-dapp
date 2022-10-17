import React from "react";
import { Routes, Route } from "react-router-dom";
import { AccountSignup } from "./../signup/accountSignup";
import { Dashboard } from "./../dashboard/dashboard";

export const NavigationRoutes = () => {
  return (
    <Routes>
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/signup" element={<AccountSignup />} />
    </Routes>
  );
};
