import { Button, Container, DarkMode, Divider, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { DelegateButton } from "components/Governance/Delegation/DelegateButton"
import { UserVotes } from "components/Governance/Delegation/UserVotes"
import { isArray, partition } from "lodash"
import Link from "next/link"
import { execute, ProposalsDocument } from "../.graphclient"
import { ProposalCard } from "../components/Governance/ProposalCard"
import Menu from "../components/Menu"
import { useBlock } from "../hooks/useBlock"
import {
  EffectiveProposalStatus,
  getProposalEffectiveStatus,
  getQuorumVotes,
  isFinalized,
  ProposalData,
} from "../utils/governanceUtils"

export default function Proposals() {
  const block = useBlock()
  const { data: proposals } = useQuery(
    ["proposals", block?.number?.toString()],
    () =>
      execute(ProposalsDocument, {})
        .then((r: { data: { proposals: ProposalData[] } }) =>
          r.data.proposals.map((p: ProposalData) => ({
            ...p,
            effectiveStatus: getProposalEffectiveStatus(p, block?.number ?? undefined, block?.timestamp ?? undefined),
          }))
        )
        .then(
          (p: ProposalData & { effectiveStatus: EffectiveProposalStatus }) =>
            partition<ProposalData & { effectiveStatus: EffectiveProposalStatus }>(
              p,
              (p) => !isFinalized(p.effectiveStatus)
            ) as [
              ProposalData & { effectiveStatus: EffectiveProposalStatus }[],
              ProposalData & { effectiveStatus: EffectiveProposalStatus }[]
            ]
        ),
    { keepPreviousData: true }
  )
  return (
    <DarkMode>
      <VStack flexGrow={1} w={"full"} color={"chakra-body-text"} spacing={6}>
        <Menu />
        <Container centerContent maxW={"container.lg"} flexGrow={1}>
          <VStack w="full" spacing={20}>
            <Heading>Governance</Heading>
            <Stack
              direction={{ base: "column", sm: "row" }}
              w="full"
              justifyContent={{ base: "center", sm: "space-between" }}
              alignContent={{ base: "center", sm: "end" }}
            >
              <Heading as={"h2"} fontSize="5xl">
                Proposals
              </Heading>
              <Stack direction={{ base: "column", sm: "row" }} alignItems={{ sm: "center" }}>
                <UserVotes mr={{ sm: 4 }} fontSize={"xl"} fontWeight={"bold"} />
                <Link href={"/dao/proposals/new"}>
                  <Button w="full">Propose</Button>
                </Link>
                <DelegateButton />
              </Stack>
            </Stack>
            <VStack w={"full"} spacing={4} alignItems={"center"} py={{ base: 4, lg: 20 }} px={{ base: 4, lg: 20 }}>
              {isArray(proposals) && (
                <>
                  {proposals[0].length > 0 && (
                    <>
                      <HStack w="full" pb={10}>
                        <Divider />
                        <Heading as={"h3"} fontSize="4xl">
                          ACTIVE
                        </Heading>
                        <Divider />
                      </HStack>
                      {proposals[0].map((prop: ProposalData & { effectiveStatus: EffectiveProposalStatus }) => (
                        <Link
                          key={"active-prop-" + prop.id}
                          href={`/dao/proposals/${prop.id}`}
                          style={{ width: "100%" }}
                        >
                          <ProposalCard
                            id={prop.id}
                            title={prop.title}
                            titleProps={{ noOfLines: 2 }}
                            status={prop.effectiveStatus}
                            quorumVotes={getQuorumVotes(prop)}
                            votes={{
                              abstainVotes: prop.abstainVotes,
                              forVotes: prop.forVotes,
                              againstVotes: prop.againstVotes,
                              totalSupply: prop.totalSupply,
                            }}
                            startBlock={prop.startBlock}
                            endBlock={prop.endBlock}
                            executionETA={prop.executionETA}
                            _hover={{
                              borderColor: "whiteAlpha.500",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                      ))}
                    </>
                  )}
                  {proposals[1].length > 0 && (
                    <>
                      <HStack w="full" color={"gray.300"} py={10}>
                        <Divider />
                        <Heading as={"h3"} fontSize="4xl">
                          FINALIZED
                        </Heading>
                        <Divider />
                      </HStack>
                      {proposals[1].map((prop: ProposalData & { effectiveStatus: EffectiveProposalStatus }) => (
                        <Link
                          key={"finalized-prop-" + prop.id}
                          href={`/dao/proposals/${prop.id}`}
                          style={{ width: "100%" }}
                        >
                          <ProposalCard
                            id={prop.id}
                            title={prop.title}
                            titleProps={{ noOfLines: 2 }}
                            status={prop.effectiveStatus}
                            quorumVotes={getQuorumVotes(prop)}
                            votes={{
                              abstainVotes: prop.abstainVotes,
                              forVotes: prop.forVotes,
                              againstVotes: prop.againstVotes,
                              totalSupply: prop.totalSupply,
                            }}
                            startBlock={prop.startBlock}
                            endBlock={prop.endBlock}
                            executionETA={prop.executionETA}
                            _hover={{
                              borderColor: "whiteAlpha.500",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                      ))}
                    </>
                  )}
                  {proposals[0].length === 0 && proposals[1].length === 0 && <Text>No proposals yet</Text>}
                </>
              )}
            </VStack>
          </VStack>
        </Container>
      </VStack>
    </DarkMode>
  )
}
