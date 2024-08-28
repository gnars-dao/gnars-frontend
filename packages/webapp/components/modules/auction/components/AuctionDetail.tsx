import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

export const AuctionDetail = ({ title, children }: { title: string; children: ReactNode }) => (
  <Flex direction={"column"} style={{ flexBasis: "50%", flexGrow: 0 }}>
    <Box className={"tertiary"}>{title}</Box>
    <Box className={"secondary"} mt={"5px"}>
      {children}
    </Box>
  </Flex>
);
