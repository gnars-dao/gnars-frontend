import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { useBalance } from "wagmi"
import Svg from "react-inlinesvg"
import { ConnectKitButton } from "connectkit"

import { nFormatter } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"

import Button from "./Button"
import { IconButton } from "./IconButton"

interface MenuProps {
  hasDarkBg: boolean
}

export default function Menu(props: MenuProps) {
  const { hasDarkBg } = props
  const [showMenu, setShowMenu] = useState(false)
  const { data: balanceData, isSuccess: isSuccessBalance } = useBalance({
    addressOrName: TREASURY_ADDRESS,
  })

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full gap-6 pt-4 lg:pt-12 px-4 lg:max-w-1116px">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-6">
          <Link href="/">
            <a className="flex">
              <img
                className="hidden sm:flex max-h-40px min-w-190px"
                src={
                  hasDarkBg
                    ? "/images/logo-white.png"
                    : "/images/logo-black.png"
                }
              />
              <img
                className="flex sm:hidden max-h-40px"
                src="/images/logo-hand.png"
              />
            </a>
          </Link>
          {isSuccessBalance && (
            <a
              href={`https://etherscan.io/address/${TREASURY_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-3 hover:bg-hoverLight font-medium w-full lg:w-auto border border-borderColor">
                <div className="text-secondaryText dark:text-white">
                  Treasury
                </div>
                <div className="whitespace-nowrap dark:text-white">
                  Ξ {nFormatter(Number(balanceData?.formatted))}
                </div>
              </Button>
            </a>
          )}
        </div>
        <Button
          className="flex lg:hidden"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Svg
            className="dark:text-white"
            src="/images/bars-solid.svg"
            width={24}
          />
        </Button>
      </div>
      <div
        className={clsx(
          showMenu ? "flex" : "hidden",
          "lg:flex flex-col lg:flex-row lg:justify-end w-full text-lg gap-3"
        )}
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <a
            href="https://snapshot.org/#/gnars.eth"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton design="transparent" icon="people" text="DAO" />
          </a>
          <a href="https://gnars.com" target="_blank" rel="noopener noreferrer">
            <IconButton design="transparent" icon="book" text="About" />
          </a>
          <Link href="/playground">
            <a>
              <IconButton design="transparent" icon="play" text="Playground" />
            </a>
          </Link>
          <ConnectKitButton />
        </div>
      </div>
    </div>
  )
}
