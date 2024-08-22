import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

export const AuctionDetails = ({ children }: { children: ReactNode }) => {
  return (
    <Flex align={"center"} direction={"column"}>
      <Flex direction={"row"} width={"100%"} gap="x4">
        {children}
      </Flex>
    </Flex>
  );
};
