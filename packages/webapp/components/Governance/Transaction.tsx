import { HStack, StackProps, Text, VStack } from "@chakra-ui/react"
import { AbiFunction, AbiParameter } from "abitype"
import { AccountAddress } from "components/AccountAddress"
import { AccountWithAvatar } from "components/AccountWithAvatar"
import { ContractBreadcrumbs } from "components/ContractBreadcrumbs"
import { ParamSpec, ParamsTable } from "components/ParamsTable"
import { BigNumber, utils } from "ethers"
import { formatEther, ParamType, Result } from "ethers/lib/utils"
import {
  getEffectiveAbi,
  useEtherscanContractInfo,
} from "hooks/useEtherscanContractInfo"
import { useNnsNameWithEnsFallback } from "hooks/useNnsNameWithEnsFallback"
import { FC } from "react"
import { TransactionData } from "utils/governanceUtils"
import { getAbiItem } from "viem"
import { useEnsAvatar } from "wagmi"

export interface TransactionProps extends StackProps {
  data: TransactionData
}

export const Transaction: FC<TransactionProps> = ({
  data: { calldata, signature, target, value },
  ...props
}) => {
  const { data: contractInfo, isLoading: isLoadingContractInfo } =
    useEtherscanContractInfo(target)
  const { data: nnsOrEnsName, isLoading: isLoadingNnsOrEnsName } =
    useNnsNameWithEnsFallback(target)
  const { data: ensAvatar, isLoading: isLoadingEnsAvatar } = useEnsAvatar({
    address: target as `0x${string}`,
  })

  const effectiveAbi = contractInfo ? getEffectiveAbi(contractInfo) : undefined

  if (!signature) {
    return (
      <VStack alignItems={"start"} {...props}>
        <Text>
          Transfer <strong>{formatEther(value)}</strong> ETH to
        </Text>
        <AccountWithAvatar
          isLoading={
            isLoadingContractInfo || isLoadingNnsOrEnsName || isLoadingEnsAvatar
          }
          address={target}
          avatarImg={ensAvatar ?? undefined}
        >
          <HStack divider={<Text px={2}>-</Text>}>
            {nnsOrEnsName && <Text>{nnsOrEnsName}</Text>}
            {contractInfo && (
              <ContractBreadcrumbs contractInfo={contractInfo} />
            )}
          </HStack>
          <AccountAddress address={target} />
        </AccountWithAvatar>
      </VStack>
    )
  }

  const iface = new utils.Interface(["function " + signature!])
  const func = iface.getFunction(signature!)
  const decodedData = iface.decodeFunctionData(
    func.name,
    iface.getSighash(signature!) + calldata.replace("0x", "")
  )

  const fullFunc = effectiveAbi
    ? (getAbiItem({ abi: effectiveAbi, name: func.name }) as AbiFunction)
    : undefined

  return (
    <VStack alignItems={"start"} spacing={4} {...props}>
      <Text>
        Call <strong>{func.name}</strong>{" "}
        {BigNumber.from(value).gt(0)
          ? ` with ${formatEther(value)} ETH on`
          : " on"}
      </Text>
      <AccountWithAvatar
        isLoading={
          isLoadingContractInfo || isLoadingNnsOrEnsName || isLoadingEnsAvatar
        }
        address={target}
        avatarImg={ensAvatar ?? undefined}
      >
        <HStack divider={<Text px={2}>-</Text>}>
          {nnsOrEnsName && <Text>{nnsOrEnsName}</Text>}
          {contractInfo && <ContractBreadcrumbs contractInfo={contractInfo} />}
        </HStack>
        <AccountAddress address={target} />
      </AccountWithAvatar>

      {signature && func.inputs.length > 0 && (
        <ParamsTable
          params={(fullFunc ?? func).inputs.map((f, i) =>
            toParamSpec(f, i, decodedData)
          )}
        />
      )}
    </VStack>
  )
}

const toParamSpec = (
  param: ParamType | AbiParameter,
  i: number,
  decodedData: Result
): ParamSpec => ({
  description: `${param.name ?? i} (${param.type})`,
  value:
    "components" in param && param.components !== null
      ? param.components.map((c, j) => toParamSpec(c, j, decodedData[i]))
      : decodedData[i].toString(),
})
