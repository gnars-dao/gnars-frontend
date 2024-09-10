import { FC } from "react";
import { Avatar, Spinner } from "@chakra-ui/react";

// @ts-ignore
import BlockiesSvgSync from "blockies-react-svg/dist/es/BlockiesSvgSync";
import { MdQuestionMark } from "react-icons/md";

export interface AccountAvatarProps {
  address?: string;
  isLoading?: boolean;
  avatarImg?: string | null;
}

export const AccountAvatar: FC<AccountAvatarProps> = ({ address, avatarImg, isLoading }) =>
  isLoading ? (
    <Spinner boxSize={"36px"} thickness={"2px"} />
  ) : (
    <Avatar
      variant={"delimited"}
      src={avatarImg ? avatarImg : ""}
      icon={
        address ? <BlockiesSvgSync address={address} /> : <MdQuestionMark />
      }
      bg={"gray.700"}
      ignoreFallback
      loading={"eager"}
      overflow={"clip"}
      boxSize={"36px"}
    />
  );
