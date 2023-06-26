import {
  Badge,
  Box,
  HStack,
  StackProps,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react"
import { FC } from "react"
import {
  EffectiveProposalStatus,
  isFinalized,
  QuorumVotes,
  Votes,
} from "../../utils/governanceUtils"
import { ProposalCountdown } from "./ProposalCountdown"
import { ProposalStatusBadge } from "./ProposalStatusBadge"

export interface ProposalCardProps extends StackProps {
  id: string
  title: string
  status: EffectiveProposalStatus
  quorumVotes?: QuorumVotes
  votes?: Votes
  executionETA?: number
  startBlock?: number
  endBlock?: number
}

export const ProposalCard: FC<ProposalCardProps> = ({
  id,
  title,
  status,
  quorumVotes,
  votes,
  startBlock,
  endBlock,
  executionETA,
  children,
  ...props
}) => {
  const proposalFinalized = isFinalized(status)
  return (
    <VStack
      w={"full"}
      borderWidth={1}
      borderBottomColor={"transparent"}
      borderRightColor={"transparent"}
      borderRadius={"md"}
      pb={4}
      overflow={"clip"}
      bgColor={"blackAlpha.300"}
      {...props}
    >
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"start"}
        py={0}
      >
        <Box pt={"6px"} pl={8}>
          <Badge
            display={"inline-block"}
            color={"whiteAlpha.600"}
            bgColor={"whiteAlpha.100"}
            variant={"subtle"}
            px={4}
            mr={2}
            ml={-8}
            fontSize={"md"}
            borderRightRadius={"md"}
            fontWeight={"bold"}
          >
            {id}
          </Badge>
          <Text
            lineHeight={1.8}
            hideBelow={"sm"}
            display={"inline"}
            fontSize={"2xl"}
            fontWeight={"semibold"}
            pl={"16px"}
            // textIndent={"-16px"}
          >
            {title}
          </Text>
        </Box>

        <VStack alignItems={"end"} spacing={1}>
          <ProposalStatusBadge
            w={44}
            py={1}
            flexShrink={0}
            borderRadius={0}
            borderTopRightRadius={"md"}
            borderBottomLeftRadius={"2xl"}
            status={status}
          />
          {startBlock && endBlock && (
            <ProposalCountdown
              effectiveStatus={status}
              startBlock={startBlock}
              endBlock={endBlock}
              executionETA={executionETA}
            />
          )}
        </VStack>
      </HStack>
      <Text
        hideFrom={"md"}
        px={4}
        fontSize={"xl"}
        fontWeight={"semibold"}
        lineHeight={1.8}
      >
        {title}
      </Text>
      {votes && !proposalFinalized && status !== "PENDING" && (
        <HStack
          opacity={proposalFinalized ? 0 : 1}
          _hover={{ opacity: 1 }}
          w={"full"}
          h={proposalFinalized ? "2px" : "10px"}
          bgColor={"whiteAlpha.50"}
          spacing={0}
        >
          <Tooltip
            hasArrow
            color={"white"}
            bgColor={"governance.vote.for"}
            label={`${votes.forVotes} FOR`}
          >
            <Box
              h={"full"}
              bgColor={"governance.vote.for"}
              w={`${(100 * votes.forVotes) / votes.totalSupply}%`}
            />
          </Tooltip>
          {quorumVotes && (
            <Tooltip
              hasArrow
              color={"white"}
              bgColor={"governance.quorum"}
              label={`${quorumVotes.current} REQUIRED`}
            >
              <Box
                h={"full"}
                opacity={0.5}
                bgColor={"governance.quorum"}
                w={`${
                  (100 * Math.max(quorumVotes.current - votes.forVotes, 0)) /
                  votes.totalSupply
                }%`}
              />
            </Tooltip>
          )}
          <Box h={"full"} flexGrow={1} />

          <Tooltip
            hasArrow
            color={"white"}
            bgColor={"governance.vote.abstain"}
            label={`${votes.abstainVotes} ABSTAIN`}
          >
            <Box
              h={"full"}
              bgColor={"governance.vote.abstain"}
              w={`${(100 * votes.abstainVotes) / votes.totalSupply}%`}
            />
          </Tooltip>
          <Box h={"full"} flexGrow={1} />
          <Tooltip
            hasArrow
            color={"white"}
            bgColor={"governance.vote.against"}
            label={`${votes.againstVotes} AGAINST`}
          >
            <Box
              h={"full"}
              bgColor={"governance.vote.against"}
              w={`${(100 * votes.againstVotes) / votes.totalSupply}%`}
            />
          </Tooltip>
        </HStack>
      )}
      {children}
    </VStack>
  )
}
