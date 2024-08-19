import { Image, ImageProps, forwardRef } from "@chakra-ui/react";
import { useMemo } from "react";
import { getGnarsHdLoImageUrl } from "utils/gnarsHD";

export interface GnarHDImageProps extends ImageProps {
  gnarId: string;
  seed: {
    accessory: number;
    background: number;
    body: number;
    glasses: number;
    head: number;
  };
}

export const GnarHDImage = forwardRef<GnarHDImageProps, "img">(({ seed, gnarId, ...props }, ref) => {
  const gnarsHdUrl = useMemo(() => getGnarsHdLoImageUrl(seed), [seed]);
  return <Image src={gnarsHdUrl} alt={`Gnar HD #${gnarId}`} ref={ref} {...props} />;
});
