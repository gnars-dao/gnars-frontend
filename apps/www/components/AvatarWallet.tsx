import {
  Avatar,
  AvatarProps,
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
import * as blockies from "blockies-ts"
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
  const blockid = useMemo(
    () => blockies.create({ seed: address }).toDataURL(),
    [address]
  )
  return (
    <HStack {...props}>
      {isLoadingEnsAvatar && <Spinner boxSize={6} p={2} />}
      {isFetchedEnsAvatar && (
        <Avatar
          variant={variant}
          src={ensAvatar}
          icon={<Image borderRadius={"full"} src={blockid} />}
          loading={"eager"}
          boxSize={8}
        />
      )}
      <Text whiteSpace={"nowrap"}>{nnsOrEnsName ?? shortAddress(address)}</Text>
    </HStack>
  )
}
