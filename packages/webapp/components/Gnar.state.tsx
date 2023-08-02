import { create } from "zustand"

export type GnarState = {
  hdOn: boolean
  toggleHd: () => void
}

export const useGnarState = create<GnarState>()((set) => ({
  hdOn: false,
  toggleHd: () => set(({ hdOn }) => ({ hdOn: !hdOn })),
}))
