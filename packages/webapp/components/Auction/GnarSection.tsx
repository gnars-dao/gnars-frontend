import { FC } from "react";
import { V2_START_ID } from "../../constants/gnarsDao";
import useGnarData, { GnarData } from "../../hooks/useGnarData";
import Gnar from "../Gnar";
import Menu from "../Menu";
import { GnarInfo } from "./GnarInfo";
import {
  AspectRatio,
  Box,
  Center,
  ColorMode,
  ColorModeProvider,
  HStack,
  Spinner,
  Stack,
  VStack,
  useBreakpointValue
} from "@chakra-ui/react";
import { getGnarBgColor, isBgDark } from "utils";

interface AuctionProps {
  desiredGnarId?: number;
  initialGnarData?: GnarData;
}

const GnarSection: FC<AuctionProps> = ({ desiredGnarId, initialGnarData }) => {
  const gnarData = useGnarData(desiredGnarId, initialGnarData).data;
  const isOg = !!desiredGnarId && desiredGnarId < V2_START_ID;
  const fallbackBg = "#d5d7e1";
  const gnarBgColor = getGnarBgColor(isOg, fallbackBg, gnarData);
  const hasDarkBg = isBgDark(gnarBgColor);
  const gnarInfoColorMode =
    useBreakpointValue<ColorMode>({
      base: "dark",
      lg: hasDarkBg ? "dark" : "light"
    }) ?? "dark";

  return (
    <ColorModeProvider value={hasDarkBg ? "dark" : "light"}>
      <Box color={"chakra-body-text"} w={"full"} sx={{ "--gnar-bg-color": gnarBgColor }}>
        <Menu bgColor={gnarBgColor} />
        <Stack w={"full"} h={"fit-content"} direction={{ base: "column", lg: "row" }} spacing={0}>
          <HStack key={desiredGnarId} bgColor={gnarBgColor} flex={"auto"} justifyContent={"center"}>
            <AspectRatio ratio={1 / 1} w={"full"} maxW={["320px", "512px"]}>
              <Gnar isOg={isOg} gnarData={gnarData} />
            </AspectRatio>
          </HStack>
          <ColorModeProvider value={gnarInfoColorMode}>
            <VStack
              color={"chakra-body-text"}
              alignItems={"start"}
              pt={{ base: 20, lg: "2%" }}
              px={{ base: 6, lg: 0 }}
              flex={1}
              bgColor={{ base: undefined, lg: gnarBgColor }}
            >
              {gnarData ? (
                <GnarInfo isOg={isOg} gnarData={gnarData} />
              ) : (
                <Center w={"full"} flexGrow={1}>
                  <Spinner size={"xl"} />
                </Center>
              )}
            </VStack>
          </ColorModeProvider>
        </Stack>
      </Box>
    </ColorModeProvider>
  );
};
export default GnarSection;
