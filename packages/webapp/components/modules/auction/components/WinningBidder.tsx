import { useEffect } from "react";
import { AuctionDetail } from "./AuctionDetail";
import { Icon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { AccountAvatar } from "@components/AccountAvatar";
import { NULL_ADDRESS } from "@constants/baseAddresses";
import { ETHERSCAN_BASE_URL } from "@constants/etherscan";
import { useChainStore } from "stores/useChainStore";
import { useNnsNameWithEnsFallback } from "@hooks/useNnsNameWithEnsFallback";

export const WinningBidder = ({ owner }: { owner?: string }) => {
  const { displayName, ensAvatar, ensNameLoading } = useNnsNameWithEnsFallback(owner)
  const chain = useChainStore((x) => x.chain);

  useEffect(() => {
    console.log(`/modules/auction/components/WinningBidder`, { displayName, ensAvatar, ensNameLoading, chain, });
  }, [displayName, ensAvatar, ensNameLoading, chain]);

  return (
    <AuctionDetail title="Held by">
      {!owner || owner === NULL_ADDRESS ? (
        "N/A"
      ) : (
        <Flex direction={"row"} align={"center"}>
          <AccountAvatar address={owner} avatarImg={ensAvatar} isLoading={ensNameLoading} />
          <Box
            as="a"
            href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${owner}`}
            rel={"noopener noreferrer"}
            target="_blank"
            ml={"x2"}
          >
            {displayName}
          </Box>
          <Icon ml="x1" fill="text4" id="arrowTopRight" />
        </Flex>
      )}
    </AuctionDetail>
  );
};
