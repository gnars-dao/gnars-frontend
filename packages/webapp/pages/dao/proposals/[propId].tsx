import {
  Button,
  Center,
  Container,
  DarkMode,
  HStack,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { VoteAction } from "components/Governance/Actions/VoteAction"
import { ProposalTimeline } from "components/Governance/ProposalTimeline"
import { motion } from "framer-motion"
import { useBlock } from "hooks/useBlock"
import { useDelegationInfo } from "hooks/useDelegationInfo"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { BiCaretLeft } from "react-icons/bi"
import { RiArrowGoBackFill } from "react-icons/ri"
import {
  DetailedProposalData,
  EffectiveProposalStatus,
  getProposalEffectiveStatus,
  getQuorumVotes,
  getTransactions,
} from "utils/governanceUtils"
import { useGnarsDaoCancel, useGnarsDaoExecute, useGnarsDaoQueue } from "utils/sdk"
import { useAccount } from "wagmi"
import { waitForTransaction } from "wagmi/actions"
import { execute, ProposalDocument } from "../../../.graphclient"
import { ProposalCard } from "../../../components/Governance/ProposalCard"
import ProposalContent from "../../../components/Governance/ProposalContent"
import Menu from "../../../components/Menu"

export default function Proposal() {
  const { invalidateQueries } = useQueryClient()
  const router = useRouter()
  const block = useBlock()
  const { address } = useAccount()
  const { propId } = router.query as { propId: string }
  const { data: proposal } = useQuery<DetailedProposalData>(
    ["proposal", propId],
    () => execute(ProposalDocument, { id: propId }).then((r: any) => r!.data!.proposal),
    { keepPreviousData: true }
  )

  const effectiveStatus = proposal && getProposalEffectiveStatus(proposal, block?.number, block?.timestamp)

  const proposer = proposal?.proposer?.id as `0x${string}`
  const { data: delegationInfo } = useDelegationInfo(proposer)

  const currentProposerVotes = delegationInfo?.delegate?.delegatedVotes
    ? parseInt(delegationInfo.delegate.delegatedVotes)
    : 0

  const proposalThreshold = proposal?.proposalThreshold ? parseInt(proposal.proposalThreshold) : Number.MAX_SAFE_INTEGER
  const canQueue = proposal && address && effectiveStatus === "SUCCEEDED"
  const canExecute = proposal && address && effectiveStatus === "EXECUTABLE"
  const canCancel =
    proposal &&
    (["ACTIVE", "PENDING", "QUEUED", "EXECUTABLE", "SUCCEEDED"] as EffectiveProposalStatus[]).includes(
      effectiveStatus!
    ) &&
    address &&
    (proposer.toLowerCase() === address?.toLowerCase() || currentProposerVotes < proposalThreshold)

  const { writeAsync: cancelProp } = useGnarsDaoCancel({
    args: [BigInt(propId ?? 0)],
  })

  const { writeAsync: queueProp } = useGnarsDaoQueue({
    args: [BigInt(propId ?? 0)],
  })

  const { writeAsync: executeProp } = useGnarsDaoExecute({
    args: [BigInt(propId ?? 0)],
  })

  const refreshProposal = useCallback(() => {
    invalidateQueries(["proposal", propId]) //FIXME TypeError: Cannot read properties of undefined (reading 'queryCache')
  }, [invalidateQueries, propId])

  const quorumVotes = proposal ? getQuorumVotes(proposal) : undefined

  const tabIndex = useBreakpointValue({ base: undefined, xl: 0 })
  const { isOpen: showTimeline, onToggle: toggleTimeline } = useDisclosure({
    defaultIsOpen: true,
  })
  const [timelineHidden, setTimelineHidden] = useState(false)

  return (
    <DarkMode>
      <VStack w={"full"} h={"fit-content"} color={"chakra-body-text"} spacing={6}>
        <Menu />
        <Container centerContent w={{ base: "full", md: "fit-content" }} maxWidth={"none"} gap={2}>
          <HStack w={"full"} justify={"space-between"}>
            <Link href={"/dao"} style={{ alignSelf: "start" }}>
              <Button variant={"link"} leftIcon={<RiArrowGoBackFill />}>
                All proposals
              </Button>
            </Link>
            {proposal && (
              <Button
                hideBelow={"lg"}
                onClick={toggleTimeline}
                variant={"link"}
                rightIcon={
                  <BiCaretLeft
                    style={{
                      transform: showTimeline ? "rotate(-180deg)" : undefined,
                      transition: "transform 0.5s linear",
                    }}
                  />
                }
              >
                Timeline
              </Button>
            )}
          </HStack>
          {/* TODO add proposal not found */}
          {proposal && (
            <HStack align={"start"} w={{ base: "full", md: "fit-content" }}>
              <ProposalCard
                w={{ base: "full", md: "3xl" }}
                id={proposal.id}
                title={proposal.title}
                status={getProposalEffectiveStatus(proposal, block?.number, block?.timestamp)}
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
                {(proposal.forVotes || proposal.abstainVotes || proposal.againstVotes) && (
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
                    <HStack spacing={2} gridArea={"for"} divider={<Text color={"governance.quorum"}>/</Text>}>
                      {proposal.forVotes > 0 && <Text color={"governance.vote.for"}>{`${proposal.forVotes} FOR`}</Text>}
                      <Text color={"governance.quorum"} gridArea={"for"}>
                        {`${quorumVotes?.current} REQUIRED`}
                      </Text>
                    </HStack>
                    {proposal.abstainVotes > 0 && (
                      <Text color={"governance.vote.abstain"} justifySelf={{ md: "center" }} gridArea={"abstain"}>
                        {`${proposal.abstainVotes} ABSTAIN`}
                      </Text>
                    )}
                    {proposal.againstVotes > 0 && (
                      <Text color={"governance.vote.against"} justifySelf={{ md: "end" }} gridArea={"against"}>
                        {`${proposal.againstVotes} AGAINST`}
                      </Text>
                    )}
                  </SimpleGrid>
                )}
                <Tabs index={tabIndex} w={"full"} colorScheme={"purple"} size={"sm"} variant={"line"}>
                  <TabList
                    zIndex={1}
                    justifyContent={"start"}
                    hideFrom={"xl"}
                    bgColor={"gray.900"}
                    position={"sticky"}
                    top={0}
                    alignSelf={"end"}
                    px={2}
                    w={"full"}
                  >
                    <Tab>Proposal</Tab>
                    <Tab>Timeline</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel p={0}>
                      <ProposalContent
                        actions={
                          <Stack direction={{ base: "column", md: "row" }} align={{ md: "center" }} h={"fit-content"}>
                            {effectiveStatus === "ACTIVE" && <VoteAction proposal={proposal} />}
                            {canCancel && (
                              <Button
                                onClick={() =>
                                  cancelProp?.()
                                    .then((tx) => waitForTransaction({ hash: tx.hash }))
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
                                    .then((tx) => waitForTransaction({ hash: tx.hash }))
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
                                    .then((tx) => waitForTransaction({ hash: tx.hash }))
                                    .then(refreshProposal)
                                }
                                variant={"outline"}
                              >
                                Execute
                              </Button>
                            )}
                          </Stack>
                        }
                        description={proposal.description.replace(`# ${proposal.title}`, "")}
                        proposer={proposal.proposer.id as `0x${string}`}
                        transactions={getTransactions(proposal)}
                      />
                    </TabPanel>
                    <TabPanel w={"full"} p={{ base: 4, sm: 10 }}>
                      <Center>
                        <ProposalTimeline
                          w={"full"}
                          // maxW={"md"}
                          spacing={{ base: 2, sm: 4 }}
                          p={0}
                          borderWidth={0}
                          proposal={proposal}
                        />
                      </Center>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ProposalCard>

              <ProposalTimeline
                proposal={proposal}
                as={motion.div}
                p={4}
                bgColor={"blackAlpha.300"}
                // @ts-ignore
                initial={false}
                onAnimationStart={() => setTimelineHidden(false)}
                onAnimationComplete={() => setTimelineHidden(!showTimeline)}
                transitionTimingFunction={"linear"}
                hidden={timelineHidden}
                animate={{
                  width: showTimeline ? 360 : 0,
                  padding: showTimeline ? 12 : 0,
                  borderWidth: showTimeline ? 1 : 0,
                  opacity: showTimeline ? 1 : 0,
                  marginLeft: showTimeline ? 8 : 0,
                }}
                hideBelow={"lg"}
                overflowX={"clip"}
                position={"sticky"}
                top={2}
                maxH={"80vh"}
                borderWidth={1}
                borderRadius={"md"}
              />
            </HStack>
          )}
        </Container>
      </VStack>
    </DarkMode>
  )
}
