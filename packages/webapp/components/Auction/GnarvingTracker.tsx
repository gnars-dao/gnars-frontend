import {
  HStack,
  Link,
  Progress,
  StackProps,
  Text,
  TypographyProps,
  VStack,
  type SystemProps,
} from "@chakra-ui/react"
import { GnarvingData } from "hooks/useGnarData"
import { FC } from "react"
import { formatConciseDurationInDays } from "utils/dateTimeFormat"

export interface GnarvingTrackerProps extends StackProps {
  gnarvingData: GnarvingData
}

const typographyProps: TypographyProps & SystemProps = {
  fontSize: "2xs",
  fontWeight: "bold",
  textTransform: "uppercase",
  _dark: { color: "whiteAlpha.500" },
  _light: { color: "blackAlpha.300" },
}

export const GnarvingTracker: FC<GnarvingTrackerProps> = ({
  gnarvingData: {
    auctionDuration,
    auctionsBetweenGnarvings,
    auctionsUntilNextGnarving,
  },
  ...props
}) => {
  return (
    <VStack spacing={0} {...props}>
      <HStack w="full" justifyContent={"space-between"}>
        <Link {...typographyProps} href={"#gnarving"}>
          {auctionsUntilNextGnarving} auctions until Gnarving (?)
        </Link>
        <Text {...typographyProps}>
          current auction duration:{" "}
          {formatConciseDurationInDays(auctionDuration)}
        </Text>
      </HStack>
      <Progress
        sx={{
          "div[role='progressbar']": {
            bgColor: "chakra-body-text",
          },
        }}
        w={"full"}
        h={"2px"}
        min={auctionsBetweenGnarvings}
        max={0}
        value={auctionsUntilNextGnarving}
        _light={{ bgColor: "blackAlpha.200" }}
        _dark={{ bgColor: "whiteAlpha.500" }}
      />
    </VStack>
  )
}
