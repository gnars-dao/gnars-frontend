import {
  Badge,
  BadgeProps,
  Box,
  Container,
  DarkMode,
  Heading,
  HStack,
  Progress,
  PropsOf,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import Menu from "../../components/Menu"
import Gnar from "../../components/Gnar"
import { usePlaygroundState } from "../../hooks/usePlaygroundState"
import { Generator } from "../../components/Playground/Generator"
import { GnarImage } from "../../components/GnarImage"
import { mockProposals } from "../../mock/mockProposals"
import {
  execute,
  ProposalsDocument,
  ProposalsQuery,
  ProposalStatus,
} from "../../.graphclient"
import { BigNumber } from "ethers"
import { useBlock } from "../../hooks/useBlock"
import { ca } from "date-fns/locale"
import {
  EffectiveProposalStatus,
  getProposalEffectiveStatus,
  getQuorumVotes,
  isFinalized,
} from "../../utils/governanceUtils"
import { ProposalStatusBadge } from "../../components/Governance/ProposalStatusBadge"
import { ProposalCard } from "../../components/Governance/ProposalCard"
import { useQuery } from "@tanstack/react-query"
import { isArray } from "lodash"
import { useRouter } from "next/router"

export default function Proposals() {
  const { data: proposals } = useQuery(
    ["proposals"],
    () => execute(ProposalsDocument, {}).then((r) => r.data.proposals),
    { keepPreviousData: true }
  )
  const router = useRouter()
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
          <Heading>Governance</Heading>
          <Heading as={"h2"} alignSelf={"start"}>
            Proposals
          </Heading>
          {/*@TODO add buttons to add proposal and change delegation*/}
          <VStack
            w={"full"}
            spacing={4}
            alignItems={"center"}
            py={{ base: 4, lg: 20 }}
            px={{ base: 4, lg: 20 }}
          >
            {isArray(proposals) &&
              proposals.map((prop) => (
                <ProposalCard
                  proposal={prop}
                  _hover={{ borderColor: "whiteAlpha.500", cursor: "pointer" }}
                  onClick={() =>
                    router.push(`/governance/proposals/${prop.id}`)
                  }
                />
              ))}
          </VStack>
        </Container>
      </VStack>
    </DarkMode>
  )
}
