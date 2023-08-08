import { Image, ImageProps } from "@chakra-ui/next-js"
import { forwardRef } from "@chakra-ui/react"
import { useMemo } from "react"
import { getGnarsHdHiImageUrl } from "utils/gnarsHD"

export interface GnarHDImageProps extends Pick<ImageProps, "gridArea" | "width" | "height"> {
  gnarId: string
  seed: {
    accessory: number
    background: number
    body: number
    glasses: number
    head: number
  }
}

export const GnarHDImage = forwardRef<GnarHDImageProps, "img">(({ seed, gnarId, ...props }, ref) => {
  const gnarsHdUrl = useMemo(() => (seed ? getGnarsHdHiImageUrl(gnarId, seed) : ""), [gnarId, seed])
  return (
    <Image
      width={512}
      height={512}
      {...props}
      placeholder="empty"
      src={gnarsHdUrl}
      alt={`Gnar HD #${gnarId}`}
      quality={100}
      ref={ref}
    />
  )
})
