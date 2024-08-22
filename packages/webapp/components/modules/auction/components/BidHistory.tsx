import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, Flex,
  useDisclosure
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

import { AuctionBidFragment } from '@subgraph-generated/base'

import { AllBids } from './AllBids'

/*const AnimatedModal = dynamic(() => import('src/components/Modal/AnimatedModal'), {
  ssr: false,
})*/

export const BidHistory = ({ bids }: { bids: AuctionBidFragment[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        fontSize={18}
        width={'100%'}
        variant="secondary"
        borderRadius="curved"
        h="x14"
        onClick={onOpen}
      >Bid history
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>All Bids</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AllBids bids={bids} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>

      </Modal>
    </>
  )
}

export const ActionsWrapper = ({ children }: { children: ReactNode }) => (
  <Flex direction="column" align="center" mt={"5px"}>
    {children}
  </Flex>
)
