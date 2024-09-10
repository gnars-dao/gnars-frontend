import { FC } from "react";
import { AvatarWallet } from "../AvatarWallet";
import {
  Link,
  SimpleGrid,
  StackDivider,
  StackProps,
  Text,
  VStack,
  useBreakpointValue,
  useColorMode
} from "@chakra-ui/react";
import { Bid } from "@hooks/hooks/useGnarData";
import { HiExternalLink } from "react-icons/hi";
import { formatEther } from "viem";

export interface BidsTableProps extends StackProps {
  bids: Bid[];
}
export const BidsTable: FC<BidsTableProps> = ({ bids, ...props }) => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300";
  const columns = useBreakpointValue([1, 2]);

  return (
    <VStack
      overflowY={"scroll"}
      borderRadius={"md"}
      borderColor={borderColor}
      borderWidth={1}
      w={"full"}
      divider={<StackDivider />}
      spacing={0}
      fontSize={"sm"}
      {...props}
    >
      {bids.map((bid, i) => (
        <SimpleGrid py={2} px={4} key={`bid-${i}`} columns={columns} w={"full"}>
          <AvatarWallet address={bid.bidder} justifySelf={"start"} />

          <Link isExternal justifySelf={"end"} alignSelf={"center"} href={`https://etherscan.io/tx/${bid.id}`}>
            <Text>
              {formatEther(BigInt(bid.amount))} ETH{" "}
              <HiExternalLink
                style={{
                  display: "inline",
                  verticalAlign: "text-bottom"
                }}
              />
            </Text>
          </Link>
        </SimpleGrid>
      ))}
    </VStack>
  );
};
