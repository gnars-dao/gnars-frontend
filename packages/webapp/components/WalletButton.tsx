import { Button, ButtonProps, HStack, Text } from "@chakra-ui/react";
import { ConnectKitButton, useModal } from "connectkit";
import { useNnsNameWithEnsFallback } from "hooks/useNnsNameWithEnsFallback";
import { shortAddress } from "utils";
import { useAccount, useEnsAvatar } from "wagmi";
import { AccountAvatar } from "./AccountAvatar";

export const WalletButton = (props: ButtonProps) => {
  const { address } = useAccount();
  const { open } = useModal();
  const { data: nnsOrEnsName, isLoading: isLoadingNnsOrEnsName } = useNnsNameWithEnsFallback(address);
  const { data: avatarImg, isLoading: isLoadingAvatar } = useEnsAvatar({
    name: String(nnsOrEnsName)
  });
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <Button h={12} w={"fit-content"} py={"6px"} px={"6px"} onClick={show} borderRadius={"full"} {...props}>
            {address ? (
              <HStack px={1}>
                <AccountAvatar
                  address={address}
                  avatarImg={avatarImg ?? undefined}
                  isLoading={isLoadingAvatar || isLoadingNnsOrEnsName}
                />
                <Text px={2} whiteSpace={"nowrap"}>
                  {String(nnsOrEnsName) ?? shortAddress(address)}
                </Text>
              </HStack>
            ) : (
              <Text px={4}>Connect Wallet</Text>
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
