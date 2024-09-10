import gnarDataV2 from "../data/image-data-V2.json";
import { GnarPart, Gnartwork, PartKind } from "../utils/old-index";
import { parseInt, sample } from "lodash";
import { create } from "zustand";

export type PlaygroundGnarData = {
  gnartwork: Gnartwork;
  id: number;
};

export interface PlaygroundState {
  counter: number;
  generatedGnars: PlaygroundGnarData[];
  parts: { [K in PartKind]: GnarPart[] };
  selectedParts: { [K in PartKind]: GnarPart[] };
  select: (partKind: PartKind, part: GnarPart) => void;
  clearSelection: (partKind: PartKind) => void;
  generate: () => void;
  clear: () => void;
}

export const usePlaygroundState = create<PlaygroundState>((set) => ({
  counter: 0,
  generatedGnars: [],
  parts: gnarDataV2.images as { [K in PartKind]: GnarPart[] },
  selectedParts: {
    accessories: [],
    backgrounds: [],
    bodies: [],
    glasses: [],
    heads: []
  },
  select: (partKind, part) =>
    set(({ selectedParts }) => ({
      selectedParts: {
        ...selectedParts,
        [partKind]: [part]
      }
    })),
  clearSelection: (partKind) =>
    set(({ selectedParts }) => ({
      selectedParts: {
        ...selectedParts,
        [partKind]: []
      }
    })),
  generate: () => {
    set(({ selectedParts, parts, counter, generatedGnars }) => {
      const background = sample(
        selectedParts["backgrounds"].length > 0 ? selectedParts["backgrounds"] : parts["backgrounds"]
      )!;
      const backgroundColor = gnarDataV2.bgcolors[parseInt(background.data.slice(-2), 16) - 1];

      const newGnar = {
        id: counter + 1,
        gnartwork: {
          parts: {
            background,
            body: sample(selectedParts["bodies"].length > 0 ? selectedParts["bodies"] : parts["bodies"]),
            accessory: sample(
              selectedParts["accessories"].length > 0 ? selectedParts["accessories"] : parts["accessories"]
            ),
            head: sample(selectedParts["heads"].length > 0 ? selectedParts["heads"] : parts["heads"]),
            noggles: sample(selectedParts["glasses"].length > 0 ? selectedParts["glasses"] : parts["glasses"])
          },
          palette: gnarDataV2.palette,
          background: backgroundColor
        }
      } as PlaygroundGnarData;
      return {
        generatedGnars: [newGnar, ...generatedGnars],
        counter: counter + 1
      };
    });
  },
  clear: () => set({ generatedGnars: [] })
}));
