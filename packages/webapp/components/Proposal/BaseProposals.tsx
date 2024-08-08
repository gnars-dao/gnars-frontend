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
import { ProposalsResponse } from "@queries/base/requests/proposalsQuery.ts"

const BaseProposals: FC<ProposalsResponse> = ({ proposals }) => {
  if (!isArray(proposals)) return null

  const activeProposals = proposals?.filter(({ state }) => state === ProposalState.Active) || []
  const inactiveProposals = proposals?.filter(({ state }) => state !== ProposalState.Active) || []
  return (
    <VStack w={"full"} spacing={4} alignItems={"center"} py={{ base: 4, lg: 20 }} px={{ base: 4, lg: 20 }}>
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
          <UserVotes mr={{ sm: 4 }} fontSize={"xl"} fontWeight={"bold"} />
          <Link href={"/dao/proposals/new"}>
            <Button w="full">Submit Proposal</Button>
          </Link>
          <DelegateButton />
        </Stack>
      </Stack>
      <VStack w={"full"} spacing={4} alignItems={"center"} py={{ base: 4, lg: 20 }} px={{ base: 4, lg: 20 }}>
        {activeProposals.map(prop => (
          <Link
            key={"active-base-prop-" + prop.proposalNumber}
            href={`/dao/proposals/${prop.proposalNumber}`}
            style={{ width: "100%" }}
          >
            <ProposalCard
              id={String(prop.proposalNumber)}
              title={prop.title as string}
              titleProps={{ noOfLines: 2 }}
              baseState={parseState(prop.state)}
              // quorumVotes={getQuorumVotes(prop)}
              votes={{
                abstainVotes: prop.abstainVotes,
                forVotes: prop.forVotes,
                againstVotes: prop.againstVotes,
                totalSupply: prop.totalSupply
              }}
              startBlock={prop.startBlock}
              endBlock={prop.endBlock}
              executionETA={prop.executionETA}
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
                href={`/dao/proposals/base/${prop.proposalNumber}`}
                style={{ width: "100%" }}
              >
                <ProposalCard
                  id={prop.proposalNumber}
                  title={prop.title}
                  titleProps={{ noOfLines: 2 }}
                  baseState={prop.baseState}
                  // quorumVotes={getQuorumVotes(prop)}
                  votes={{
                    abstainVotes: prop.abstainVotes,
                    forVotes: prop.forVotes,
                    againstVotes: prop.againstVotes,
                    totalSupply: prop.totalSupply
                  }}
                  startBlock={prop.startBlock}
                  endBlock={prop.endBlock}
                  executionETA={prop.executionETA}
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
