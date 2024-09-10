import { useMemo } from "react";
import loadingOg from "@assets/images/loadingOgGnar.gif";
import loadingV2 from "@assets/images/loadingV2Gnar.gif";
import { Image as ChakraImage, ImageProps, forwardRef } from "@chakra-ui/react";
import gnarDataV2 from "@data/image-data-V2.json";
import ogGnarData from "@data/image-data.json";
import { Gnartwork } from "@utils";
import buildSvg from "@utils/buildSvg";

interface GnarImageProps extends ImageProps {
  isOg: boolean;
  gnartwork?: Gnartwork;
}

export const GnarImage = forwardRef<GnarImageProps, "img">(({ isOg, gnartwork, ...props }, ref) => {
  const image = useMemo(() => {
    if (!gnartwork) {
      return null;
    }
    const palette = isOg ? ogGnarData.palette : gnarDataV2.palette;
    const { body, accessory, head, noggles } = gnartwork.parts;
    return buildSvg([body, accessory, head, noggles], palette, gnartwork.background);
  }, [gnartwork, isOg]);

  if (!image) {
    return (
      <ChakraImage
        ref={ref}
        w={"full"}
        src={isOg ? loadingOg.src : loadingV2.src}
        alt={"gnar"}
        borderRadius={"md"}
        {...props}
      />
    );
  }

  return <ChakraImage ref={ref} w={"full"} src={image} alt={"gnar"} borderRadius={"md"} {...props} />;
});
