import { forwardRef, Image as ChakraImage, ImageProps } from "@chakra-ui/react"
import { useMemo } from "react"
import ogGnarData from "../data/image-data.json"
import gnarDataV2 from "../data/image-data-V2.json"
import buildSvg from "../utils/buildSvg"
import loadingOg from "../assets/images/loadingOgGnar.gif"
import loadingV2 from "../assets/images/loadingV2Gnar.gif"
import { Gnartwork } from "../utils"

interface GnarImageProps extends ImageProps {
  isOg: boolean
  gnartwork?: Gnartwork
}

export const GnarImage = forwardRef<GnarImageProps, "img">(
  ({ isOg, gnartwork, ...props }, ref) => {
    console.log({ isOg, gnartwork, ...props })
    const image = useMemo(() => {
      if (!gnartwork) {
        return null
      }
      const palette = isOg ? ogGnarData.palette : gnarDataV2.palette
      const { body, accessory, head, noggles } = gnartwork.parts
      return buildSvg(
        [body, accessory, head, noggles],
        palette,
        gnartwork.background
      )
    }, [gnartwork])

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
      )
    }

    return (
      <ChakraImage
        ref={ref}
        w={"full"}
        src={image}
        alt={"gnar"}
        borderRadius={"md"}
        {...props}
      />
    )
  }
)
