import { FC } from "react";
import { StackDivider, StackDividerProps, useBreakpointValue, useColorMode } from "@chakra-ui/react";

export const SubtleStackDivider: FC<StackDividerProps> = (props) => {
  const { colorMode } = useColorMode();
  return <StackDivider borderColor={colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300"} {...props} />;
};
