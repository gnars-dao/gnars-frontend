import { NextApiRequest, NextApiResponse } from "next"
import sharp from "sharp"

export default async function gnarHdHandler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { accessory, background, glasses, body, head } = req.query

  const gnarHd = await sharp(`./public/gnars-hd/BACKGROUND/${background ?? "FALLBACK"}.PNG`)
    .composite([
      { input: `./public/gnars-hd/BODY/${body ?? "FALLBACK"}.PNG` },
      { input: `./public/gnars-hd/ACCESSORY/${accessory ?? "FALLBACK"}.PNG` },
      { input: `./public/gnars-hd/HEADS/${head ?? "FALLBACK"}.PNG` },
      { input: `./public/gnars-hd/NOGGLES/${glasses ?? "FALLBACK"}.PNG` },
    ])
    .toBuffer()

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": gnarHd.length,
  })
  res.write(gnarHd)
}
