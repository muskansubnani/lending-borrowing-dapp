import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createClient, WagmiConfig,  chain , configureChains } from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {RainbowKitProvider, getDefaultWallets} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

window.Buffer = require("buffer/").Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
const alchemyId = "6p1MspeAjewc6OFKGF_nRC51i9_lWjPi";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli, chain.optimism, chain.arbitrum, chain.localhost],
  [
    alchemyProvider(alchemyId),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Lending Borrowing Dapp',
  chains
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider
})

root.render(
  <React.StrictMode>
      <ChakraProvider>
        <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
            <App />
        </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
  </React.StrictMode>
);
