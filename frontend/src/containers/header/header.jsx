import { ConnectKitButton } from "connectkit";
import { Flex, Spacer, Box, Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md"/>
      </Box>
      <Spacer />
      <ConnectKitButton />
    </Flex>
  );
};