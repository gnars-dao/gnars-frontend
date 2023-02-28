import {
  Avatar,
  AvatarProps,
  Box,
  HStack,
  Image,
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

export type AvatarWalletProps = {
  address: string
  variant?: AvatarProps["variant"]
} & StackProps

export const AvatarWallet: FC<AvatarWalletProps> = ({
  address,
  variant,
  ...props
}) => {
  const { data: nnsOrEnsName } = useNnsNameWithEnsFallback(address)
  const {
    isLoading: isLoadingEnsAvatar,
    isFetched: isFetchedEnsAvatar,
    data: ensAvatar,
  } = useEnsAvatar({
    addressOrName: address,
  })
  return (
    <HStack {...props}>
      {isLoadingEnsAvatar && <Spinner boxSize={6} p={2} />}
      {isFetchedEnsAvatar && (
        <Avatar
          variant={variant}
          src={ensAvatar}
          icon={<BlockiesSvgSync address={address} />}
          loading={"eager"}
          overflow={"clip"}
          boxSize={8}
        />
      )}
      <Box whiteSpace={"nowrap"}>{nnsOrEnsName ?? shortAddress(address)}</Box>
    </HStack>
  )
}
