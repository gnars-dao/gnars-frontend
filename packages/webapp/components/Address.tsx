import { FC, useMemo } from "react";
import { useNnsNameWithEnsFallback } from "../hooks/useNnsNameWithEnsFallback";
import { shortAddress } from "../utils";
import { Avatar, AvatarProps, Box, HStack, Image, Link, PropsOf, Spinner, StackProps, Text } from "@chakra-ui/react";
import { useEnsData } from "hooks/useEnsData";
import { HiExternalLink } from "react-icons/hi";
import { useEnsAvatar } from "wagmi";

export type AddressProps = {
  address: string;
  withLink?: boolean;
  truncate?: boolean;
} & StackProps;

export const Address: FC<AddressProps> = ({ address, withLink = false, truncate = true, ...props }) => {
  const { isLoading, data: nnsOrEnsName } = useNnsNameWithEnsFallback(address);

  const { ensName, ensNameLoading, ensAvatar, ethAddress, displayName } = useEnsData(address);

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
              verticalAlign: "baseline"
            }}
          />
        )}
      </Text>
      <Text whiteSpace={"nowrap"}>
        {ensName ?? (truncate ? shortAddress(ethAddress ?? address) : (ethAddress ?? address))}
        {ensNameLoading && <Spinner boxSize={"36px"} thickness={"2px"} />}
        {ensNameLoading ? "ensNameLoading" : `ensNameLoaded: ${ensName}`}
        {ensAvatar ? <Image src={ensAvatar} alt="ens avatar" /> : `no current ens avatar`}
        {withLink && (
          <HiExternalLink
            style={{
              display: "inline",
              marginBottom: "-2px",
              maxWidth: "18px",
              maxHeight: "18px",
              verticalAlign: "baseline"
            }}
          />
        )}
      </Text>
    </HStack>
  );

  return withLink ? (
    <Link isExternal href={`https://etherscan.io/address/${address}`}>
      {content}
    </Link>
  ) : (
    content
  );
};
