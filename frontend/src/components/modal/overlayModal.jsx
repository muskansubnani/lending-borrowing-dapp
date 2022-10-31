import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  Container,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { useNft } from './../../data/context/nftContext';

export const OverlayModal = ({ modalData, buttonText, title, size }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSelectedNft } = useNft();

  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const onNftSelected = (nft) => {
    setSelectedNft(nft);
    onClose();
  };

  return (
    <>
      <Button color="black" maxW="md" onClick={onOpen}>
        {buttonText}
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={size}>
        <Overlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              {!modalData && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
              <VStack>
                <Wrap spacing={4}>
                  {modalData &&
                    modalData.map((nft) => (
                      <WrapItem>
                        <Button
                          colorScheme="blackAlpha"
                          onClick={() => onNftSelected(nft)}
                        >
                          tokenId:{nft.tokenId}-[{nft.contractAddress}
                          ] price: {nft.floorPrice}
                        </Button>
                      </WrapItem>
                    ))}
                </Wrap>
              </VStack>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};