import { createIcon, chakra } from "@chakra-ui/react";

export const ShredIcon = createIcon({
  displayName: "ShredIcon",
  viewBox: "0 0 20 20",
  defaultProps: {
    width: "20px",
    height: "20px"
  },
  d: "M8 7V4H4v12h12V8H8v4h4v3h-1v-2H7V7h1Zm8 0h-4V4h4v3Z"
});

export const OGNogglesIcon = createIcon({
  displayName: "OGNogglesIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    width: "24px",
    height: "24px"
  },
  d: "M15,15L19,15L19,14L20,14L20,10L19,10L19,9L15,9L15,10L14,10L14,12L13,12L13,10L12,10L12,9L8,9L8,10L7,10L7,11L4,11L4,14L5,14L5,12L7,12L7,14L8,14L8,10L10,10L10,14L8,14L8,15L12,15L12,14L15,14L15,10L17,10L17,14L15,14L15,15Z"
});

export const EtherscanIcon = createIcon({
  displayName: "EtherscanIcon",
  viewBox: "0 0 293.8 293.7",
  d: "M61 140a12 12 0 0 1 13-13h20a12 12 0 0 1 13 13v78l8-2a10 10 0 0 0 8-10v-97a12 12 0 0 1 13-13h21a12 12 0 0 1 12 13v90l10-4a10 10 0 0 0 7-10V78a12 12 0 0 1 12-13h21a12 12 0 0 1 12 13v88c18-13 37-29 51-47a21 21 0 0 0 3-20A147 147 0 0 0 149 0C67-1 0 65 0 147a146 146 0 0 0 20 73 19 19 0 0 0 17 9 509 509 0 0 0 15-1 10 10 0 0 0 9-10v-78m0 126a147 147 0 0 0 233-119l-1-10c-53 80-152 117-232 129"
});

export const HeadIcon = createIcon({
  displayName: "HeadIcon",
  defaultProps: { boxSize: "24px" },
  viewBox: "0 0 24 24",
  d: "M20 19V4H4v7h2V9h6v2h1V9h6v6h-6v-3h-1v3H6v-3H4v7h16Zm-2-5h-2v-4h2v4Zm-7 0H9v-4h2v4Z"
});

export const NogglesIcon = createIcon({
  displayName: "NogglesIcon",
  defaultProps: { boxSize: "24px" },
  viewBox: "0 0 24 24",
  path: (
    <chakra.path
      fill={"currentColor"}
      d={"M13 11V9H7v2H4v3h1v-2h2v3h6v-3h1v3h6V9h-6v2h-1Zm2-1v4h2v-4h-2Zm-7 0v4h2v-4H8Z"}
      fillRule={"evenodd"}
    />
  )
});

export const AccessoryIcon = createIcon({
  displayName: "AccessoryIcon",
  defaultProps: { boxSize: "24px" },
  viewBox: "0 0 24 24",
  d: "M6 17H5v1h1v-1Zm4 0H8v1h2v-1Zm4 0h-2v1h2v-1Zm4 0h-2v1h2v-1ZM7 17v-2H6v2h1Zm7-2h2v2h-2v-2Zm-4 0h2v2h-2v-2Zm9 2v-2h-1v2h1Zm-3-4h2v2h-2v-2Zm-4 0h2v2h-2v-2Zm-4 0h2v2H8v-2Zm-2 2v-2H5v2h1Zm1-2v-2H6v2h1Zm3-2h2v2h-2v-2Zm4 0h2v2h-2v-2Zm5 2v-2h-1v2h1Zm-1-4v2h-2V9h2ZM6 11V9H5v2h1Zm8-2v2h-2V9h2Zm-4 0v2H8V9h2Zm6-2v2h-2V7h2Zm-4 0v2h-2V7h2ZM8 7v2H6V7h2Zm11 2V7h-1v2h1Z"
});

export const BodyIcon = createIcon({
  displayName: "BodyIcon",
  defaultProps: { boxSize: "24px" },
  viewBox: "0 0 24 24",
  d: "M8 18v-7H7v7H5V7h14v11H8Z"
});
