import { FC } from "react";
// @ts-ignore
import { AccountAvatar } from "./AccountAvatar";
import { HStack, StackProps, VStack } from "@chakra-ui/react";

export interface AccountWithAvatarProps extends StackProps {
  address?: string;
  isLoading?: boolean;
  avatarImg?: string;
}

export const AccountWithAvatar: FC<AccountWithAvatarProps> = ({
  address,
  isLoading,
  avatarImg,
  children,
  ...props
}) => (
  <HStack w={"fit-content"} {...props}>
    <AccountAvatar isLoading={isLoading} address={address} avatarImg={avatarImg} />
    <VStack alignItems={"start"} spacing={0}>
      {children}
    </VStack>
  </HStack>
);
