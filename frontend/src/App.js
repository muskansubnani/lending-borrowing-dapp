import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Container } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Header } from "./containers/header";
import { Card } from "./components/card";
import { NavigationRoutes } from "./containers/navigation/routes";

export function App() {
  const { address } = useAccount();

  const navigation = useNavigate();

  useEffect(() => {
    let subscriberType = "lenderer";

    if (!subscriberType) {
      navigation("/signup");
    } else if (subscriberType === "lenderer") {
      console.log(subscriberType);
      navigation("/lenderer");
    } else {
      navigation("/borrower");
    }

    // let provider = ethers.getDefaultProvider();
    // let contract = new ethers.Contract(contractAddress, [], provider);
    // let subscriberType = await contract.getValue();

    //check to see what page to show
    //if hes not with us give him 2 options to sign up
    //if hes lenderer - show lender page
    //if hes borrower - show borrowers page+
  }, [address]);

  return (
    <Container p="6">
      <NavigationRoutes />
      <Header />
      {address && <div>{address}</div>}
      {address && <Card />}
    </Container>
  );
}

export default App;