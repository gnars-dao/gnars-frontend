import { FC, ReactNode } from "react";
import styles from "./ProposalContent.module.css";
import { TransactionCard } from "./TransactionCard";
import { Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { AvatarWallet } from "components/AvatarWallet";
import { Inter } from "next/font/google";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NounsTransactionData } from "utils/governanceUtils";

const inter = Inter({ subsets: ["latin"] });

export interface ProposalContentProps {
  actions?: ReactNode;
  transactions: NounsTransactionData[];
  proposer: `0x${string}`;
  description: string;
}

export const ProposalContent: FC<ProposalContentProps> = ({ actions, transactions, proposer, description }) => {
  return (
    <>
      <Stack
        spacing={4}
        p={[4, 8]}
        w={"full"}
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
      >
        <VStack alignSelf={"start"} alignItems={"start"}>
          <Text fontWeight={"bold"}>Proposed by</Text>
          <AvatarWallet address={proposer} />
        </VStack>
        {actions}
      </Stack>
      <VStack w={"full"} p={[4, 8]} alignItems={"start"} spacing={8} fontSize={["sm", "md", "lg"]}>
        <ReactMarkdown className={`${styles.markdown} ${inter.className}`} remarkPlugins={[remarkGfm]}>
          {description}
        </ReactMarkdown>
        <Heading
          as={"h2"}
          textStyle={"h2"}
          fontSize="1.5em"
          className={inter.className}
          fontFamily={inter.style.fontFamily}
          fontWeight={700}
        >
          Proposed Transactions
        </Heading>
        {transactions.map((transaction, i) => (
          <TransactionCard w={"full"} key={`proposal-tx-${i + 1}`} data={transaction} index={i + 1} />
        ))}
      </VStack>
    </>
  );
};

export default ProposalContent;
