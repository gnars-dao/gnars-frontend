import { Heading, ListItem, OrderedList, Text, VStack } from "@chakra-ui/react"
import { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import { TransactionData } from "utils/governanceUtils"
import { AvatarWallet } from "../AvatarWallet"
import { Transaction } from "./Transaction"

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
        <ReactMarkdown className={"markdown"} remarkPlugins={[remarkBreaks]}>
          {description}
        </ReactMarkdown>
        <Heading as={"h2"} textStyle={"h2"} fontSize="4xl">
          Proposed Transactions
        </Heading>
        <OrderedList pl={4} spacing={8} listStylePosition={"outside"}>
          {transactions.map((transaction, i) => (
            <ListItem w="full" maxW="2xl" key={`transaction-${i + 1}`}>
              <Transaction w={"full"} data={transaction} />
            </ListItem>
          ))}
        </OrderedList>
      </VStack>
    </>
  )
}

export default ProposalContent
