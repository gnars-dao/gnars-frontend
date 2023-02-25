import buildSvg from "utils/buildSvg"
import LoadingGnar from "./LoadingGnar"

import ogGnarData from "../data/image-data.json"
import gnarDataV2 from "../data/image-data-V2.json"

interface GnarProps {
  isOg: boolean
  seed:
    | {
        parts: {
          filename: string
          trait?: string
          data: string
        }[]
        background: string
      }
    | undefined
}

export default function Gnar(props: GnarProps) {
  const { seed, isOg } = props

  if (!seed) return <LoadingGnar />

  const palette = isOg ? ogGnarData.palette : gnarDataV2.palette
  const image = buildSvg(seed?.parts, palette, seed?.background)

  //  @TODO add tooltip with part names (with tappable icon on mobile)
  return (
    <div>
      <img src={image} alt={"gnar"} className="w-full" />
    </div>
  )
}
