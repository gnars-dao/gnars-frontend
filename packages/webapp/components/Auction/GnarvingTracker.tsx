import { Link, Progress, SimpleGrid, SimpleGridProps, Text, TypographyProps, type SystemProps } from "@chakra-ui/react";
import { GnarvingData } from "hooks/useGnarData";
import { FC } from "react";
import { formatConciseDurationInDays } from "utils/dateTimeFormat";

export interface GnarvingTrackerProps extends SimpleGridProps {
  gnarvingData: GnarvingData;
}

const typographyProps: TypographyProps & SystemProps = {
  fontSize: "2xs",
  fontWeight: "bold",
  textTransform: "uppercase",
  _dark: { color: "whiteAlpha.500" },
  _light: { color: "blackAlpha.300" }
};

export const GnarvingTracker: FC<GnarvingTrackerProps> = ({
  gnarvingData: { auctionDuration, auctionsBetweenGnarvings, auctionsUntilNextGnarving },
  ...props
}) => {
  return (
    <SimpleGrid
      templateAreas={{
        base: `"counter" "progress" "duration"`,
        sm: `"progress progress" "counter duration"`
      }}
      spacing={0}
      {...props}
    >
      <Link gridArea={"counter"} justifySelf={["center", "start"]} {...typographyProps} href={"#gnarving"}></Link>
    </SimpleGrid>
  );
};
