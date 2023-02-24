import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { useAccount, useBalance, useEnsAvatar } from "wagmi"
import Svg from "react-inlinesvg"
import { ConnectKitButton } from "connectkit"

import { nFormatter } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"
import { IconButton } from "./IconButton"
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Center,
  CenterProps,
  HStack,
  Spinner,
  Stack,
  StackProps,
  Text,
  useColorMode,
} from "@chakra-ui/react"

export type MenuProps = CenterProps

export default function Menu(props: MenuProps) {
  const { colorMode } = useColorMode()
  const [showMenu, setShowMenu] = useState(false)
  const { address } = useAccount()
  const {
    isLoading: isLoadingEnsAvatar,
    isSuccess: isSuccessEnsAvatar,
    data: ensAvatar,
  } = useEnsAvatar({
    addressOrName: address,
  })
  const { data: balanceData, isSuccess: isSuccessBalance } = useBalance({
    addressOrName: TREASURY_ADDRESS,
  })

  return (
    <Center w={"full"} {...props}>
      <Stack
        direction={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        w={"full"}
        spacing={6}
        pt={{ base: 4, lg: 12 }}
        px={4}
        maxW={"1116px"}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-6">
            <Link href="/">
              <a className="flex">
                <img
                  className="hidden sm:flex max-h-40px min-w-190px"
                  src={
                    colorMode === "dark"
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
            <a
              href="https://gnars.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton design="transparent" icon="book" text="About" />
            </a>
            <Link href="/playground">
              <a>
                <IconButton
                  design="transparent"
                  icon="play"
                  text="Playground"
                />
              </a>
            </Link>

            <ConnectKitButton.Custom>
              {({
                isConnected,
                truncatedAddress,
                ensName,
                show,
                isConnecting,
              }) => {
                return (
                  <Button
                    isLoading={isConnecting}
                    loadingText={"Connecting Wallet"}
                    onClick={show}
                  >
                    <HStack>
                      {isLoadingEnsAvatar && <Spinner boxSize={6} p={2} />}
                      {isSuccessEnsAvatar && (
                        <Avatar
                          src={ensAvatar}
                          ignoreFallback
                          loading={"eager"}
                          boxSize={8}
                        />
                      )}
                      <Text>
                        {isConnected
                          ? ensName ?? truncatedAddress
                          : "Connect Wallet"}
                      </Text>
                    </HStack>
                  </Button>
                )
              }}
            </ConnectKitButton.Custom>
          </div>
        </div>
      </Stack>
    </Center>
  )
}
