import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Spacer } from "@chakra-ui/react";
import React from "react";

const Header = ({ children }) => {
  return (
    <div>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Spacer />
        <ConnectButton />
      </Flex>

      <div>{children}</div>
    </div>
  );
};

export default Header;
