import { Center, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
      />
      </Center>
  );
};
