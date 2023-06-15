import { FC } from "react"
import { useEnsAvatar } from "wagmi"
import { useNnsNameWithEnsFallback } from "../hooks/useNnsNameWithEnsFallback"
// @ts-ignore
import { AccountAddress } from "./AccountAddress"
import { AccountWithAvatar, AccountWithAvatarProps } from "./AccountWithAvatar"

export type AvatarWalletProps = {
  address: string
} & AccountWithAvatarProps

export const AvatarWallet: FC<AvatarWalletProps> = ({ address, ...props }) => {
  const { data: nnsOrEnsName, isLoading: isLoadingNnsOrEnsName } =
    useNnsNameWithEnsFallback(address)
  const { data: ensAvatar, isLoading: isLoadingEnsAvatar } = useEnsAvatar({
    address: address as `0x${string}`,
  })

  return (
    <AccountWithAvatar
      address={address}
      avatarImg={ensAvatar ?? undefined}
      isLoading={isLoadingNnsOrEnsName || isLoadingEnsAvatar}
      {...props}
    >
      <AccountAddress
        truncate
        address={address as `0x${string}`}
        nnsOrEnsName={nnsOrEnsName ?? undefined}
      />
    </AccountWithAvatar>
  )

  // const content = (
  //   <HStack {...props}>
  //     {isLoadingEnsAvatar && <Spinner boxSize={"36px"} thickness={"2px"} />}
  //     {isFetchedEnsAvatar && (
  //       <Avatar
  //         variant={variant}
  //         src={ensAvatar ?? undefined}
  //         icon={<BlockiesSvgSync address={address} />}
  //         loading={"eager"}
  //         overflow={"clip"}
  //         boxSize={"36px"}
  //       />
  //     )}
  //     <Text whiteSpace={"nowrap"} px={2}>
  //       {nnsOrEnsName ?? (truncateAddress ? shortAddress(address) : address)}
  //       {withLink && (
  //         <HiExternalLink
  //           style={{
  //             display: "inline",
  //             marginBottom: "-2px",
  //             maxWidth: "18px",
  //             maxHeight: "18px",
  //             verticalAlign: "baseline",
  //           }}
  //         />
  //       )}
  //     </Text>
  //   </HStack>
  // )

  // return withLink ? (
  //   <Link isExternal href={`https://etherscan.io/address/${address}`}>
  //     {content}
  //   </Link>
  // ) : (
  //   content
  // )
}
