import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Spacer } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Navigate, useNavigate } from "react-router";
import React, { useEffect } from "react";

const Header = ({ children }) => {
  const navigation = useNavigate();
  let subscriberType = undefined; //get contractType from contract null | borrower | lenderer
  const { address } = useAccount();

  useEffect(() => {
    // if (address) {
    //   if (subscriberType === "lenderer") {
    //     navigation("/dashboard");
    //   } else if (subscriberType === "borrower") {
    //     navigation("/dashboard");
    //   }
    // }
    navigation("/signup");

  }, [address]);

  return (
    <div>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Spacer />
        <ConnectButton />
      </Flex>

      <div>
        {children}
      </div>
    </div>
  );
};

export default Header;
