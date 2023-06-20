import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  Divider,
  Heading,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { AvatarWallet } from "components/AvatarWallet"
import dynamic from "next/dynamic"
import { FC } from "react"
import { useAccount } from "wagmi"
import { DelegateDocument, execute } from "../../../.graphclient"
import { UpdateDelegateModal } from "./UpdateDelegateModal"

export interface UserVotesSectionProps extends CardProps {}

const InnerUserVotesSection: FC<UserVotesSectionProps> = ({ ...props }) => {
  const { address } = useAccount()
  const delegationQueryKey = ["delegateProposals", address]
  const { data: delegation, isLoading } = useQuery(
    delegationQueryKey,
    () =>
      execute(DelegateDocument, { id: address?.toLowerCase() }).then(
        (q) => q.data
      ),
    { keepPreviousData: true, enabled: !!address }
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  console.log({ isOpen })
  if (!address || !delegation || !delegation?.delegate || !delegation?.account)
    return <></>
  const hasDelegatedToAnother =
    delegation?.account &&
    delegation.account?.delegate.id.toLowerCase() !== address?.toLowerCase()

  return (
    <>
      <Heading as={"h2"} fontSize="5xl">
        Delegation
      </Heading>
      <Card p={2} {...props}>
        <CardBody>
          <VStack alignItems={"start"} spacing={6}>
            <AvatarWallet address={address} />
            <Text fontSize={"xl"} fontWeight={"bold"}>
              {delegation.delegate.delegatedVotes} votes
            </Text>
            <Divider />
            {hasDelegatedToAnother ? (
              <VStack alignItems={"start"}>
                <Text>
                  {delegation.account.tokenBalance} votes delegated to:
                </Text>
                <AvatarWallet address={delegation.account.delegate.id} />
              </VStack>
            ) : (
              <Text>{delegation.account.tokenBalance} undelegated votes</Text>
            )}
          </VStack>
          <CardFooter justifyContent={"end"} pt={8} p={0}>
            <Button onClick={onOpen}>
              {hasDelegatedToAnother ? "Change delegate" : "Delegate votes"}
            </Button>
          </CardFooter>
        </CardBody>
      </Card>
      <UpdateDelegateModal
        currentDelegate={delegation.account.delegate.id}
        delegationQueryKey={delegationQueryKey}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export const UserVotesSection = dynamic(
  () => Promise.resolve(InnerUserVotesSection),
  {
    ssr: false,
  }
)
