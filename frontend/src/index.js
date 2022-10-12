import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createClient, WagmiConfig } from 'wagmi';
import { connectors } from './components/connectors';
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";

window.Buffer = require("buffer/").Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
  }),
);

root.render(
  <React.StrictMode>
    <WagmiConfig client = {client}>
      <ConnectKitProvider>
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);