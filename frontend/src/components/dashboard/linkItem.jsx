import { Link, Flex, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const LinkItem = ({ pathName, icon, children, ...rest }) => {
  return (
    <Link
      as={RouterLink}
      to={`/${pathName}`}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};