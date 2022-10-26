import { configureChains, defaultChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const alchemyId = process.env.ALCHEMY_ID;

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider('8KgUMXBa4YmEhjxfxdpumPk3GHh7jh_0'),
  publicProvider(),
]);

export const connectors = [
  new MetaMaskConnector({ chains }),

  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: "wagmi",
    },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),

  provider,
  webSocketProvider
];