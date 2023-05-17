import { FC } from "react"
import {
  Center,
  Code,
  HStack,
  List,
  ListItem,
  OrderedList,
  SimpleGrid,
  StackProps,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import {
  defaultAbiCoder,
  formatEther,
  getAddress,
  ParamType,
} from "ethers/lib/utils"
import { BigNumber, Contract, utils } from "ethers"
import { Address } from "../Address"
import { chakra } from "@chakra-ui/react"
import { useQuery } from "wagmi"
import { AvatarWallet } from "components/AvatarWallet"
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
    <VStack alignItems={"start"} {...props}>
      <Text>
        Call <strong>{func.name}</strong>{" "}
        {BigNumber.from(value).gt(0)
          ? ` with ${formatEther(value)} ETH on`
          : " on"}
      </Text>
      <AvatarWallet withLink truncateAddress={false} address={target} />

      {signature && (
        <SimpleGrid
          minW={"md"}
          gridGap={"1px"}
          columns={1}
          p={2}
          alignItems={"start"}
          bgColor={"whiteAlpha.50"}
          borderWidth={1}
          sx={{
            ".param-value": {
              pb: 2,
              // pb={i < params.length - 1 ? 2 : 1}
              "&:not(:last-child)": {
                borderBottomWidth: 1,
                pb: 2,
              },
              "&:last-child": {
                pb: 1,
              },
            },
          }}
        >
          {func.inputs.flatMap((param, i) => {
            const paramDescription =
              param.type === "tuple"
                ? `tuple(${param.components.map((c) => c.type).join(",")})`
                : param.type

            const paramValue =
              param.type === "tuple"
                ? decodedData[i].map((v: any) => v.toString()).join(", ")
                : decodedData[i].toString()

            return [
              <Text
                className="param-description"
                key={`param-${i}-description`}
                py={1}
                lineHeight={1}
                fontSize={"sm"}
                fontWeight={"bold"}
                color={"whiteAlpha.600"}
              >
                {i}: {paramDescription}
              </Text>,

              <Text
                className="param-value"
                key={`param-${i}-value`}
                lineHeight={1}
              >
                {paramValue}
              </Text>,
            ]
          })}
        </SimpleGrid>
      )}
    </VStack>
  )
}
