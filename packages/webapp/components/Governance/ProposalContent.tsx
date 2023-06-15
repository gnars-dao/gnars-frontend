import { Heading, Text, VStack } from "@chakra-ui/react"
import { AvatarWallet } from "components/AvatarWallet"
import { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import { TransactionData } from "utils/governanceUtils"
import styles from "./ProposalContent.module.css"
import { TransactionCard } from "./TransactionCard"

export interface ProposalContentProps {
  transactions: TransactionData[]
  proposer: `0x${string}`
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
        fontSize={["sm", "md", "lg"]}
      >
        <ReactMarkdown
          className={styles.markdown}
          remarkPlugins={[remarkBreaks]}
        >
          {description}
        </ReactMarkdown>
        <Heading as={"h2"} textStyle={"h2"} fontSize="4xl">
          Proposed Transactions
        </Heading>
        {transactions.map((transaction, i) => (
          <TransactionCard
            w={"full"}
            key={`proposal-tx-${i + 1}`}
            data={transaction}
            index={i + 1}
          />
        ))}
      </VStack>
    </>
  )
}

export default ProposalContent
