import { HStack, IconButton, StackProps, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
// @ts-ignore
import { FiCopy, FiExternalLink } from "react-icons/fi"
import { getAddress } from "viem"
import { shortAddress } from "../utils"

export type AccountAddress = {
  address: `0x${string}`
  nnsOrEnsName?: string
  truncate?: boolean
} & StackProps

export const AccountAddress: FC<AccountAddress> = ({ address, nnsOrEnsName, truncate = false, ...props }) => {
  const { isOpen: isCopiedTooltipOpen, onClose: hideCopiedTooltip, onOpen: showCopiedTooltip } = useDisclosure()
  return (
    <HStack spacing={1} p={0} {...props}>
      <Tooltip isDisabled={!truncate} hasArrow placement="bottom" label={address} maxW={"fit-content"}>
        <Text whiteSpace={"nowrap"}>
          {nnsOrEnsName ? nnsOrEnsName : truncate ? shortAddress(address) : getAddress(address)}
        </Text>
      </Tooltip>
      <Tooltip hasArrow isOpen={isCopiedTooltipOpen} label={"Copied!"} placement={"bottom"}>
        <IconButton
          color={"chakra-body-text"}
          variant={"link"}
          borderRadius={"full"}
          aria-label="Copy address to clipboard"
          size={"xs"}
          minW={"12px"}
          icon={<FiCopy size={"12px"} />}
          onClick={() => {
            void navigator.clipboard.writeText(address)
            showCopiedTooltip()
            setTimeout(hideCopiedTooltip, 2500)
          }}
        />
      </Tooltip>
      <Tooltip hasArrow label={"Open on Basescan"} placement={"bottom"}>
        <IconButton
          color={"chakra-body-text"}
          as={"a"}
          href={`https://basescan.org/address/${address}`}
          target={"_blank"}
          variant={"link"}
          borderRadius={"full"}
          aria-label="Open on Basescan"
          size={"xs"}
          minW={"12px"}
          icon={<FiExternalLink size={"12px"} />}
        />
      </Tooltip>
    </HStack>
  )
}
