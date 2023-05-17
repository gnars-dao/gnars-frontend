import React, { FC, Fragment } from "react"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import { ProposalQuery, ProposalsQuery } from "../../.graphclient"
import {
  Box,
  Code,
  Divider,
  Heading,
  HStack,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from "@chakra-ui/react"
import { zip } from "lodash"
import { Transaction } from "./Transaction"
import { AvatarWallet } from "../AvatarWallet"
import { DetailedProposalData, TransactionData } from "utils/governanceUtils"

export interface ProposalContentProps {
  transactions: TransactionData[]
  proposer: string
  description: string
}

export const ProposalContent: FC<ProposalContentProps> = ({
  transactions,
  proposer,
  description,
}) => {
  return (
    <>
      <VStack p={8} alignSelf={"start"} alignItems={"start"}>
        <Text fontWeight={"bold"}>Proposed by</Text>
        <AvatarWallet withLink address={proposer} />
      </VStack>
      <VStack
        w={"full"}
        p={8}
        alignItems={"start"}
        spacing={8}
        sx={{
          ".markdown p": { py: 4 },
          ".markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5":
            { fontWeight: "bold", py: 4 },
        }}
      >
        <ReactMarkdown
          className={"markdown"}
          children={description}
          remarkPlugins={[remarkBreaks]}
        />
        <Heading as={"h2"} textStyle={"h2"} fontSize="4xl">
          Proposed Transactions
        </Heading>
        <OrderedList pl={4} spacing={8} listStylePosition={"outside"}>
          {transactions.map((transaction) => (
            <ListItem w="full" maxW="2xl">
              <Transaction w={"full"} data={transaction} />
            </ListItem>
          ))}
        </OrderedList>
      </VStack>
    </>
  )
}

export default ProposalContent
