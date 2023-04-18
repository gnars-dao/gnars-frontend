import { FC } from "react"
import {
  Center,
  Code,
  HStack,
  List,
  ListItem,
  OrderedList,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import { defaultAbiCoder, formatEther, getAddress } from "ethers/lib/utils"
import { AvatarWallet } from "../AvatarWallet"
import { BigNumber, Contract, utils } from "ethers"
import { Address } from "../Address"
import { chakra } from "@chakra-ui/react"
import { useQuery } from "wagmi"

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
  const address = getAddress(target) // Ensures address is in checksum format
  const { data: contractIface } = useQuery(["abi", target], () => {
    return Promise.all([
      fetch(
        `https://repo.sourcify.dev/contracts/full_match/1/${address}/metadata.json`
      ),
      fetch(
        `https://repo.sourcify.dev/contracts/partial_match/1/${address}/metadata.json`
      ),
    ])
      .then(([fullMatch, partialMatch]) => fullMatch ?? partialMatch)
      .then((res) => (res ? res.json() : null))
      .then((abi) => (abi ? new Contract(address, abi).interface : null))
  })

  if (!signature && calldata === "0x") {
    return (
      <Text>
        Transfer <strong>{formatEther(value)}</strong> ETH to
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

  const params = decodedData.toString().split(",")

  return (
    <VStack alignItems={"start"}>
      <Text>
        {BigNumber.from(value).isZero()
          ? "Call "
          : `Send ${formatEther(value)} to `}
        {
          <Address
            address={target}
            withLink
            truncate={false}
            display="inline-flex"
          />
        }
        .{func.name}(<br />
      </Text>
      <SimpleGrid
        gridGap={"1px"}
        columns={1}
        p={2}
        alignItems={"start"}
        bgColor={"whiteAlpha.50"}
        borderWidth={1}
      >
        {params.flatMap((param, i) => [
          <Text
            py={1}
            lineHeight={1}
            fontSize={"sm"}
            fontWeight={"bold"}
            color={"whiteAlpha.600"}
          >
            {contractIface
              ? contractIface.getFunction(func.name).inputs[i].name
              : `parameter ${i}`}
          </Text>,

          <Text
            pb={i < params.length - 1 ? 2 : 1}
            lineHeight={1}
            borderBottomWidth={i < params.length - 1 ? 1 : 0}
          >
            {param}
          </Text>,
        ])}
      </SimpleGrid>
      <Text>)</Text>
    </VStack>
  )

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
