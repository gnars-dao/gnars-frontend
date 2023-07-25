import { Seed } from ".graphclient"
import { QueryClient } from "@tanstack/react-query"
import { random } from "lodash"
import { formatEther } from "viem"
import { V2_START_ID } from "../constants/contracts"
import gnarDataV2 from "../data/image-data-V2.json"
import ogGnarData from "../data/image-data.json"
import { GnarData } from "../hooks/useGnarData"

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
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
}

export const truncatedAmount = (amount: string, digits?: number) => {
  return Number(formatEther(BigInt(amount))).toFixed(digits ?? 3)
}

export type GnarPart = {
  filename: string
  data: string
  trait?: string
}

export type PartKind = "backgrounds" | "bodies" | "accessories" | "heads" | "glasses"

export const partKinds = ["backgrounds", "bodies", "accessories", "heads", "glasses"] as PartKind[]

export const generateGnarV2Seed = ({ background, glasses, body, head, accessory }: Partial<Seed> = {}): Omit<
  Seed,
  "id"
> => {
  const {
    images: {
      bodies: { length: amountBodies },
      accessories: { length: amountAccessories },
      heads: { length: amountHeads },
      glasses: { length: amountGlasses },
    },
    bgcolors: { length: amountBackgrounds },
  } = gnarDataV2

  return {
    background: background ?? random(amountBackgrounds - 1),
    body: body ?? random(amountBodies - 1),
    accessory: accessory ?? random(amountAccessories - 1),
    head: head ?? random(amountHeads - 1),
    glasses: glasses ?? random(amountGlasses - 1),
  }
}

export type Gnartwork = {
  palette: string[]
  parts: {
    background?: GnarPart
    body: GnarPart
    accessory: GnarPart
    head: GnarPart
    noggles: GnarPart
  }
  background: string
}

export const getGnarBgColor = (isOg: boolean, fallback: string, gnarInfo?: GnarData) => {
  if (!gnarInfo) {
    return fallback
  }

  const gnarData = isOg ? ogGnarData : gnarDataV2
  return `#${gnarData.bgcolors[gnarInfo.gnar.seed.background]}`
}

export const getGnartwork = (isOg: boolean, seed: Omit<Seed, "id">): Gnartwork => {
  const gnarData = isOg ? ogGnarData : gnarDataV2
  const { bodies, accessories, heads, glasses } = gnarData.images
  const palette = isOg ? ogGnarData.palette : gnarDataV2.palette
  return {
    palette,
    parts: {
      background: isOg ? undefined : gnarDataV2.images.backgrounds[seed.background],
      body: bodies[seed.body] as GnarPart,
      accessory: accessories[seed.accessory] as GnarPart,
      head: heads[seed.head] as GnarPart,
      noggles: glasses[seed.glasses] as GnarPart,
    },
    background: gnarData.bgcolors[seed.background],
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
    case "#008080":
    case "#688679":
    case "#2f3635":
    case "#0827f5":
    case "#5d8585":
    case "#7d7d7d":
    case "#2b2a30":
    case "#666f5c":
      return true
    default:
      return false
  }
}

export const is10thGnar = (gnarId: number) => (gnarId - V2_START_ID) % 10 === 0

export const shortAddress = (address: string) => [address.substring(0, 6), address.substring(38)].join("…")

export const ensOrShortAddress = (address: string, ens: string) => (ens ? ens : shortAddress(address))
