import {
  Button,
  ButtonProps,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { AvatarWallet } from "components/AvatarWallet"
import { BigNumber } from "ethers"
import { find } from "lodash"
import { FC, useCallback, useMemo, useState } from "react"
import { DetailedProposalData, Support } from "utils/governanceUtils"
import {
  useGnarsDaoCastVote,
  useGnarsDaoCastVoteWithReason,
  useGnarsV2TokenGetPriorVotes,
} from "utils/sdk"
import { useAccount } from "wagmi"

export interface VoteActionProps extends ButtonProps {
  proposal?: DetailedProposalData
}

export const VoteAction: FC<VoteActionProps> = ({ proposal, ...props }) => {
  const toast = useToast()
  const { address } = useAccount()
  const { data: accountVotesOnProp } = useGnarsV2TokenGetPriorVotes({
    args: [address!, proposal?.createdBlock],
    enabled: !!address && proposal?.createdBlock,
    cacheTime: Infinity,
    staleTime: Infinity,
  })
  const [reason, setReason] = useState<string>("")
  const [isVotingSupport, setIsVotingSupport] = useState<Support | undefined>()
  const accountVote = useMemo(
    () =>
      find(
        proposal?.votes,
        (v) => v.voter.id.toLowerCase() === address?.toLowerCase()
      ),

    [proposal?.votes, address]
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { writeAsync: voteWithoutReason } = useGnarsDaoCastVote({
    mode: "recklesslyUnprepared",
  })

  const { writeAsync: voteWithReason } = useGnarsDaoCastVoteWithReason({
    mode: "recklesslyUnprepared",
  })

  const isVoting = isVotingSupport !== undefined
  const propId = BigNumber.from(proposal?.id ?? 0)
  const vote = useCallback(
    (support: Support) => {
      if (propId.isZero()) return
      setIsVotingSupport(support)

      return (
        reason.length > 0
          ? voteWithReason({
              recklesslySetUnpreparedArgs: [propId, support, reason],
            })
          : voteWithoutReason({
              recklesslySetUnpreparedArgs: [propId, support],
            })
      )
        .then((tx) => tx.wait())
        .then(() => {
          toast({ status: "success", title: "Vote submitted" })
          onClose()
        })
        .catch((e) => {
          toast({
            status: "error",
            title: "Vote failed",
            description: "Check your wallet for details",
          })
          console.error(e)
        })
        .finally(() => {
          setIsVotingSupport(undefined)
        })
    },
    [
      reason,
      setIsVotingSupport,
      voteWithReason,
      voteWithoutReason,
      propId,
      onClose,
      toast,
    ]
  )

  const canVote = accountVotesOnProp && accountVotesOnProp.gt(0)

  if (!address || !proposal || !canVote) return <></>

  const hasVoted = !!accountVote

  const color = getColor(accountVote?.supportDetailed)

  if (hasVoted) {
    return (
      <Stack
        alignItems={"end"}
        direction={{ base: "row", md: "column" }}
        spacing={{ base: 2, md: 0 }}
        fontWeight={"bold"}
      >
        <Text fontSize={{ base: "md", md: "xs" }} color={"whiteAlpha.400"}>
          YOU VOTED
        </Text>
        <Text color={color}>
          {`${accountVotesOnProp} ${Support[
            accountVote?.supportDetailed
          ].toUpperCase()}`}
        </Text>
      </Stack>
    )
  }

  return (
    <>
      <Button
        isDisabled={hasVoted}
        variant={"subtle"}
        onClick={onOpen}
        {...props}
      >
        Vote
      </Button>
      {!hasVoted && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            m={4}
            p={{ base: 2, sm: 4 }}
            maxW={"xl"}
            w={{ base: "full", sm: "xl" }}
            color={"chakra-body-text"}
          >
            <ModalHeader textAlign={"center"}>
              <ModalCloseButton />
              Vote on proposal #{proposal.id}
            </ModalHeader>
            <ModalBody>
              <VStack spacing={10}>
                <VStack alignItems={"start"} spacing={0} alignSelf={"start"}>
                  <Text fontWeight={"bold"}>Voting with:</Text>
                  <AvatarWallet address={address} />
                  {accountVotesOnProp && (
                    <Text
                      fontWeight={"bold"}
                    >{`${accountVotesOnProp} votes`}</Text>
                  )}
                </VStack>
                <FormControl>
                  <FormLabel>Reason (optional)</FormLabel>
                  <Textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={"Why are you voting this way?"}
                    minH={24}
                  />
                </FormControl>
                <SimpleGrid
                  gap={2}
                  columns={{ base: 1, sm: 3 }}
                  w={"full"}
                  alignItems={"stretch"}
                >
                  <Button
                    colorScheme={"green"}
                    isLoading={isVoting && isVotingSupport === Support.For}
                    loadingText={"Voting for"}
                    isDisabled={isVoting}
                    onClick={() => vote(Support.For)}
                  >
                    Vote for
                  </Button>
                  <Button
                    colorScheme={"gray"}
                    isLoading={isVoting && isVotingSupport === Support.Abstain}
                    loadingText={"Abstaining"}
                    onClick={() => vote(Support.Abstain)}
                    isDisabled={isVoting}
                  >
                    Abstain
                  </Button>
                  <Button
                    isLoading={isVoting && isVotingSupport === Support.Against}
                    loadingText={"Voting against"}
                    onClick={() => vote(Support.Against)}
                    colorScheme={"red"}
                    isDisabled={isVoting}
                  >
                    Vote against
                  </Button>
                </SimpleGrid>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

const getColor = (support?: Support) => {
  switch (support) {
    case Support.For:
      return "green"
    case Support.Against:
      return "red"
    case Support.Abstain:
      return "gray"
    default:
      return "gray"
  }
}
