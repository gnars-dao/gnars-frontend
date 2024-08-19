import {
  Button,
  ButtonProps,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react";
import { AvatarWallet } from "components/AvatarWallet";
import { find } from "lodash";
import { FC, useCallback, useMemo, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { DetailedProposalData, Support } from "utils/governanceUtils";
import { useGnarsDaoCastVote, useGnarsDaoCastVoteWithReason, useGnarsV2TokenGetPriorVotes } from "utils/sdk";
import { useAccount } from "wagmi";
import { waitForTransaction } from "wagmi/actions";

export interface VoteActionProps extends ButtonProps {
  proposal?: DetailedProposalData;
}

export const VoteAction: FC<VoteActionProps> = ({ proposal, ...props }) => {
  const toast = useToast();
  const { address } = useAccount();
  const { data: accountVotesOnProp } = useGnarsV2TokenGetPriorVotes({
    args: [address!, proposal?.createdBlock],
    enabled: !!address && proposal?.createdBlock,
    cacheTime: Infinity,
    staleTime: Infinity
  });
  const [reason, setReason] = useState<string>("");
  const [isVotingSupport, setIsVotingSupport] = useState<Support | undefined>();
  const accountVote = useMemo(() => {
    const voteEvent = find(
      proposal?.events,
      (e) => e.kind === "VOTED" && e.from.toLowerCase() === address?.toLowerCase()
    );
    return voteEvent?.vote;
  }, [proposal?.events, address]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { writeAsync: voteWithoutReason } = useGnarsDaoCastVote();

  const { writeAsync: voteWithReason } = useGnarsDaoCastVoteWithReason();

  const isVoting = isVotingSupport !== undefined;
  const propId = BigInt(proposal?.id ?? 0);
  const vote = useCallback(
    (support: Support) => {
      if (propId === 0n) return;
      setIsVotingSupport(support);

      return (
        reason.length > 0
          ? voteWithReason({
              args: [propId, support, reason]
            })
          : voteWithoutReason({
              args: [propId, support]
            })
      )
        .then((tx) => waitForTransaction({ hash: tx.hash }))
        .then(() => {
          toast({ status: "success", title: "Vote submitted" });
          onClose();
        })
        .catch((e) => {
          toast({
            status: "error",
            title: "Vote failed",
            description: "Check your wallet for details"
          });
          console.error(e);
        })
        .finally(() => {
          setIsVotingSupport(undefined);
        });
    },
    [reason, setIsVotingSupport, voteWithReason, voteWithoutReason, propId, onClose, toast]
  );

  const canVote = accountVotesOnProp && accountVotesOnProp > 0;
  const reasonPlacement = useBreakpointValue<PlacementWithLogical>({
    base: "bottom-end",
    sm: "right-end",
    md: "bottom-end"
  });

  if (!address || !proposal || !canVote) return <></>;

  const hasVoted = !!accountVote;

  const color = getColor(accountVote?.supportDetailed);

  if (hasVoted) {
    return (
      <HStack spacing={0}>
        <Stack
          alignItems={"end"}
          direction={{ base: "row", md: "column" }}
          spacing={{ base: 2, md: 0 }}
          fontWeight={"bold"}
        >
          <Text fontSize={{ base: "md", md: "xs" }} color={"whiteAlpha.400"}>
            YOU VOTED
          </Text>
          <Text color={color}>{`${accountVotesOnProp} ${Support[accountVote?.supportDetailed].toUpperCase()}`}</Text>
        </Stack>
        {accountVote?.reason && (
          <Popover offset={[0, 16]} placement={reasonPlacement}>
            <PopoverTrigger>
              <IconButton
                color={"whiteAlpha.500"}
                _hover={{ color: "whiteAlpha.700" }}
                variant={"link"}
                size={"sm"}
                fontSize={"md"}
                aria-label="vote-reason"
                icon={<Icon p={0} as={BiCommentDetail} />}
                verticalAlign={"text-bottom"}
                ml={2}
              />
            </PopoverTrigger>
            <PopoverContent p={6} w={"fit-content"}>
              <PopoverArrow />
              <PopoverBody>
                <Text fontSize={"sm"}>Reason: {accountVote?.reason}</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </HStack>
    );
  }

  return (
    <>
      <Button isDisabled={hasVoted} variant={"subtle"} onClick={onOpen} {...props}>
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
                  <>
                    <Text fontWeight={"bold"}>Voting with:</Text>
                    <AvatarWallet address={address} />
                    {accountVotesOnProp && <Text fontWeight={"bold"}>{`${accountVotesOnProp} votes`}</Text>}
                  </>
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
                <SimpleGrid gap={2} columns={{ base: 1, sm: 3 }} w={"full"} alignItems={"stretch"}>
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
  );
};

const getColor = (support?: Support) => {
  switch (support) {
    case Support.For:
      return "governance.vote.for";
    case Support.Against:
      return "governance.vote.against";
    case Support.Abstain:
      return "governance.vote.abstain";
    default:
      return "gray.500";
  }
};
