import { Button, Container, DarkMode, Divider, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { DelegateButton } from "components/Governance/Delegation/DelegateButton"
import { UserVotes } from "components/Governance/Delegation/UserVotes"
import { isArray, partition } from "lodash"
import Link from "next/link"
import { ProposalsDocument } from "@subgraph-generated/layer-1"
import { ProposalCard } from "@components/Governance/ProposalCard"
import Menu from "@components/Menu"
import BaseProposals from "@components/Proposal/BaseProposals"
import {
  EffectiveProposalStatus,
  getProposalEffectiveStatus,
  getQuorumVotes,
  isFinalized,
  ProposalData
} from "@utils/governanceUtils"
import { contracts } from "@constants"
import { getProposals, ProposalsResponse } from "@queries/base/requests/proposalsQuery"
import { USE_QUERY_KEYS } from "@constants"
import { CHAIN_IDS } from "@constants"
import { useRouter } from "next/router"
import { getLatestBlock } from "@utils/web3"
import { Block } from "viem"
import { graphQLClient } from "@graphql/ssr.client"

export default function Proposals({ ethProposals }) {
  const tokenAddress = contracts.Token.Proxy
  const { query: baseQuery, isReady: baseQueryReady, push } = useRouter()
  const LIMIT = 200
  const page = baseQuery?.page ? Number(baseQuery.page) : undefined
  const { data: baseData, error: baseError } = useQuery(
    [USE_QUERY_KEYS.PROPOSALS, CHAIN_IDS.BASE, tokenAddress, page],
    () => getProposals(CHAIN_IDS.BASE, tokenAddress, LIMIT),
    {
      enabled: baseQueryReady
    }
  )

  if (baseError) {
    console.error("Error getting BASE proposals data: ", baseError)
  }

  return (
    <DarkMode>
      <VStack flexGrow={1} w={"full"} color={"chakra-body-text"} spacing={6}>
        <Menu />
        <Container centerContent maxW={"container.lg"} flexGrow={1}>
          <VStack w="full" spacing={20}>
            <Heading>Governance</Heading>
            <BaseProposals proposals={baseData?.proposals} />
            <VStack w={"full"} spacing={4} alignItems={"center"} py={{ base: 4, lg: 10 }} px={{ base: 4, lg: 20 }}>
              <Heading as={"h2"} fontSize="5xl">
                Ethereum Proposals
              </Heading>
              <Stack
                direction={{ base: "column", sm: "row" }}
                w="full"
                justifyContent={{ base: "center", sm: "space-between" }}
                alignContent={{ base: "center", sm: "end" }}
              >
                {/*<Stack direction={{ base: "column", sm: "row" }} alignItems={{ sm: "center" }}> TODO: Delegation Ticket needed*/}
                {/*  <UserVotes mr={{ sm: 4 }} fontSize={"xl"} fontWeight={"bold"} />*/}
                {/*</Stack>*/}
              </Stack>
              {isArray(ethProposals) && (
                <>
                  {ethProposals[0].length > 0 && (
                    <>
                      <HStack w="full" pb={10}>
                        <Divider />
                        <Heading as={"h3"} fontSize="4xl">
                          ACTIVE
                        </Heading>
                        <Divider />
                      </HStack>
                      {ethProposals[0].map((prop: ProposalData & { effectiveStatus: EffectiveProposalStatus }) => (
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
                  {ethProposals[1].length > 0 && (
                    <>
                      <HStack w="full" color={"gray.300"} py={10}>
                        <Divider />
                        <Heading as={"h3"} fontSize="4xl">
                          FINALIZED
                        </Heading>
                        <Divider />
                      </HStack>
                      {ethProposals[1].map((prop: ProposalData & { effectiveStatus: EffectiveProposalStatus }) => (
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
                  {ethProposals[0].length === 0 && ethProposals[1].length === 0 && <Text>No proposals yet</Text>}
                </>
              )}
            </VStack>
          </VStack>
        </Container>
      </VStack>
    </DarkMode>
  )
}

export async function getServerSideProps() {
  const block: Block | undefined = await getLatestBlock()
  try {
    const ethProposals = await fetchEthProposals(block)
    return {
      props: {
        ethProposals
      }
    }
  } catch (err) {
    console.error("Error getting Ethereum Proposals from subgraph", err)
    return {
      props: {
        ethProposals: [[], []]
      }
    }
  }
}

// Ethereum proposals only
async function fetchProposalsData(queryClient: QueryClient, block?: Block): Promise<any> {
  return queryClient.fetchQuery([USE_QUERY_KEYS.PROPOSALS, block?.number?.toString()], fetchProposals)
}

// Ethereum proposals only
async function fetchProposals({ queryKey }) {
  const [_key] = queryKey
  return graphQLClient.request(ProposalsDocument, {})
}

// Ethereum proposals only
function mapProposals(data: any, block?: Block) {
  return (
    data?.proposals?.map((p) => ({
      ...p,
      effectiveStatus: getProposalEffectiveStatus(p, block?.number, block?.timestamp)
    })) || []
  )
}

async function fetchEthProposals(block?: Block): Promise<any[]> {
  const queryClient = new QueryClient()
  const proposalsData = await fetchProposalsData(queryClient, block)
  const proposals = mapProposals(proposalsData, block)
  const [activeProposals, finalizedProposals] = partition(proposals, (p) => !isFinalized(p.effectiveStatus))

  return [activeProposals, finalizedProposals]
}
