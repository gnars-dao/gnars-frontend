// const image = `data:image/svg+xml;base64,${Buffer.from(
//   buildSVG(
//     parts,
//     BigInt(gnarId) < V2_START_ID ? imageData.palette : imageDataV2.palette,
//     background
//   ),
//   "utf8"
// ).toString("base64")}`

import { GnarPart } from "./index"

const decodeImage = (image: string) => {
  const data = image.replace(/^0x/, "")
  const paletteIndex = parseInt(data.substring(0, 2), 16)
  const bounds = {
    top: parseInt(data.substring(2, 4), 16),
    right: parseInt(data.substring(4, 6), 16),
    bottom: parseInt(data.substring(6, 8), 16),
    left: parseInt(data.substring(8, 10), 16),
  }
  const rects = data.substring(10)

  return {
    paletteIndex,
    bounds,
    rects:
      rects
        ?.match(/.{1,4}/g)
        ?.map((rect) => [
          parseInt(rect.substring(0, 2), 16),
          parseInt(rect.substring(2, 4), 16),
        ]) ?? [],
  }
}

export default function buildSvg(
  parts: GnarPart[],
  paletteColors: string[],
  bgColor?: string
) {
  const svgWithoutEndTag = parts.reduce((result, part) => {
    const svgRects: string[] = []
    const { bounds, rects } = decodeImage(part.data)

    let currentX = bounds.left
    let currentY = bounds.top

    rects.forEach((rect) => {
      const [length, colorIndex] = rect
      const hexColor = paletteColors[colorIndex]

      // Do not push rect if transparent
      if (colorIndex !== 0) {
        svgRects.push(
          `<rect width="${length * 10}" height="10" x="${currentX * 10}" y="${
            currentY * 10
          }" fill="#${hexColor}" />`
        )
      }

      currentX += length
      if (currentX === bounds.right) {
        currentX = bounds.left
        currentY++
      }
    })
    result += svgRects.join("")
    return result
  }, `<svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">${bgColor ? `<rect width="100%" height="100%" fill="#${bgColor}" />` : ""}`)

  const completedSvg = `${svgWithoutEndTag}</svg>`

  return `data:image/svg+xml;base64,${Buffer.from(
    completedSvg,
    "utf-8"
  ).toString("base64")}`
}
