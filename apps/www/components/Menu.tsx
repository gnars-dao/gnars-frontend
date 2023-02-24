import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { useAccount, useBalance, useEnsAvatar } from "wagmi"
import { ConnectKitButton } from "connectkit"

import { nFormatter } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"
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
  Link as ExternalLink,
  IconButton,
} from "@chakra-ui/react"
import { FaBars, FaBookOpen, FaPlay, FaUsers } from "react-icons/fa"

export type MenuProps = CenterProps

export default function Menu(props: MenuProps) {
  const { colorMode } = useColorMode()
  const [showMenu, setShowMenu] = useState(false)
  const { address, isConnected } = useAccount()
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
              <ExternalLink
                href={`https://etherscan.io/address/${TREASURY_ADDRESS}`}
                isExternal
                rel="noopener noreferrer"
              >
                <Button variant={"outline"}>
                  <HStack>
                    <div>Treasury</div>
                    <div className="whitespace-nowrap">
                      Ξ {nFormatter(Number(balanceData?.formatted), 3)}
                    </div>
                  </HStack>
                </Button>
              </ExternalLink>
            )}
          </div>
          <IconButton
            variant={"outline"}
            icon={
              <FaBars style={{ marginLeft: "auto", marginRight: "auto" }} />
            }
            fontSize="20px"
            aria-label="Show menu"
            display={{ base: undefined, lg: "none" }}
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
        <div
          className={clsx(
            showMenu ? "flex" : "hidden",
            "lg:flex flex-col lg:flex-row lg:justify-end w-full text-lg gap-3"
          )}
        >
          <Stack spacing={3} direction={{ base: "column", lg: "row" }}>
            <ExternalLink
              href="https://snapshot.org/#/gnars.eth"
              isExternal
              rel="noopener noreferrer"
            >
              <Button
                w={"full"}
                variant={"outline"}
                verticalAlign={"center"}
                leftIcon={<FaUsers size={"1em"} />}
              >
                DAO
              </Button>
            </ExternalLink>
            <ExternalLink
              href="https://gnars.com"
              isExternal
              rel="noopener noreferrer"
            >
              <Button w={"full"} variant={"outline"} leftIcon={<FaBookOpen />}>
                About
              </Button>
            </ExternalLink>
            <Link href="/playground">
              <Button variant={"outline"} leftIcon={<FaPlay />}>
                Playground
              </Button>
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
                      {isConnected && isSuccessEnsAvatar && (
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
          </Stack>
        </div>
      </Stack>
    </Center>
  )
}
