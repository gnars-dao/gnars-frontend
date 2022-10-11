import buildSvg from "utils/buildSvg"
import LoadingGnar from "./LoadingGnar"

import gnarDataV2 from "../data/image-data-V2.json"

interface GnarProps {
  seed: {
    parts: {
      filename: string
      trait: string
      data: string
    }[]
    background: string
  }
}

export default function Gnar(props: GnarProps) {
  const { seed } = props

  if (!seed) return <LoadingGnar />

  const image = buildSvg(seed?.parts, gnarDataV2.palette, seed?.background)

  return (
    <div>
      <img src={image} alt={"gnar"} className="w-full" />
    </div>
  )
}
