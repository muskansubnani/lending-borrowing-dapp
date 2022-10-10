import { useConnect, useDisconnect  } from "wagmi";

function App() {
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

  return (
    <div className="App">
      <button onClick={() => { connect({ connector: connectors[0] }) }}>Coinbase Wallet</button>
      <button onClick={() => { connect({ connector: connectors[1] }) }}>Wallet Connect</button>
      <button onClick={() => { connect({ connector: connectors[2] }) }}>Metamask</button>
      
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}

export default App;