import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

export const AuctionDetail = ({ title, children }: { title: string; children: ReactNode }) => (
  <Flex direction={"column"} style={{ flexBasis: "50%", flexGrow: 1, color: "white !important" }}>
    <Box className={"tertiary"} color="white" textAlign={"center"} fontSize={"large"} margin={"10px 0"}>
      {title}
    </Box>
    <Box className={"secondary"} color="white" mt={"5px"} textAlign={"center"} fontSize={"large"} margin={"10px 0"}>
      {children}
    </Box>
  </Flex>
);
