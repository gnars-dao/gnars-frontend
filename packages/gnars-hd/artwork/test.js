fs = require("fs")
const { readdirSync } = require("fs")
const mapping = require("./mapping")

for (const folder in mapping) {
  const artwork = Object.values(mapping[folder])
  for (file of readdirSync(`./parts/${folder}`)) {
    const name = file.split(".")[0]
    if (!artwork.includes(name)) {
      console.log("unused", `./parts/${folder}/${file}`)
    }
  }

  for (file of artwork) {
    // console.log({ folder, file })
    if (!fs.existsSync(`./parts/${folder}/${file}.PNG`)) {
      console.log("missing", `./parts/${folder}/${file}.PNG`)
    }
  }
}
