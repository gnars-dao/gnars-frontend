import {
  Box,
  Container,
  DarkMode,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import Menu from "../../../components/Menu"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { execute, ProposalDocument } from "../../../.graphclient"
import { ProposalCard } from "../../../components/Governance/ProposalCard"
import ProposalContent from "../../../components/Governance/ProposalContent"

export default function Proposal() {
  const router = useRouter()
  const { propId } = router.query
  const { data: proposal } = useQuery(
    ["proposal", propId],
    () =>
      execute(ProposalDocument, { id: propId }).then((r) => r!.data!.proposal),
    { keepPreviousData: true }
  )

  console.log({ propId, proposal })
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
          {proposal && (
            <ProposalCard
              proposal={proposal}
              borderColor={"chakra-border-color"}
            >
              <ProposalContent proposal={proposal} />
            </ProposalCard>
          )}
        </Container>
      </VStack>
    </DarkMode>
  )
}
