import {
  Badge,
  Box,
  HStack,
  StackProps,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import { ProposalsQuery } from "../../.graphclient"
import { useBlock } from "../../hooks/useBlock"
import { FC } from "react"
import {
  getProposalEffectiveStatus,
  getQuorumVotes,
  isFinalized,
} from "../../utils/governanceUtils"
import { ProposalStatusBadge } from "./ProposalStatusBadge"
import { ProposalCountdown } from "./ProposalCountdown"

export interface ProposalCardProps extends StackProps {
  proposal: ProposalsQuery["proposals"][0]
}

export const ProposalCard: FC<ProposalCardProps> = ({
  proposal,
  children,
  ...props
}) => {
  const block = useBlock()
  const effectiveStatus = getProposalEffectiveStatus(
    proposal,
    block?.number,
    block?.timestamp
  )

  const proposalFinalized = isFinalized(effectiveStatus)
  const quorumVotes = getQuorumVotes(proposal)
  const isMobile = useBreakpointValue([true, false]) ?? true
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
            {proposal.id}
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
            {proposal.title}
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
            status={effectiveStatus}
          />
          <ProposalCountdown
            effectiveStatus={effectiveStatus}
            proposal={proposal}
          />
        </VStack>
      </HStack>
      <Text
        hideFrom={"sm"}
        px={4}
        fontSize={"xl"}
        fontWeight={"semibold"}
        lineHeight={1.8}
      >
        {proposal.title}
      </Text>
      {!proposalFinalized && effectiveStatus !== "PENDING" && (
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
            bgColor={"green.500"}
            label={`${proposal.forVotes} FOR`}
          >
            <Box
              h={"full"}
              bgColor={"green.500"}
              w={`${
                (100 * parseInt(proposal.forVotes)) / proposal.totalSupply
              }%`}
            />
          </Tooltip>
          <Tooltip
            hasArrow
            color={"white"}
            bgColor={"green.900"}
            label={`${quorumVotes.current} REQUIRED`}
          >
            <Box
              h={"full"}
              opacity={0.5}
              bgColor={"green.900"}
              w={`${
                (100 *
                  Math.max(
                    quorumVotes.current - parseInt(proposal.forVotes),
                    0
                  )) /
                proposal.totalSupply
              }%`}
            />
          </Tooltip>
          <Box h={"full"} flexGrow={1} />

          <Tooltip
            hasArrow
            color={"white"}
            bgColor={"gray.500"}
            label={`${proposal.abstainVotes} ABSTAIN`}
          >
            <Box
              h={"full"}
              bgColor={"gray.500"}
              w={`${
                (100 * parseInt(proposal.abstainVotes)) / proposal.totalSupply
              }%`}
            />
          </Tooltip>
          <Box h={"full"} flexGrow={1} />
          <Tooltip
            hasArrow
            color={"white"}
            bgColor={"red.400"}
            label={`${proposal.againstVotes} AGAINST`}
          >
            <Box
              h={"full"}
              bgColor={"red.400"}
              w={`${
                (100 * parseInt(proposal.againstVotes)) / proposal.totalSupply
              }%`}
            />
          </Tooltip>
        </HStack>
      )}
      {children}
    </VStack>
  )
}
