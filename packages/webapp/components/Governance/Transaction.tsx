import { FC } from "react"
import { Code, HStack, Text, VStack } from "@chakra-ui/react"
import { defaultAbiCoder, formatEther } from "ethers/lib/utils"
import { AvatarWallet } from "../AvatarWallet"
import { BigNumber, utils } from "ethers"
import { Address } from "../Address"

export interface TransactionProps {
  target: string
  signature?: string
  value: string
  calldata: string
}

export const Transaction: FC<TransactionProps> = ({
  target,
  signature,
  value,
  calldata,
}) => {
  if (!signature && calldata === "0x") {
    return (
      <Text>
        Transfer <strong>{formatEther(value)}</strong>ETH to
        <AvatarWallet withLink truncateAddress={false} address={target} />
      </Text>
    )
  }

  const iface = new utils.Interface(["function " + signature!])
  const func = iface.getFunction(signature!)
  const decodedData = iface.decodeFunctionData(
    func.name,
    iface.getSighash(signature!) + calldata.replace("0x", "")
  )

  if (BigNumber.from(value).isZero()) {
    return (
      <HStack alignItems={"start"}>
        <Text>
          Call <Address address={target} withLink truncate={false} />.
          {func.name}({decodedData.toString()})
        </Text>
      </HStack>
    )
  }

  return (
    <VStack alignItems={"start"}>
      <Text>
        Send <strong>{formatEther(value)}</strong>ETH to{" "}
        <Address address={target} withLink truncate={false} />.{signature}
      </Text>
      <Text wordBreak={"break-word"}>With: {calldata}</Text>
    </VStack>
  )
}
