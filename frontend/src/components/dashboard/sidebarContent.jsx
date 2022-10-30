import {
  Flex,
  Box,
  Text,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { LinkItem } from './linkItem';

export const SidebarContent = ({ linkItems, onClose, ...rest }) => {
  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <LinkItem key={link.name} icon={link.icon} pathName={link.path}>{link.name}</LinkItem>
      ))}
    </Box>
  );
};
