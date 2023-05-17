import {
  Avatar,
  AvatarProps,
  Box,
  HStack,
  Image,
  Link,
  PropsOf,
  Spinner,
  StackProps,
  Text,
} from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { useEnsAvatar } from "wagmi"
import { useNnsNameWithEnsFallback } from "../hooks/useNnsNameWithEnsFallback"
import { shortAddress } from "../utils"
import { HiExternalLink } from "react-icons/hi"

export type AddressProps = {
  address: string
  withLink?: boolean
  truncate?: boolean
} & StackProps

export const Address: FC<AddressProps> = ({
  address,
  withLink = false,
  truncate = true,
  ...props
}) => {
  const { isLoading, data: nnsOrEnsName } = useNnsNameWithEnsFallback(address)

  const content = (
    <HStack {...props}>
      <Text whiteSpace={"nowrap"}>
        {nnsOrEnsName ?? (truncate ? shortAddress(address) : address)}
        {isLoading && <Spinner boxSize={"36px"} thickness={"2px"} />}
        {withLink && (
          <HiExternalLink
            style={{
              display: "inline",
              marginBottom: "-2px",
              maxWidth: "18px",
              maxHeight: "18px",
              verticalAlign: "baseline",
            }}
          />
        )}
      </Text>
    </HStack>
  )

  return withLink ? (
    <Link isExternal href={`https://etherscan.io/address/${address}`}>
      {content}
    </Link>
  ) : (
    content
  )
}
