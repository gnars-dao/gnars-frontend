const fs = require("fs")
const sharp = require("sharp")
let sharpProcesses = []
const { mkdirSync } = require("fs")
const mapping = require("./mapping")

const outFolder = {
  ACESSORY: "ACCESSORY",
  BACKGROUND: "BACKGROUND",
  BODY: "BODY",
  HEADS: "HEADS",
  NOGGLES: "NOGGLES",
}

try {
  fs.rmSync("./dist-hi", { recursive: true })
  fs.rmSync("./dist-lo", { recursive: true })
} catch {
} finally {
  mkdirSync("./dist-hi")
  mkdirSync("./dist-lo")
}

for (const folder in mapping) {
  mkdirSync(`./dist-hi/${outFolder[folder]}`)
  mkdirSync(`./dist-lo/${outFolder[folder]}`)
  const artwork = Object.entries(mapping[folder])
  for ([index, file] of artwork) {
    fs.copyFileSync(`./parts/${folder}/${file}.PNG`, `./dist-hi/${outFolder[folder]}/${index}.PNG`)
    sharpProcesses.push(
      sharp(`./dist-hi/${outFolder[folder]}/${index}.PNG`)
        .resize(512, 512)
        .png({ palette: true, compressionLevel: 9, quality: 50 })
        .toFile(`./dist-lo/${outFolder[folder]}/${index}.PNG`)
    )
  }
}

Promise.all(sharpProcesses).then(() => {
  console.log("done")
})
