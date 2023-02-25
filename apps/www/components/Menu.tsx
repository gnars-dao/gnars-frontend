import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { useBalance } from "wagmi"
import { ConnectKitButton } from "connectkit"

import { nFormatter } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"
import {
  Button,
  Center,
  CenterProps,
  HStack,
  IconButton,
  Image,
  Link as ExternalLink,
  Stack,
  Text,
} from "@chakra-ui/react"
import { FaBars, FaBookOpen, FaPlay, FaUsers } from "react-icons/fa"
import { AvatarWallet } from "./AvatarWallet"

export type MenuProps = CenterProps

export default function Menu(props: MenuProps) {
  const [showMenu, setShowMenu] = useState(false)
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
        p={4}
        maxW={"1116px"}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-6">
            <Link href="/">
              <Image
                filter={"drop-shadow(0 0 1px #0005)"}
                className="max-h-40px"
                src="/images/logo.png"
              />
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
              {({ isConnected, address, show, isConnecting }) => {
                return (
                  <Button
                    isLoading={isConnecting}
                    loadingText={"Connecting Wallet"}
                    onClick={show}
                  >
                    {isConnected ? (
                      <AvatarWallet address={address} />
                    ) : (
                      <Text>Connect Wallet</Text>
                    )}
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
