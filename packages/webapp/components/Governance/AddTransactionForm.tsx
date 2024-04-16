import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Divider,
  FormControl,
  FormErrorMessage,
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
import { AccountWithAvatar } from "components/AccountWithAvatar"
import { ContractBreadcrumbs } from "components/ContractBreadcrumbs"
import { ParamSpec, ParamsTable } from "components/ParamsTable"
import { useAccountQuery } from "hooks/useAccountQuery"
import { getEffectiveAbi, useEtherscanContractInfo } from "hooks/useEtherscanContractInfo"
import { useFunctions } from "hooks/useFunctions"
import { useParameterValidation } from "hooks/useParameterValidation"
import { FC, useEffect, useMemo } from "react"
import { useDebounceValue } from "usehooks-ts"
import { isValidName } from "utils/ensUtils"
import { getSignature } from "utils/functionUtils"
import { NounsTransactionData } from "utils/governanceUtils"
import { parseArrayParameter } from "utils/parseArrayParameter"
import { encodeFunctionData, getAbiItem, parseEther } from "viem"
import { getFuncParam, ParameterValue, useAddTransactionFormState } from "./AddTransactionForm.state"
import { useProposalCreationState } from "./ProposalCreationForm.state"

export interface AddTransactionFormProps extends CardProps {
  onAddTransaction: (transaction: NounsTransactionData) => void
}

export const AddTransactionForm: FC<AddTransactionFormProps> = ({ onAddTransaction, ...props }) => {
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

const PickTransactionKind = ({ }) => {
  const { pickKind, txKind, close, clear } = useAddTransactionFormState()
  return (
    <>
      <CardBody>
        <SimpleGrid w="full" columns={{ base: 1, md: 2 }} gap={2}>
          <Button h={20} variant={"outline"} w="full" onClick={() => pickKind("Send ETH")}>
            Send ETH
          </Button>
          <Button h={20} variant={"outline"} w="full" onClick={() => pickKind("Call contract")}>
            Call contract
          </Button>
        </SimpleGrid>
      </CardBody>
      <CardFooter justifyContent={"space-between"}>
        <Button
          onClick={() => {
            close()
            clear()
          }}
        >
          Cancel
        </Button>
      </CardFooter>
    </>
  )
}

interface TransactionDataFormProps { }

const TransactionDataForm: FC<TransactionDataFormProps> = ({ }) => {
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
      const parsedFuncParams = parseFuncParams(func.inputs, funcParams)
      return encodeFunctionData({
        abi: JSON.parse(abi),
        functionName: func.name,
        args: parsedFuncParams,
      })
    } catch (e) {
      return undefined
    }
  }, [abi, func, funcParams])

  // TODO: needs refactoring
  const debouncedAccountQuery = "" // useDebounceValue(accountQuery, 600)
  const { isLoading, address, ensAvatar, nnsOrEnsName } = useAccountQuery(debouncedAccountQuery)
  const { data: contractInfo } = useEtherscanContractInfo(address)

  useEffect(() => {
    if (!contractInfo) {
      setAbi("")
      return
    }

    setAbi(JSON.stringify(getEffectiveAbi(contractInfo)))
  }, [contractInfo, setAbi])

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
              {txKind === "Send ETH" ? "The account that will receive the ETH." : "The contract to be called."} You can
              use an address or an ENS name
            </FormHelperText>
          </FormControl>
          <AccountWithAvatar isLoading={isLoading} address={address} avatarImg={ensAvatar}>
            {!address && <Text>{!!accountQuery ? accountQuery : "Enter the destination account"}</Text>}
            {accountQuery && !address && !isLoading && (
              <Text color={"red.300"}>
                {isValidName(accountQuery) ? "Account not found" : "Invalid query. Use an address or ens name"}
              </Text>
            )}
            {contractInfo ? (
              <ContractBreadcrumbs contractInfo={contractInfo} />
            ) : (
              nnsOrEnsName && <Text>{nnsOrEnsName}</Text>
            )}
            {address && <AccountAddress address={address} />}
          </AccountWithAvatar>
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
                  onChange={(e) => setFunc(functions?.filter((f) => f.name === e.target.value)[0]! ?? undefined)}
                  isDisabled={!abi || !functions}
                >
                  <option value={""}>{functions ? "Select a function" : "Insert a valid ABI"}</option>
                  {functions &&
                    functions
                      .filter((f) => f.stateMutability !== "pure" && f.stateMutability !== "view")
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
              <ParamsTable w={"full"} params={getInputFields(func.inputs)} bgColor={"transparent"} />
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
                  calldata: (txKind === "Send ETH" ? "0x" : "0x" + calldata!.substring(10)) as `0x${string}`,
                  signature:
                    // TODO: needs refactor
                    txKind === "Send ETH" ? "" : "NEEDS REFACTOR: getSignature(getAbiItem({ abi: JSON.parse(abi), name: func!.name }))",// getSignature(getAbiItem({ abi: JSON.parse(abi), name: func!.name })),
                  target: address!,
                  value:
                    txKind === "Send ETH"
                      ? parseEther(ethValue)
                      : func?.stateMutability === "payable"
                        ? parseEther(ethValue)
                        : 0n,
                },
              ])
              close()
              clear()
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

const getInputFields = (params: readonly AbiParameter[], indices: number[] = []): ParamSpec[] => {
  return params.map((input, i) => ({
    description: `${input.name}(${input.type})`,
    value:
      "components" in input ? (
        getInputFields(input.components, [...indices, i])
      ) : (
        <ParamInput param={input} indices={[...indices, i]} key={`param-${[...indices, i].join("-")}`} />
      ),
  }))
}

interface ParamInputProps extends TextareaProps {
  param: AbiParameter
  indices: number[]
}
const ParamInput = forwardRef<ParamInputProps, "div">(({ param, indices, ...props }, ref) => {
  const { funcParams, setFuncParam } = useAddTransactionFormState()
  const value = getFuncParam(funcParams, indices) as string
  const { isValid, error } = useParameterValidation(param, value)

  return (
    <FormControl ref={ref} isInvalid={!isValid}>
      <Textarea
        minH={8}
        pt={"6px"}
        px={2}
        pb={0}
        // p={"6px 8px 0 8px"}

        resize={"vertical"}
        size={"sm"}
        borderRadius={"md"}
        variant={"filled"}
        placeholder={`${param.name}(${param.type})`}
        value={value}
        onChange={(e) => setFuncParam(indices, e.target.value)}
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
})

const parseFuncParams = (params: readonly AbiParameter[], values: ParameterValue[]): ParameterValue[] =>
  params.map((param, i) => {
    if (param.type.endsWith("[]")) return parseArrayParameter(values[i] as string) as ParameterValue
    if ("components" in param) return parseFuncParams(param.components, values[i] as ParameterValue[])
    return values[i]
  })
