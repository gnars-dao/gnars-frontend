import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  StackProps,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { useProposalCreationContext } from "contexts/ProposalCreationContext"
import { FC } from "react"
import { AddTransactionForm } from "./AddTransactionForm"

export interface ProposalCreationFormProps extends StackProps {}

export const ProposalCreationForm: FC<ProposalCreationFormProps> = ({
  ...props
}) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    transactions,
    setTransactions,
  } = useProposalCreationContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <VStack
      bgColor={"blackAlpha.300"}
      flexGrow={1}
      borderRadius={"md"}
      p={10}
      borderWidth={1}
      spacing={6}
      {...props}
    >
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Insert the proposal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
          borderWidth={1}
          borderRadius={"md"}
          justifyContent="center"
          p={4}
        >
          {transactions.length === 0 && (
            <Text py={10} color={"whiteAlpha.400"} alignSelf={"center"}>
              None yet. Add at least one transaction to submit
            </Text>
          )}
          {isOpen ? (
            <AddTransactionForm
              w={"full"}
              onAddTransaction={(tx) => setTransactions([...transactions, tx])}
              onCancel={onClose}
            />
          ) : (
            <Button
              variant={"outline"}
              bgColor={"whiteAlpha.50"}
              w={"full"}
              aria-label="Add transaction"
              onClick={onOpen}
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
        isDisabled={!title || !description || transactions.length === 0}
        alignSelf={"end"}
      >
        Submit proposal
      </Button>
    </VStack>
  )
}
