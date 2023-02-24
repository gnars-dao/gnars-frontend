import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { useBalance } from "wagmi"
import Svg from "react-inlinesvg"
import { ConnectKitButton } from "connectkit"

import { nFormatter } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"
import { IconButton } from "./IconButton"
import { Button, HStack } from "@chakra-ui/react"

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
                    ? "/images/logo-white.png" //@TODO switch for svg text responsive to colorMode
                    : "/images/logo-black.png"
                }
              />
              <img
                className="flex sm:hidden max-h-40px"
                src="/images/logo-hand.png" //@TODO switch for svg logo with short horns
              />
            </a>
          </Link>
          {isSuccessBalance && (
            <a
              href={`https://etherscan.io/address/${TREASURY_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <HStack>
                  <div>Treasury</div>
                  <div className="whitespace-nowrap">
                    Ξ {nFormatter(Number(balanceData?.formatted), 3)}
                  </div>
                </HStack>
              </Button>
            </a>
          )}
        </div>
        <Button
          variant={"solid"}
          display={{ base: undefined, lg: "none" }}
          onClick={() => setShowMenu(!showMenu)}
        >
          <Svg src="/images/bars-solid.svg" width={24} />
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
