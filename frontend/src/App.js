import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Container } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Header } from "./containers/header";
import { Card } from "./components/card";

export function App() {
  const { address } = useAccount();

  const navigation = useNavigate();

  useEffect(() => {
    address && console.log("ive changes", address);

    let subscriberType = "lenderer";

    if (subscriberType) {
      navigation("");
    }

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
  }, [address]);

  return (
    <Container p='6'>
      <Header />
      {address && <div>{address}</div>}
      {address && <Card />}
    </Container>
  );
}

// const Navigation = () => {
//   return (
//     <nav
//       style={{
//         borderBottom: 'solid 1px',
//         paddingBottom: '1rem',
//       }}
//     >
//       <Link to="/home">Home</Link>
//       <Link to="/users">Users</Link>
//     </nav>
//   );
// };

export default App;
