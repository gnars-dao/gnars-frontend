import { normalize } from "viem/ens"

export const isValidName = (name: string) => {
  try {
    return normalize(name).split(".").length >= 2
  } catch {
    return false
  }
}
