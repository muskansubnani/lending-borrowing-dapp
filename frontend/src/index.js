import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createClient, WagmiConfig, chain, configureChains } from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import { infuraProvider } from "wagmi/providers/infura";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";

window.Buffer = require("buffer/").Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    infuraProvider({
      apiKey: process.env.REACT_APP_INFURA_API_KEY,
      priority: 0,
    }),
    alchemyProvider({
      apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
      priority: 1,
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Lending Borrowing Dapp",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

root.render(
  <ChakraProvider>
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </ChakraProvider>
);
