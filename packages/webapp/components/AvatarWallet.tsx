import { FC } from "react";
import { useNnsNameWithEnsFallback } from "@hooks/useNnsNameWithEnsFallback";
// @ts-ignore
import { AccountAddress } from "./AccountAddress";
import { AccountWithAvatar, AccountWithAvatarProps } from "./AccountWithAvatar";
import { Text } from "@chakra-ui/react";
import { useEnsAvatar } from "wagmi";

export type AvatarWalletProps = {
  address: string;
} & AccountWithAvatarProps;

export const AvatarWallet: FC<AvatarWalletProps> = ({ address, ...props }) => {
  const { data: nnsOrEnsName, isLoading: isLoadingNnsOrEnsName } = useNnsNameWithEnsFallback(address);
  const { data: ensAvatar, isLoading: isLoadingEnsAvatar } = useEnsAvatar({
    name: String(nnsOrEnsName)
  });

  return (
    <AccountWithAvatar
      address={address}
      avatarImg={ensAvatar ?? undefined}
      isLoading={isLoadingNnsOrEnsName || isLoadingEnsAvatar}
      {...props}
    >
      {String(nnsOrEnsName) && <Text whiteSpace={"nowrap"}>{String(nnsOrEnsName)}</Text>}
      <AccountAddress truncate address={address as `0x${string}`} />
    </AccountWithAvatar>
  );

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
};
