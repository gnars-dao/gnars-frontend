import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  StackProps,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FC, useMemo } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { usePrepareGnarsDaoPropose } from "utils/sdk"
import { useContractWrite } from "wagmi"
import { waitForTransaction } from "wagmi/actions"
import { AddTransactionForm } from "./AddTransactionForm"
import { useAddTransactionFormState } from "./AddTransactionForm.state"
import { useProposalCreationState } from "./ProposalCreationForm.state"
import { TransactionCard } from "./TransactionCard"

export interface ProposalCreationFormProps extends StackProps {}

export const ProposalCreationForm: FC<ProposalCreationFormProps> = ({ ...props }) => {
  const { title, setTitle, description, setDescription, transactions, setTransactions, clear } =
    useProposalCreationState()
  const { isOpen: isAddTxOpen, open: openAddTx } = useAddTransactionFormState()
  const isInvalid = !title || !description || transactions.length === 0
  const { push } = useRouter()
  const { targets, values, signatures, calldatas } = useMemo(
    () =>
      isInvalid
        ? { targets: [], values: [], signatures: [], calldatas: [] }
        : transactions.reduce(
            (transactions, transaction) => ({
              targets: [...transactions.targets, transaction.target as `0x${string}`],
              values: [...transactions.values, transaction.value],
              signatures: [...transactions.signatures, transaction.signature],
              calldatas: [...transactions.calldatas, transaction.calldata as `0x${string}`],
            }),
            {
              targets: [] as `0x${string}`[],
              values: [] as bigint[],
              signatures: [] as string[],
              calldatas: [] as `0x${string}`[],
            }
          ),
    [transactions, isInvalid]
  )
  const proposalDescription = useMemo(() => `# ${title}\n\n${description}`, [title, description])
  const { config } = usePrepareGnarsDaoPropose({
    args: [targets, values, signatures, calldatas, proposalDescription],
    enabled: !isInvalid,
    cacheTime: 2000,
  })

  const { writeAsync: propose } = useContractWrite(config)
  const toast = useToast()

  return (
    <VStack
      bgColor={"blackAlpha.300"}
      flexGrow={1}
      borderRadius={"md"}
      p={{ base: 4, sm: 10 }}
      borderWidth={1}
      spacing={6}
      {...props}
    >
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input placeholder="Insert the proposal title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <FormHelperText>Markdown supported</FormHelperText>
        <Textarea
          mt={2}
          overflow={"hidden"}
          flexGrow={1}
          h="fit-content"
          minH={"md"}
          placeholder="Insert the proposal description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Transactions</FormLabel>
        <VStack
          mt={4}
          minH={20}
          w={"full"}
          borderWidth={0}
          borderRadius={"md"}
          justifyContent={"center"}
          p={0}
          spacing={4}
        >
          {transactions.length === 0 ? (
            <Text py={10} color={"whiteAlpha.400"} alignSelf={"center"}>
              None yet. Add at least one transaction to submit
            </Text>
          ) : (
            transactions.map((tx, i) => (
              <TransactionCard
                controls={
                  <Popover size={"xs"}>
                    <PopoverTrigger>
                      <IconButton variant={"ghost"} size={"sm"} p={0} aria-label={"remove"} icon={<FaTrashAlt />} />
                    </PopoverTrigger>
                    <PopoverContent w={"fit-content"}>
                      <PopoverArrow />
                      <PopoverBody p={0}>
                        <Button
                          variant={"ghost"}
                          aria-label="remove"
                          onClick={() =>
                            setTransactions(
                              transactions.filter(
                                (t) =>
                                  t.calldata !== tx.calldata ||
                                  t.signature !== tx.signature ||
                                  t.target !== tx.target ||
                                  t.value !== tx.value
                              )
                            )
                          }
                        >
                          Remove
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                }
                w={"full"}
                key={`proposal-creation-tx-${i + 1}`}
                data={tx}
                index={i + 1}
              />
            ))
          )}
          {isAddTxOpen ? (
            <AddTransactionForm w={"full"} onAddTransaction={(tx) => setTransactions([...transactions, tx])} />
          ) : (
            <Button
              variant={"outline"}
              bgColor={"whiteAlpha.50"}
              w={"full"}
              aria-label="Add transaction"
              onClick={openAddTx}
            >
              Add transaction
            </Button>
          )}
        </VStack>
      </FormControl>
      <Button
        _dark={{
          bg: "pink.700",
        }}
        isDisabled={isInvalid || !propose}
        alignSelf={"end"}
        onClick={() =>
          propose?.()
            .then((tx) => waitForTransaction({ hash: tx.hash }))
            .then(() => {
              toast({
                title: "Proposal submitted",
                status: "success",
                description: "Your proposal has been submitted successfully. Redirecting to proposals page ...",
                duration: 3000,
                onCloseComplete: () => {
                  clear()
                  push("/dao")
                },
              })
            })
            .catch(() => {
              toast({
                title: "Submission failed",
                status: "error",
                description: "Something went wrong. Check your wallet for details.",
              })
            })
        }
      >
        Submit proposal
      </Button>
    </VStack>
  )
}
