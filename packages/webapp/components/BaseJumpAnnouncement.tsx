import { useEffect, useState } from "react";
import TextLink from "./TextLink";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Link as ExternalLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

const baseLink = "https://nouns.build/dao/base/0x880Fb3Cf5c6Cc2d7DFC13a993E839a9411200C17";

export const BaseAnnouncementModal = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    const timestamp = localStorage.getItem("modalLastOpened");
    const now = new Date().getTime();

    // Open modal on the first visit or if it hasn't been opened in the last 24 hours
    if (!timestamp || (now - parseInt(timestamp, 10) > 24 * 60 * 60 * 1000 && !hasOpened)) {
      onOpen();
      localStorage.setItem("modalLastOpened", now.toString());
      setHasOpened(true);
    }
  }, [onOpen, setHasOpened, hasOpened]);

  return (
    <Modal
      {...props}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
      closeOnEsc
      closeOnOverlayClick
    >
      <ModalOverlay />
      <ModalContent m={4} p={{ base: 2, sm: 4 }} maxW={"xl"} w={{ base: "full", sm: "xl" }} color={"chakra-body-text"}>
        <ModalHeader textAlign={"center"} textStyle={"h2"}>
          Gnars have BASE JUMPED!
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <VStack spacing={10}>
            <VStack alignItems={"start"} spacing={0} alignSelf={"start"}>
              <Text>
                We&#39;re currently updating this site to be fully operational on Base. In the meantime, auctions and
                governance are live on Base <TextLink href={baseLink}>here</TextLink>.
              </Text>
              <br />
              <Text>
                If you owned Gnars V2 on mainnet at{" "}
                <TextLink href="https://etherscan.io/block/19325750">block 19325750</TextLink>, you were airdropped the
                equivalent Gnars on Base <b>(check your hidden folder on OpenSea)</b>.
              </Text>
              <br />
              <Text>Stay tuned. Stay gnarly. ⌐◨-◨</Text>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ExternalLink href={baseLink} isExternal rel="noopener noreferrer">
            <Button w={"fit-content"} variant={"outline"} rightIcon={<FiExternalLink />}>
              BASE JUMP!
            </Button>
          </ExternalLink>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const BaseAlertHeader = () => {
  useDisclosure({ defaultIsOpen: true });

  return (
    <Alert variant="solid" style={{ marginBottom: "-40px", flexGrow: 1, alignItems: "center", background: "#FFE762", maxHeight: '150px' }} flexFlow={{ base: 'column', md: 'row' }}>
      <Box flexGrow={1} alignContent={"center"}>
        <AlertTitle textAlign={{ base: "center", md: 'center' }} textStyle={"h2"} py={2}>
          Gnars have BASE JUMPED!
        </AlertTitle>
        <AlertDescription textAlign={"center"}>
          <Text>We&#39;re currently updating this site to be fully operation on Base. Stay tuned. ⌐◨-◨\m/</Text>
        </AlertDescription>
      </Box>
      <Box flexGrow={1} alignContent={{ base: "center", md: "flex-end" }}>
        <ExternalLink isExternal href={baseLink} rel="noopener noreferrer" flexGrow={{ base: 1 }}>
          <Button
            w={"fit-content"}
            variant={"outline"}
            style={{ borderColor: "#1A202C", color: "#1A202C" }}
            rightIcon={<FiExternalLink />}
          >
            BASE JUMP!
          </Button>
        </ExternalLink>
      </Box>
    </Alert>
  );
};
