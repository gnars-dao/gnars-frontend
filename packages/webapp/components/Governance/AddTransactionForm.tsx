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
  forwardRef,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  TextareaProps,
  VStack,
} from "@chakra-ui/react"
import { AbiParameter } from "abitype"
import { AccountAddress } from "components/AccountAddress"
import { AccountAvatar } from "components/AccountAvatar"
import { ParamSpec, ParamsTable } from "components/ParamsTable"
import { Interface, isValidName, parseEther } from "ethers/lib/utils.js"
import { useAccountQuery } from "hooks/useAccountQuery"
import { useFunctions } from "hooks/useFunctions"
import { FC, useMemo } from "react"
import { useDebounce } from "usehooks-ts"
import { TransactionData } from "utils/governanceUtils"
import { encodeFunctionData } from "viem"
import {
  getFuncParam,
  useAddTransactionFormState,
} from "./AddTransactionForm.state"
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
        <SimpleGrid w="full" columns={{ base: 1, md: 2 }} gap={2}>
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
        </SimpleGrid>
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
    func,
    setFunc,
    funcParams,
  } = useAddTransactionFormState()
  const functions = useFunctions(abi)
  const calldata = useMemo(() => {
    if (!func || !abi || !funcParams) return undefined

    try {
      return encodeFunctionData({
        abi: JSON.parse(abi),
        functionName: func.name,
        args: funcParams,
      })
    } catch (e) {
      return undefined
    }
  }, [abi, func, funcParams])

  const debouncedAccountQuery = useDebounce(accountQuery, 600)
  const { isLoading, address, ensAvatar, nnsOrEnsName } = useAccountQuery(
    debouncedAccountQuery
  )

  const isValidEthValue = !!ethValue && parseFloat(ethValue) > 0
  const isValidTx =
    txKind === "Send ETH"
      ? isValidEthValue && address !== undefined
      : !!calldata &&
        address !== undefined &&
        func !== undefined &&
        (func.stateMutability === "payable" ? ethValue !== "" : true)
  return (
    <>
      <CardBody p={10}>
        <VStack w="full" spacing={4} alignItems={"start"}>
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

          {txKind === "Call contract" && (
            <>
              <FormControl isRequired>
                <FormLabel>Abi</FormLabel>
                <Textarea
                  id={"abi"}
                  value={abi}
                  placeholder={"Enter the ABI of the contract to be called."}
                  onChange={(e) => setAbi(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Function</FormLabel>
                <Select
                  id={"function"}
                  value={func?.name ?? ""}
                  onChange={(e) =>
                    setFunc(
                      functions?.filter((f) => f.name === e.target.value)[0]! ??
                        undefined
                    )
                  }
                  isDisabled={!abi || !functions}
                >
                  <option value={""}>
                    {functions ? "Select a function" : "Insert a valid ABI"}
                  </option>
                  {functions &&
                    functions
                      .filter(
                        (f) =>
                          f.stateMutability !== "pure" &&
                          f.stateMutability !== "view"
                      )
                      .map((f) => (
                        <option value={f.name} key={f.name}>
                          {f.name}
                        </option>
                      ))}
                </Select>
              </FormControl>
            </>
          )}
          {(txKind === "Send ETH" || func?.stateMutability === "payable") && (
            <FormControl isRequired>
              <FormLabel>Value</FormLabel>
              <InputGroup>
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
          )}
          {func && func.inputs.length > 0 && (
            <VStack w={"full"} spacing={2} alignItems={"start"}>
              <FormLabel>Parameters</FormLabel>
              <ParamsTable
                w={"full"}
                params={getInputFields(func.inputs)}
                bgColor={"transparent"}
              />
            </VStack>
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

              setTransactions([
                ...transactions,
                {
                  calldata:
                    txKind === "Send ETH"
                      ? "0x"
                      : "0x" + calldata!.substring(10),
                  signature:
                    txKind === "Send ETH"
                      ? ""
                      : new Interface(JSON.parse(abi))
                          .getFunction(func!.name)
                          .format("sighash"),
                  target: address!,
                  value:
                    txKind === "Send ETH"
                      ? parseEther(ethValue)
                      : func?.stateMutability === "payable"
                      ? parseEther(ethValue)
                      : parseEther("0"),
                },
              ])
              // close()
              // clear()
              // pickKind()
              return
            }}
          >
            Add
          </Button>
        </HStack>
      </CardFooter>
    </>
  )
}

const getInputFields = (
  params: readonly AbiParameter[],
  indices: number[] = []
): ParamSpec[] => {
  return params.map((input, i) => ({
    description: `${input.name}(${input.type})`,
    value:
      "components" in input ? (
        getInputFields(input.components, [...indices, i])
      ) : (
        <ParamInput
          param={input}
          indices={[...indices, i]}
          key={`param-${[...indices, i].join("-")}`}
        />
      ),
  }))
}

interface ParamInputProps extends TextareaProps {
  param: AbiParameter
  indices: number[]
}
const ParamInput = forwardRef<ParamInputProps, "textarea">(
  ({ param, indices, ...props }, ref) => {
    const { funcParams, setFuncParam } = useAddTransactionFormState()
    return (
      <Textarea
        minH={8}
        pt={"6px"}
        px={2}
        pb={0}
        // p={"6px 8px 0 8px"}
        resize={"vertical"}
        size={"sm"}
        borderRadius={"md"}
        ref={ref}
        variant={"filled"}
        placeholder={`${param.name}(${param.type})`}
        value={getFuncParam(funcParams, indices) as string}
        onChange={(e) => setFuncParam(indices, e.target.value)}
        {...props}
      />
    )
  }
)
