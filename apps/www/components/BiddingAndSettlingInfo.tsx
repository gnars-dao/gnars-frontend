import {
  Box,
  Button,
  DarkMode,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
import { FC } from "react"
import { FaInfoCircle } from "react-icons/all"

interface BiddingAndSettlingModalProps {}

export const BiddingAndSettlingInfo: FC<BiddingAndSettlingModalProps> = ({}) => {
  const { isOpen, onClose, getButtonProps } = useDisclosure()
  return (
    <>
      <Button
        color={"chakra-body-text"}
        size={"sm"}
        leftIcon={<FaInfoCircle />}
        variant={"link"}
        {...getButtonProps()}
      >
        bidding and settling
      </Button>
      <DarkMode>
        <Modal
          scrollBehavior={"inside"}
          closeOnEsc
          closeOnOverlayClick
          size={"2xl"}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent mx={2}>
            <ModalHeader textStyle={"h2"} textAlign={"center"}>
              Bidding and Settling
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack alignItems={"start"} spacing={10}>
                <VStack alignItems={"start"}>
                  <Heading fontSize={"4xl"}>Settlement</Heading>
                  <Text>
                    Anyone can settle an auction. When an auction ends, a
                    gas-only transaction is required to start the next auction
                    and mint the current Gnar to the winner’s wallet. As gas
                    prices fluctuate, the cost of settlement also fluctuates.
                    Cost of settlement for every Gnar ID ending in 6 is higher
                    as it consumes more gas. This is due to the transaction also
                    triggering the free Gnar mint: all Gnars ending in 7 are
                    sent to the treasury and held on behalf of the Nouns
                    Athletes.
                  </Text>
                </VStack>
                <VStack alignItems={"start"}>
                  <Heading fontSize={"4xl"}>Bids</Heading>
                  <Text>
                    Once an auction starts, everyone has 10 minutes to bid
                    (auction duration doubles every 1000 auctions from #627
                    onwards). Anyone can bid an amount at/above 0.011 ETH. If
                    your bid is outbid by someone else, the full amount of your
                    bid (minus gas spent to bid) is returned to you in the same
                    transaction as the new higher bid.
                  </Text>
                  <Text>
                    Bids at the very last minute DO NOT increase the auction
                    time. Instead, you have the opportunity to snipe the auction
                    with a winning bid during the final moments. Sometimes,
                    multiple bids are sent at the same time, but only one will
                    be accepted by the auction house contract.
                  </Text>
                </VStack>
                <VStack alignItems={"start"}>
                  <Heading fontSize={"4xl"}>Bid Refunds</Heading>
                  <Text>
                    Unsuccessful bids are refunded in full. Refunds are sent via
                    an internal transaction included in the transaction of a new
                    higher bid. This means that refunds for unsuccessful bids
                    occur when a higher bid is received.
                  </Text>
                </VStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </DarkMode>
    </>
  )
}
