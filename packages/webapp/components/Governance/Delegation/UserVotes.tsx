import { FC } from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { useDelegationInfo } from "hooks/useDelegationInfo";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";

export interface UserVotesProps extends TextProps {}

const InnerUserVotes: FC<UserVotesProps> = ({ ...props }) => {
  const { address } = useAccount();

  const { data: delegation } = useDelegationInfo(address);

  if (!address || !delegation || !delegation?.delegate) return <></>;

  return (
    <Text {...props}>
      {delegation.delegate.delegatedVotes > 0 ? `${delegation.delegate.delegatedVotes} votes` : "No votes"}
    </Text>
  );
};

export const UserVotes = dynamic(() => Promise.resolve(InnerUserVotes), {
  ssr: false
});
