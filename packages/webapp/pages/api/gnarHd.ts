import { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import sharp from "sharp"

export default async function gnarHdHandler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { accessory, background, glasses, body, head } = req.query

  const parts = path.resolve("./assets/gnars-hd/")

  const gnarHd = await sharp(`${parts}/BACKGROUND/${background ?? "FALLBACK"}.PNG`)
    .composite([
      { input: `${parts}/BODY/${body ?? "FALLBACK"}.PNG` },
      { input: `${parts}/ACCESSORY/${accessory ?? "FALLBACK"}.PNG` },
      { input: `${parts}/HEADS/${head ?? "FALLBACK"}.PNG` },
      { input: `${parts}/NOGGLES/${glasses ?? "FALLBACK"}.PNG` },
    ])
    .toBuffer()

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": gnarHd.length,
    "Cache-Control": "public, max-age=2678400",
  })
  res.write(gnarHd)
}
