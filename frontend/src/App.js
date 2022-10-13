// import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useAccount } from 'wagmi'
import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import { ethers } from "ethers";

export function App() {
  const { address } = useAccount();

  useEffect(() => {
    address && console.log('ive changes', address);

    // let provider = ethers.getDefaultProvider();

    // let contractAddress = "";

    // let contract = new ethers.Contract(contractAddress, [], provider);
    // let subscriberType = await contract.getValue();
    
    // if(!subscriberType) {

    // }
    
    // if(subscriberType === "lenderer") {

    // }

    //check to see what page to show 
    //if hes not with us give him 2 options to sign up
    //if hes lenderer - show lender page
    //if hes borrower - show borrowers page+
  }, [address])
  
  return (
    <>
    <ConnectKitButton></ConnectKitButton>
    <div>{address ?? "Loading address"}</div>;
    </>
  )
}

export default App;
