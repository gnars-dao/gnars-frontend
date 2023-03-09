import { GnarPart, Gnartwork, PartKind } from "../utils"
import { create } from "zustand"
import gnarDataV2 from "../data/image-data-V2.json"
import { parseInt, sample } from "lodash"

export type PlaygroundGnar = {
  gnartWork: Gnartwork
  id: number
}

export interface PlaygroundState {
  counter: number
  generatedGnars: PlaygroundGnar[]
  parts: { [K in PartKind]?: GnarPart[] }
  selectedParts: { [K in PartKind]?: GnarPart[] }
  select: (partKind: PartKind, part: GnarPart) => void
  clearSelection: (partKind: PartKind) => void
  generate: () => void
  clear: () => void
}

export const usePlaygroundState = create<PlaygroundState>((set) => ({
  counter: 0,
  generatedGnars: [],
  parts: gnarDataV2.images as { [K in PartKind]: GnarPart[] },
  selectedParts: {},
  select: (partKind, part) =>
    set(({ selectedParts }) => ({
      selectedParts: {
        ...selectedParts,
        [partKind]: [...(selectedParts[partKind] ?? []), part],
      },
    })),
  clearSelection: (partKind) =>
    set(({ selectedParts: { [partKind]: clearedPart, ...restOfParts } }) => ({
      selectedParts: restOfParts,
    })),
  generate: () => {
    set(({ selectedParts, parts, counter, generatedGnars }) => {
      const background = sample(
        selectedParts?.["backgrounds"]
          ? selectedParts["backgrounds"]
          : parts["backgrounds"]
      )
      const backgroundColor =
        gnarDataV2.bgcolors[parseInt(background.data.slice(-2), 16) - 1]

      const newGnar = {
        id: counter + 1,
        gnartWork: {
          parts: {
            background,
            body: sample(
              selectedParts?.["bodies"]
                ? selectedParts["bodies"]
                : parts["bodies"]
            ),
            accessory: sample(
              selectedParts?.["accessories"]
                ? selectedParts["accessories"]
                : parts["accessories"]
            ),
            head: sample(
              selectedParts?.["heads"] ? selectedParts["heads"] : parts["heads"]
            ),
            noggles: sample(
              selectedParts?.["glasses"]
                ? selectedParts["glasses"]
                : parts["glasses"]
            ),
          },
          palette: gnarDataV2.palette,
          background: backgroundColor,
        },
      } as PlaygroundGnar
      return {
        generatedGnars: [newGnar, ...generatedGnars],
        counter: counter + 1,
      }
    })
  },
  clear: () => set({ generatedGnars: [] }),
}))
