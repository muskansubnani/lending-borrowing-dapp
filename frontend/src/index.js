import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createClient, WagmiConfig } from 'wagmi';
import { connectors } from './components/connectors';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = createClient({
  autoConnect: true,
  connectors
});

root.render(
  <React.StrictMode>
    <WagmiConfig client = {client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);