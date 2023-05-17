"use client"

import { Container, DarkMode, VStack } from "@chakra-ui/react"
import {
  ProposalCreationContextProvider,
  useProposalCreationContext,
} from "components/Governance/ProposalCreationContext"
import { constants } from "ethers"
import dynamic from "next/dynamic"
import { useAccount } from "wagmi"
import { ProposalCard } from "../../../components/Governance/ProposalCard"
import ProposalContent from "../../../components/Governance/ProposalContent"
import Menu from "../../../components/Menu"

export function ProposalCreation() {
  const { address } = useAccount()
  const { title, description, transactions } = useProposalCreationContext()!

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
          <ProposalCard
            id={"NEW"}
            title={title}
            status={"NEW"}
            borderColor={"chakra-border-color"}
          >
            <ProposalContent
              description={description}
              transactions={transactions}
              proposer={address || constants.AddressZero}
            />
          </ProposalCard>
        </Container>
      </VStack>
    </DarkMode>
  )
}

const DynamicProposalCreation = dynamic(
  () => Promise.resolve(ProposalCreation),
  { ssr: false }
)

export default function NewProposal() {
  return (
    <ProposalCreationContextProvider>
      <DynamicProposalCreation />
    </ProposalCreationContextProvider>
  )
}
