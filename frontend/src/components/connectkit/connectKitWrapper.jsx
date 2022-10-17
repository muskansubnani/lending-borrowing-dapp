import React, { useEffect } from "react";
import { ConnectKitButton, ConnectKitProvider } from "connectkit";
import { useAccount } from "wagmi";
import { Navigate, useNavigate } from "react-router";
import { AccountSignup } from "../../containers/signup/accountSignup";
import { Flex, Spacer, Box, Heading } from "@chakra-ui/react";

export const ConnectKitWrapper = () => {
  const { address } = useAccount();
  const navigation = useNavigate();
  let subscriberType = "borrower"; //get contractType from contract

  useEffect(() => {
    if (address) {
      if (subscriberType === "lenderer") {
        navigation("/dashboard");
      } else if (subscriberType === "borrower") {
        navigation("/dashboard");
      }
    }
  }, [address]);

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md" />
        </Box>
        <Spacer />
        <ConnectKitButton />
      </Flex>
      {address && subscriberType === undefined && <AccountSignup />}
    </>
  );
};
