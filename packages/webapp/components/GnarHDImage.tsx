import { Image, ImageProps } from "@chakra-ui/next-js"
import { forwardRef } from "@chakra-ui/react"
import { useMemo } from "react"
import { getGnarsHdHiImageUrl } from "utils/gnarsHD"

export interface GnarHDImageProps extends ImageProps {
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
  return <Image {...props} width={512} height={512} src={gnarsHdUrl} alt={`Gnar HD #${gnarId}`} unoptimized ref={ref} />
})
