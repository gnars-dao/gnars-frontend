import { QueryClient } from "@tanstack/react-query"
import { BigNumberish } from "ethers"
import { formatEther, parseEther } from "ethers/lib/utils"
import { GnarSeed } from "types"
import gnarDataV2 from "../data/image-data-V2.json"
import { V2_START_ID } from "./contracts"

export const queryClient = new QueryClient()

export const nFormatter = (num: number, digits: number = 2) => {
  if (num < 10000) return num.toFixed(2)
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "g" },
    { value: 1e12, symbol: "t" },
    { value: 1e15, symbol: "p" },
    { value: 1e18, symbol: "e" },
  ]

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0"
}

export const truncatedAmount = (amount: string) => {
  return Number(formatEther(amount)).toFixed(3)
}

export const getGnarDataV2 = (seed: GnarSeed) => {
  if (!seed) return
  const { bodies, accessories, heads, glasses } = gnarDataV2.images
  return {
    parts: [
      bodies[seed.body],
      accessories[seed.accessory],
      heads[seed.head],
      glasses[seed.glasses],
    ],
    background: gnarDataV2.bgcolors[seed.background],
  }
}

// V2 background colors
// background-95 008080 dark
// background-cool d5d7e1 light
// background-damp 688679 dark
// background-ghost-crash 0827f5 dark
// background-greige bfbb98 light
// background-greyteal 5d8585 dark
// background-middlegrey 7d7d7d dark
// background-mold 666f5c dark
// background-sfx 00e000 light
// background-sweet ccbbcc light
// background-violet a7a0f3 light
// background-warm e1d7d5 light

export const isBgDark = (color: string) => {
  switch (color) {
    case "008080":
    case "688679":
    case "2f3635":
    case "0827f5":
    case "5d8585":
    case "7d7d7d":
    case "2b2a30":
    case "666f5c":
      return true
    default:
      return false
  }
}

export const is10thGnar = (gnarId) => (gnarId - V2_START_ID) % 10 === 0

export const shortAddress = (address: string) =>
  [address.substring(0, 6), address.substring(38, 4)].join("…")
