import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid as VStack,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { AccountAddress } from "components/AccountAddress"
import { AccountAvatar } from "components/AccountAvatar"
import { isValidName, parseEther } from "ethers/lib/utils.js"
import { useAccountQuery } from "hooks/useAccountQuery"
import { FC } from "react"
import { useDebounce } from "usehooks-ts"
import { TransactionData } from "utils/governanceUtils"
import { useAddTransactionFormState } from "./AddTransactionForm.state"
import { useProposalCreationState } from "./ProposalCreationForm.state"

export interface AddTransactionFormProps extends CardProps {
  onAddTransaction: (transaction: TransactionData) => void
}

export const AddTransactionForm: FC<AddTransactionFormProps> = ({
  onAddTransaction,
  ...props
}) => {
  const { txKind } = useAddTransactionFormState()

  return (
    <Card variant={"outline"} {...props}>
      <CardHeader textAlign={"center"} fontWeight={"semibold"}>
        Add transaction{txKind ? `: ${txKind}` : ""}
      </CardHeader>
      {txKind ? <TransactionDataForm /> : <PickTransactionKind />}
    </Card>
  )
}

const PickTransactionKind = ({}) => {
  const { pickKind, txKind, close, clear } = useAddTransactionFormState()
  return (
    <>
      <CardBody>
        <VStack w="full" columns={{ base: 1, md: 2 }} gap={2}>
          <Button
            h={20}
            variant={"outline"}
            w="full"
            onClick={() => pickKind("Send ETH")}
          >
            Send ETH
          </Button>
          <Button
            h={20}
            variant={"outline"}
            w="full"
            onClick={() => pickKind("Call contract")}
          >
            Call contract
          </Button>
        </VStack>
      </CardBody>
      <CardFooter justifyContent={"space-between"}>
        <Button
          onClick={() => {
            close()
            pickKind()
            clear()
          }}
        >
          Cancel
        </Button>
      </CardFooter>
    </>
  )
}

interface TransactionDataFormProps {}

const TransactionDataForm: FC<TransactionDataFormProps> = ({}) => {
  const { transactions, setTransactions } = useProposalCreationState()
  const {
    txKind,
    pickKind,
    clear,
    close,
    accountQuery,
    ethValue,
    setAccountQuery,
    setEthValue,
    abi,
    setAbi,
  } = useAddTransactionFormState()

  const debouncedAccountQuery = useDebounce(accountQuery, 600)
  const { isLoading, address, ensAvatar, nnsOrEnsName } = useAccountQuery(
    debouncedAccountQuery
  )

  const isValidEthValue = !!ethValue && parseFloat(ethValue) > 0
  const isValidTx =
    txKind === "Send ETH" ? isValidEthValue && address !== undefined : false
  return (
    <>
      <CardBody>
        <VStack w="full" spacing={4} justifyContent={"center"}>
          <FormControl isRequired>
            <FormLabel>Destination</FormLabel>
            <Input
              id={"destination"}
              value={accountQuery}
              onChange={(e) => setAccountQuery(e.target.value)}
              placeholder="gnars.eth / 0x558bfff0d583416f7c4e380625c7865821b8e95c"
            />
            <FormHelperText>
              {txKind === "Send ETH"
                ? "The account that will receive the ETH."
                : "The contract to be called."}{" "}
              You can use an address or an ENS name
            </FormHelperText>
          </FormControl>
          <HStack w={"fit-content"}>
            <AccountAvatar
              isLoading={isLoading}
              address={address}
              avatarImg={ensAvatar}
            />
            <VStack alignItems={"start"} spacing={0}>
              {!address && (
                <Text>
                  {!!accountQuery
                    ? accountQuery
                    : "Enter the destination account"}
                </Text>
              )}
              {accountQuery && !address && !isLoading && (
                <Text color={"red.300"}>
                  {isValidName(accountQuery)
                    ? "Account not found"
                    : "Invalid query. Use an address or ens name"}
                </Text>
              )}
              {nnsOrEnsName && <Text>{nnsOrEnsName}</Text>}
              {address && <AccountAddress address={address} />}
            </VStack>
          </HStack>
          <Divider />
          <FormControl isRequired>
            <FormLabel>Value</FormLabel>
            <InputGroup maxW={60}>
              <Input
                type={"number"}
                placeholder="0.001"
                value={ethValue}
                onChange={(e) => {
                  setEthValue(e.target.value)
                }}
                min={0}
              />
              <InputRightElement mr={2}>ETH</InputRightElement>
            </InputGroup>
            <FormHelperText>
              The ETH value to be sent to the destination.
              {txKind === "Send ETH" ? "Must be > 0" : ""}
            </FormHelperText>
          </FormControl>
          {txKind === "Call contract" && (
            <FormControl isRequired>
              <FormLabel>Abi</FormLabel>
              <Textarea
                id={"abi"}
                value={abi}
                placeholder={"Enter the ABI of the contract to be called."}
                onChange={(e) => setAbi(e.target.value)}
              />
            </FormControl>
          )}
        </VStack>
      </CardBody>
      <CardFooter justifyContent={"space-between"}>
        <HStack>
          <Button
            onClick={() => {
              close()
              clear()
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              pickKind()
              clear()
            }}
          >
            Back
          </Button>
        </HStack>
        <HStack>
          <Button onClick={clear}>Clear</Button>
          <Button
            _dark={{
              bg: "pink.700",
            }}
            isDisabled={!isValidTx}
            alignSelf={"end"}
            onClick={() => {
              if (!isValidTx) return

              if (txKind === "Send ETH") {
                setTransactions([
                  ...transactions,
                  {
                    calldata: "0x",
                    signature: "",
                    target: address!,
                    value: parseEther(ethValue),
                  },
                ])
                close()
                clear()
                pickKind()
                return
              }
            }}
          >
            Add
          </Button>
        </HStack>
      </CardFooter>
    </>
  )
}
