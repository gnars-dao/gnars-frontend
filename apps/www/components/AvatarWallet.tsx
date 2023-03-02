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
import BlockiesSvgSync from "blockies-react-svg/dist/es/BlockiesSvgSync.mjs"
import { shortAddress } from "../utils"
import { HiExternalLink } from "react-icons/all"

export type AvatarWalletProps = {
  address: string
  withLink?: boolean
  variant?: AvatarProps["variant"]
} & StackProps

export const AvatarWallet: FC<AvatarWalletProps> = ({
  address,
  withLink = false,
  variant,
  ...props
}) => {
  const { data: nnsOrEnsName } = useNnsNameWithEnsFallback(address)
  const {
    isLoading: isLoadingEnsAvatar,
    isFetched: isFetchedEnsAvatar,
    data: ensAvatar,
  } = useEnsAvatar({
    address: address as `0x${string}`,
  })

  const content = (
    <HStack {...props}>
      {isLoadingEnsAvatar && <Spinner boxSize={6} p={2} />}
      {isFetchedEnsAvatar && (
        <Avatar
          variant={variant}
          src={ensAvatar}
          icon={<BlockiesSvgSync address={address} />}
          loading={"eager"}
          overflow={"clip"}
          boxSize={"36px"}
        />
      )}
      <Text whiteSpace={"nowrap"}>
        {nnsOrEnsName ?? shortAddress(address)}
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
