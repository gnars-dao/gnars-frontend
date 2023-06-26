import {
  Button,
  Container,
  DarkMode,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { VoteAction } from "components/Governance/Actions/VoteAction"
import { BigNumber } from "ethers"
import { useBlock } from "hooks/useBlock"
import { useDelegationInfo } from "hooks/useDelegationInfo"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { RiArrowGoBackFill } from "react-icons/ri"
import {
  DetailedProposalData,
  EffectiveProposalStatus,
  getProposalEffectiveStatus,
  getQuorumVotes,
  getTransactions,
} from "utils/governanceUtils"
import {
  useGnarsDaoCancel,
  useGnarsDaoExecute,
  useGnarsDaoQueue,
} from "utils/sdk"
import { useAccount } from "wagmi"
import { execute, ProposalDocument } from "../../../.graphclient"
import { ProposalCard } from "../../../components/Governance/ProposalCard"
import ProposalContent from "../../../components/Governance/ProposalContent"
import Menu from "../../../components/Menu"

export default function Proposal() {
  const { invalidateQueries } = useQueryClient()
  const router = useRouter()
  const block = useBlock()
  const { address } = useAccount()
  const { propId } = router.query
  const { data: proposal } = useQuery<DetailedProposalData>(
    ["proposal", propId],
    () =>
      execute(ProposalDocument, { id: propId }).then((r) => r!.data!.proposal),
    { keepPreviousData: true }
  )

  const effectiveStatus =
    proposal &&
    getProposalEffectiveStatus(proposal, block?.number, block?.timestamp)

  const proposer = proposal?.proposer?.id as `0x${string}`
  const { data: delegationInfo } = useDelegationInfo(proposer)

  const currentProposerVotes = delegationInfo?.delegate?.delegatedVotes
    ? parseInt(delegationInfo.delegate.delegatedVotes)
    : 0

  const proposalThreshold = proposal?.proposalThreshold
    ? parseInt(proposal.proposalThreshold)
    : Number.MAX_SAFE_INTEGER
  const canQueue = proposal && address && effectiveStatus === "SUCCEEDED"
  const canExecute = proposal && address && effectiveStatus === "EXECUTABLE"
  const canCancel =
    proposal &&
    (
      [
        "ACTIVE",
        "PENDING",
        "QUEUED",
        "EXECUTABLE",
        "SUCCEEDED",
      ] as EffectiveProposalStatus[]
    ).includes(effectiveStatus!) &&
    address &&
    (proposer.toLowerCase() === address?.toLowerCase() ||
      currentProposerVotes < proposalThreshold)

  const { writeAsync: cancelProp } = useGnarsDaoCancel({
    mode: "recklesslyUnprepared",
    args: [BigNumber.from(propId ?? 0)],
  })

  const { writeAsync: queueProp } = useGnarsDaoQueue({
    mode: "recklesslyUnprepared",
    args: [BigNumber.from(propId ?? 0)],
  })

  const { writeAsync: executeProp } = useGnarsDaoExecute({
    mode: "recklesslyUnprepared",
    args: [BigNumber.from(propId ?? 0)],
  })

  const refreshProposal = useCallback(() => {
    invalidateQueries(["proposal", propId])
  }, [invalidateQueries, propId])

  const quorumVotes = proposal ? getQuorumVotes(proposal) : undefined

  return (
    <DarkMode>
      <VStack
        w={"full"}
        h={"fit-content"}
        color={"chakra-body-text"}
        spacing={6}
      >
        <Menu />
        <Container centerContent maxW={"container.lg"} gap={2}>
          <Link href={"/dao"} style={{ alignSelf: "start" }}>
            <Button variant={"link"} leftIcon={<RiArrowGoBackFill />}>
              All proposals
            </Button>
          </Link>
          {/* TODO add proposal not found */}
          {proposal && (
            <ProposalCard
              id={proposal.id}
              title={proposal.title}
              status={getProposalEffectiveStatus(
                proposal,
                block?.number,
                block?.timestamp
              )}
              quorumVotes={quorumVotes}
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
              <SimpleGrid
                w={"full"}
                px={4}
                fontWeight={"bold"}
                templateColumns={{ md: "repeat(3, 1fr)" }}
                templateAreas={{
                  base: `"for" "abstain" "against"`,
                  md: `"for abstain against"`,
                }}
              >
                <HStack spacing={2}>
                  <Text color={"governance.vote.for"} gridArea={"for"}>
                    {`${proposal.forVotes} FOR`}
                  </Text>
                  <Text color={"governance.quorum"} gridArea={"for"}>
                    {` / ${quorumVotes?.current} REQUIRED`}
                  </Text>
                </HStack>
                <Text
                  color={"governance.vote.abstain"}
                  justifySelf={{ md: "center" }}
                  gridArea={"abstain"}
                >
                  {`${proposal.abstainVotes} ABSTAIN`}
                </Text>
                <Text
                  color={"governance.vote.against"}
                  justifySelf={{ md: "end" }}
                  gridArea={"against"}
                >
                  {`${proposal.againstVotes} AGAINST`}
                </Text>
              </SimpleGrid>
              <ProposalContent
                actions={
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    align={{ md: "center" }}
                    h={"fit-content"}
                  >
                    {effectiveStatus === "ACTIVE" && (
                      <VoteAction proposal={proposal} />
                    )}
                    {canCancel && (
                      <Button
                        onClick={() =>
                          cancelProp?.()
                            .then((tx) => tx.wait())
                            .then(refreshProposal)
                        }
                        variant={"outline"}
                      >
                        Cancel
                      </Button>
                    )}
                    {canQueue && (
                      <Button
                        onClick={() =>
                          queueProp?.()
                            .then((tx) => tx.wait())
                            .then(refreshProposal)
                        }
                        variant={"outline"}
                      >
                        Queue
                      </Button>
                    )}
                    {canExecute && (
                      <Button
                        onClick={() =>
                          executeProp?.()
                            .then((tx) => tx.wait())
                            .then(refreshProposal)
                        }
                        variant={"outline"}
                      >
                        Execute
                      </Button>
                    )}
                  </Stack>
                }
                description={proposal.description.replace(
                  `# ${proposal.title}`,
                  ""
                )}
                proposer={proposal.proposer.id as `0x${string}`}
                transactions={getTransactions(proposal)}
              />
            </ProposalCard>
          )}
        </Container>
      </VStack>
    </DarkMode>
  )
}
