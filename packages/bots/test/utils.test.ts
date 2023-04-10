import * as dotenv from "dotenv"
import { getGnarPngBuffer } from "../src/utils"

// dotenv.config()

const tokenId = 3000

test("it fetches the gnar image", async () => {
  await getGnarPngBuffer(tokenId.toString())
})

afterAll((done) => {
  done()
})
