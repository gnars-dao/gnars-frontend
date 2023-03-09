import {
  StackDivider,
  StackDividerProps,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react"
import { FC } from "react"

export const SubtleStackDivider: FC<StackDividerProps> = (props) => {
  const { colorMode } = useColorMode()
  return (
    <StackDivider
      borderColor={colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300"}
      {...props}
    />
  )
}
