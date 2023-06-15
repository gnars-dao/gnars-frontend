import {
  HStack,
  IconButton,
  StackProps,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react"
import { FC } from "react"
// @ts-ignore
import { FiCopy, FiExternalLink } from "react-icons/fi"
import { getAddress } from "viem"
import { shortAddress } from "../utils"

export type AccountAddress = {
  address: `0x${string}`
  truncate?: boolean
} & StackProps

export const AccountAddress: FC<AccountAddress> = ({
  address,
  truncate = false,
  ...props
}) => {
  const {
    isOpen: isCopiedTooltipOpen,
    onClose: hideCopiedTooltip,
    onOpen: showCopiedTooltip,
  } = useDisclosure()
  return (
    <HStack spacing={1} p={0}>
      <Tooltip
        isDisabled={!truncate}
        hasArrow
        placement="bottom"
        label={address}
        maxW={"fit-content"}
      >
        <Text whiteSpace={"nowrap"}>
          {truncate ? shortAddress(address) : getAddress(address)}
        </Text>
      </Tooltip>
      <Tooltip
        hasArrow
        isOpen={isCopiedTooltipOpen}
        label={"Copied!"}
        placement={"bottom"}
      >
        <IconButton
          variant={"ghost"}
          borderRadius={"full"}
          aria-label="Copy address to clipboard"
          size={"xs"}
          icon={<FiCopy size={"16px"} />}
          onClick={() => {
            navigator.clipboard.writeText(address)
            showCopiedTooltip()
            setTimeout(hideCopiedTooltip, 2500)
          }}
        />
      </Tooltip>
      <Tooltip hasArrow label={"Open on Etherscan"} placement={"bottom"}>
        <IconButton
          as={"a"}
          href={`https://etherscan.io/address/${address}`}
          target={"_blank"}
          p={0}
          variant={"ghost"}
          borderRadius={"full"}
          aria-label="Open on Etherscan"
          size={"xs"}
          icon={<FiExternalLink size={"16px"} />}
        />
      </Tooltip>
    </HStack>
  )
}
