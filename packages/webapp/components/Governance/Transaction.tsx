import { StackProps, Text, VStack } from "@chakra-ui/react"
import { AvatarWallet } from "components/AvatarWallet"
import { ParamSpec, ParamsTable } from "components/ParamsTable"
import { BigNumber, utils } from "ethers"
import { formatEther, getAddress, ParamType, Result } from "ethers/lib/utils"
import { FC } from "react"
import { TransactionData } from "utils/governanceUtils"

export interface TransactionProps extends StackProps {
  data: TransactionData
}

export const Transaction: FC<TransactionProps> = ({
  data: { calldata, signature, target, value },
  ...props
}) => {
  const address = getAddress(target) // Ensures address is in checksum format

  if (!signature) {
    return (
      <VStack alignItems={"start"} {...props}>
        <Text>
          Transfer <strong>{formatEther(value)}</strong> ETH to
        </Text>
        <AvatarWallet withLink truncateAddress={false} address={target} />
      </VStack>
    )
  }

  const iface = new utils.Interface(["function " + signature!])
  const func = iface.getFunction(signature!)
  const decodedData = iface.decodeFunctionData(
    func.name,
    iface.getSighash(signature!) + calldata.replace("0x", "")
  )

  return (
    <VStack alignItems={"start"} spacing={4} {...props}>
      <Text>
        Call <strong>{func.name}</strong>{" "}
        {BigNumber.from(value).gt(0)
          ? ` with ${formatEther(value)} ETH on`
          : " on"}
      </Text>
      <AvatarWallet withLink truncateAddress={false} address={target} />

      {signature && func.inputs.length > 0 && (
        <ParamsTable
          params={func.inputs.map((f, i) => toParamSpec(f, i, decodedData))}
        />
      )}
    </VStack>
  )
}

const toParamSpec = (
  param: ParamType,
  i: number,
  decodedData: Result
): ParamSpec => ({
  description: param.type,
  value:
    param.type === "tuple"
      ? param.components.map((c, j) => toParamSpec(c, j, decodedData[i]))
      : decodedData[i].toString(),
})
