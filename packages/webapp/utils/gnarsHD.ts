import { GNARS_HD_ADDRESS, GNARS_HD_IPFS_FOLDER, ZORA_IMAGE_STACKER_URI } from "constants/gnarsHD"
import { GnarV2 } from "hooks/useGnarData"

export const getGnarsHdHiImageUrl = ({ gnarId, seed: { accessory, background, body, glasses, head } }: GnarV2) =>
  `${ZORA_IMAGE_STACKER_URI}?contractAddress=${GNARS_HD_ADDRESS}&tokenId=${gnarId}${getPartMapping({
    accessory,
    background,
    body,
    glasses,
    head,
  })
    .map(getPartQuery)
    .join("")}`

export const getGnarsHdLoImageUrl = (seed: GnarV2["seed"]) =>
  `/api/gnarHd?${Object.entries(seed)
    .map(([part, seed]) => `${part}=${seed}`)
    .join("&")}`

const getPartMapping = ({
  accessory,
  background,
  body,
  glasses,
  head,
}: {
  accessory: number
  background: number
  body: number
  glasses: number
  head: number
}): [string, number][] => [
  ["BACKGROUND", background],
  ["BODY", body],
  ["ACESSORY", accessory],
  ["HEADS", head],
  ["NOGGLES", glasses],
]

const getPartQuery = ([partFolder, seed]: [string, number]) =>
  `&images=${encodeURI(`${GNARS_HD_IPFS_FOLDER}/${partFolder}/${seed}.PNG`)}`
