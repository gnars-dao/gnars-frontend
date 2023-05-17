import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  DarkMode,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react"
import Menu from "../../../components/Menu"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { execute, ProposalDocument } from "../../../.graphclient"
import { ProposalCard } from "../../../components/Governance/ProposalCard"
import ProposalContent from "../../../components/Governance/ProposalContent"
import {
  DetailedProposalData,
  getProposalEffectiveStatus,
  getQuorumVotes,
  getTransactions,
  ProposalData,
} from "utils/governanceUtils"
import { useBlock } from "hooks/useBlock"

export default function Proposal() {
  const router = useRouter()
  const block = useBlock()
  const { propId } = router.query
  const { data: proposal } = useQuery<DetailedProposalData>(
    ["proposal", propId],
    () =>
      execute(ProposalDocument, { id: propId }).then((r) => r!.data!.proposal),
    { keepPreviousData: true }
  )

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
          {/* TODO add back button */}
          <Alert status="warning" w="full" variant={"solid"} p={10} mb={10}>
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
          {proposal && (
            <ProposalCard
              id={proposal.id}
              title={proposal.title}
              status={getProposalEffectiveStatus(
                proposal,
                block?.number,
                block?.timestamp
              )}
              quorumVotes={getQuorumVotes(proposal)}
              votes={{
                abstainVotes: proposal.abstainVotes,
                forVotes: proposal.forVotes,
                againstVotes: proposal.againstVotes,
                totalSupply: proposal.totalSupply,
              }}
              startBlock={proposal.startBlock}
              endBlock={proposal.endBlock}
              executionETA={proposal.executionETA}
              borderColor={"chakra-border-color"}
            >
              <ProposalContent
                description={proposal.description.replace(
                  `# ${proposal.title}`,
                  ""
                )}
                proposer={proposal.proposer.id}
                transactions={getTransactions(proposal)}
              />
            </ProposalCard>
          )}
        </Container>
      </VStack>
    </DarkMode>
  )
}
