import React from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createClient, WagmiConfig } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { BrowserRouter } from "react-router-dom";

window.Buffer = require("buffer/").Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
  })
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig client={client}>
        <ConnectKitProvider>
          <App />
        </ConnectKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
