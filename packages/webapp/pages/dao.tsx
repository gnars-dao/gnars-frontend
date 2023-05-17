import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  BadgeProps,
  Box,
  Container,
  DarkMode,
  Divider,
  Heading,
  HStack,
  Progress,
  PropsOf,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react"
import Menu from "../components/Menu"
import { usePlaygroundState } from "../hooks/usePlaygroundState"
import { Generator } from "../components/Playground/Generator"
import { GnarImage } from "../components/GnarImage"
import {
  execute,
  ProposalsDocument,
  ProposalsQuery,
  ProposalStatus,
} from "../.graphclient"
import { BigNumber } from "ethers"
import { useBlock } from "../hooks/useBlock"
import { ca } from "date-fns/locale"
import {
  EffectiveProposalStatus,
  getProposalEffectiveStatus,
  getQuorumVotes,
  isFinalized,
  ProposalData,
} from "../utils/governanceUtils"
import { ProposalStatusBadge } from "../components/Governance/ProposalStatusBadge"
import { ProposalCard } from "../components/Governance/ProposalCard"
import { useQuery } from "@tanstack/react-query"
import { groupBy, isArray, isObject, partition } from "lodash"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Proposals() {
  const block = useBlock()
  const { data: proposals } = useQuery(
    ["proposals", block?.number],
    () =>
      execute(ProposalsDocument, {})
        .then((r) =>
          r.data.proposals.map((p: ProposalData) => ({
            ...p,
            effectiveStatus: getProposalEffectiveStatus(
              p,
              block?.number,
              block?.timestamp
            ),
          }))
        )
        .then((p) =>
          partition<
            ProposalData & { effectiveStatus: EffectiveProposalStatus }
          >(p, (p) => !isFinalized(p.effectiveStatus))
        ),
    { keepPreviousData: true }
  )
  console.log(proposals)
  return (
    <DarkMode>
      <VStack
        w={"full"}
        h={"fit-content"}
        color={"chakra-body-text"}
        spacing={6}
      >
        <Menu />
        <Container centerContent maxW={"container.lg"}>
          <VStack spacing={20}>
            <Heading>Governance</Heading>
            <Heading as={"h2"} fontSize="5xl">
              Proposals
            </Heading>
            x
          </VStack>

          {/*@TODO add buttons to add proposal and change delegation*/}
          <VStack
            w={"full"}
            spacing={4}
            alignItems={"center"}
            py={{ base: 4, lg: 20 }}
            px={{ base: 4, lg: 20 }}
          >
            <Alert status="warning" w="full" variant={"solid"} p={10}>
              <AlertIcon />
              <AlertTitle>Preview data</AlertTitle>
              <AlertDescription>
                This page is currently displaying proposal data from{" "}
                <ChakraLink
                  isExternal
                  href={"https://nouns.wtf/"}
                  textDecoration="underline"
                >
                  Nouns DAO
                </ChakraLink>{" "}
                for demo purposes.
              </AlertDescription>
            </Alert>
            {isObject(proposals) && (
              <>
                <HStack w="full" pb={10}>
                  <Divider />
                  <Heading as={"h3"} fontSize="4xl">
                    ACTIVE
                  </Heading>
                  <Divider />
                </HStack>
                {proposals[0].map((prop) => (
                  <Link
                    href={`/dao/proposals/${prop.id}`}
                    style={{ width: "100%" }}
                  >
                    <ProposalCard
                      id={prop.id}
                      title={prop.title}
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
                <HStack w="full" color={"gray.300"} py={10}>
                  <Divider />
                  <Heading as={"h3"} fontSize="4xl">
                    FINALIZED
                  </Heading>
                  <Divider />
                </HStack>
                {proposals[1].map((prop) => (
                  <Link
                    href={`/dao/proposals/${prop.id}`}
                    style={{ width: "100%" }}
                  >
                    <ProposalCard
                      id={prop.id}
                      title={prop.title}
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
          </VStack>
        </Container>
      </VStack>
    </DarkMode>
  )
}
