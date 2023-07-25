import { Container, DarkMode, Stack, VStack } from "@chakra-ui/react"
import { ProposalCreationForm } from "components/Governance/ProposalCreationForm"
import { useProposalCreationState } from "components/Governance/ProposalCreationForm.state"
import dynamic from "next/dynamic"
import { zeroAddress } from "viem"
import { useAccount } from "wagmi"
import { ProposalCard } from "../../../components/Governance/ProposalCard"
import ProposalContent from "../../../components/Governance/ProposalContent"
import Menu from "../../../components/Menu"

function NewProposal() {
  const { address } = useAccount()

  const { title, description, transactions } = useProposalCreationState()

  return (
    <DarkMode>
      <VStack w={"full"} h={"fit-content"} color={"chakra-body-text"} spacing={6}>
        <Menu />
        <Container maxW={{ base: "container.lg", "2xl": "full" }} centerContent>
          <Stack
            direction={{ base: "column", "2xl": "row" }}
            w="full"
            spacing={10}
            px={{ md: 10 }}
            alignItems={"start"}
          >
            <ProposalCreationForm flexGrow={1} maxW={"container.lg"} w="full" />
            {/* TODO add back button */}
            <ProposalCard
              flexShrink={0}
              maxW={"container.lg"}
              w="full"
              id={"NEW"}
              title={title}
              status={"PREVIEW"}
              borderColor={"chakra-border-color"}
            >
              <ProposalContent
                description={description}
                transactions={transactions}
                proposer={address || zeroAddress}
              />
            </ProposalCard>
          </Stack>
        </Container>
      </VStack>
    </DarkMode>
  )
}

export default dynamic(() => Promise.resolve(NewProposal), { ssr: false })
