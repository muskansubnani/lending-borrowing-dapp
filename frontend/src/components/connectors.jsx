import { configureChains, defaultChains } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";

const infuraId = process.env.INFURA_ID; //get infura id 

const { chains } = configureChains(defaultChains, [
  infuraProvider({ infuraId }),
  publicProvider(),
]);

export const connectors = [
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: "dapp",
    },
  }),

  new WalletConnectConnector({
    chains,
    options: {
      infuraId,
      qrcode: true,
    },
  }),

  new MetaMaskConnector({
    chains,
  }),

  // new InjectedConnector({
  //   chains,
  //   options: {
  //     name: "Injected",
  //     shimDisconnect: true,
  //   },
  // }),
];