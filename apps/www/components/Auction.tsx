import clsx from "clsx"

import useGetGnarSeed from "hooks/useGetGnarSeed"
import { getGnarDataV2, isBgDark } from "utils"

import AuctionDetails from "./AuctionDetails"
import Gnar from "./Gnar"
import Menu from "./Menu"

interface AuctionProps {
  gnarId: number
}

export default function Auction(props: AuctionProps) {
  const { gnarId } = props

  const { data: gnarSeedData } = useGetGnarSeed({ gnarId: gnarId })

  const seed = getGnarDataV2(gnarSeedData)

  const hasDarkBg = isBgDark(seed?.background)

  return (
    <div
      className={clsx(
        "flex flex-col w-full items-center text-primaryText",
        hasDarkBg && "dark"
      )}
      style={{
        backgroundColor: seed?.background ? `#${seed.background}` : "#d5d7e1",
      }}
    >
      <Menu hasDarkBg={hasDarkBg} />

      <div className="flex flex-col lg:flex-row w-full ">
        <div className="flex flex-1 justify-center items-end">
          <div className="flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-570px">
              <Gnar seed={seed} />
            </div>
          </div>
        </div>
        <div className="flex flex-1 bg-white lg:bg-inherit justify-center lg:justify-start">
          <AuctionDetails gnarId={gnarId} />
        </div>
      </div>
    </div>
  )
}
