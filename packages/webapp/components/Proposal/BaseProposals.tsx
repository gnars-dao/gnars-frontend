import {
  Heading,
  VStack, Divider, Text, HStack, Stack, Button
} from "@chakra-ui/react"
import { FC } from "react"
import Link from "next/link"
import { getQuorumVotes, parseState } from "@utils/governanceUtils.ts"
import { ProposalCard } from "@components/Governance/ProposalCard.tsx"
import { UserVotes } from "@components/Governance/Delegation/UserVotes.tsx"
import { DelegateButton } from "@components/Governance/Delegation/DelegateButton.tsx"
import { isArray } from "lodash"
import {
  ProposalState
} from "@data/contract/requests/getProposalState.ts"
import { Proposal } from "@queries/base/requests/proposalQuery.ts"

interface BaseProposalsProps {
  proposals: Proposal[] | undefined
}

const BaseProposals: FC<BaseProposalsProps> = ({ proposals }) => {
  if (!isArray(proposals)) return null

  const isFinalized = (state: ProposalState) => state !== ProposalState.Active && state !== ProposalState.Queued
  const activeProposals = proposals?.filter(({ state }) => !isFinalized(state)) || []
  const inactiveProposals = proposals?.filter(({ state }) => isFinalized(state)) || []
  return (
    <VStack w={"full"} spacing={4} alignItems={"center"} py={{ base: 4, lg: 10 }} px={{ base: 4, lg: 20 }}>
      <Stack
        direction={{ base: "column", sm: "row" }}
        w="full"
        justifyContent={{ base: "center", sm: "space-between" }}
        alignContent={{ base: "center", sm: "end" }}
      >
        <Heading as={"h2"} fontSize="5xl">
          Base Proposals
        </Heading>
        <Stack direction={{ base: "column", sm: "row" }} alignItems={{ sm: "center" }}>
          {/*<UserVotes mr={{ sm: 4 }} fontSize={"xl"} fontWeight={"bold"} /> TODO: Delegation Ticket needed */}
          <Link href={"https://nouns.build/dao/base/0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17?tab=activity"}>
            <Button w="full">New Proposal</Button>
          </Link>
          {/*<DelegateButton /> TODO: Delegation Ticket needed */}
        </Stack>
      </Stack>
      <VStack w={"full"} spacing={4} alignItems={"center"} py={{ base: 4, lg: 20 }} px={{ base: 4, lg: 20 }}>
        <HStack w="full" pb={10}>
          <Divider />
          <Heading as={"h3"} fontSize="4xl">
            ACTIVE
          </Heading>
          <Divider />
        </HStack>
        {activeProposals.map(prop => (
          <Link
            key={"active-base-prop-" + prop.proposalNumber}
            href={`https://nouns.build/dao/base/0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17/vote/${prop.proposalNumber}`}
            style={{ width: "100%" }}
          >
            <ProposalCard
              id={String(prop.proposalNumber)}
              title={prop.title as string}
              titleProps={{ noOfLines: 2 }}
              status={parseState(prop.state).toUpperCase()}
              // quorumVotes={getQuorumVotes(prop)} TODO: Do on the /:id page
              votes={{
                abstainVotes: prop.abstainVotes,
                forVotes: prop.forVotes,
                againstVotes: prop.againstVotes,
                totalSupply: prop.dao?.totalSupply
              }}
              // startBlock={prop.voteStart} TODO: Do on the /:id page
              // endBlock={prop.voteEnd} TODO: Do on the /:id page
              _hover={{
                borderColor: "whiteAlpha.500",
                cursor: "pointer"
              }}
            />
          </Link>))}
        {inactiveProposals.length > 0 && (
          <>
            <HStack w="full" color={"gray.300"} py={10}>
              <Divider />
              <Heading as={"h3"} fontSize="4xl">
                FINALIZED
              </Heading>
              <Divider />
            </HStack>
            {inactiveProposals.map(prop => (
              <Link
                key={"finalized-base-prop-" + prop.proposalNumber}
                href={`https://nouns.build/dao/base/0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17/vote/${prop.proposalNumber}`}
                style={{ width: "100%" }}
              >
                <ProposalCard
                  id={prop.proposalNumber.toString()}
                  title={prop.title as string}
                  titleProps={{ noOfLines: 2 }}
                  status={parseState(prop.state).toUpperCase()}
                  // quorumVotes={getQuorumVotes(prop)} TODO: Do on the /:id page
                  votes={{
                    abstainVotes: prop.abstainVotes,
                    forVotes: prop.forVotes,
                    againstVotes: prop.againstVotes,
                    totalSupply: prop.dao?.totalSupply
                  }}
                  // startBlock={prop.startTime} TODO: how to get? Do on the /:id page
                  // endBlock={prop.endTime} TODO: how to get? Do on the /:id page
                  _hover={{
                    borderColor: "whiteAlpha.500",
                    cursor: "pointer"
                  }}
                />
              </Link>
            ))}
          </>
        )}
        {proposals.length === 0 && <Text>No proposals yet</Text>}
      </VStack>
    </VStack>)
}

export default BaseProposals
