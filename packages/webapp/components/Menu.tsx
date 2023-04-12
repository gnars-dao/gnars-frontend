import Link from "next/link"
import { useState } from "react"
import { useBalance } from "wagmi"
import { ConnectKitButton } from "connectkit"

import { nFormatter } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"
import {
  Box,
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
import { OGNogglesIcon, ShredIcon } from "./Icons"

export type MenuProps = CenterProps

export default function Menu(props: MenuProps) {
  const [showMenu, setShowMenu] = useState(false)
  const { data: balanceData, isSuccess: isSuccessBalance } = useBalance({
    address: TREASURY_ADDRESS,
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
        <HStack justifyContent={"space-between"}>
          <HStack flexShrink={0} spacing={6}>
            <Link href="/">
              <Image
                filter={"drop-shadow(0 0 1px #0005)"}
                h={"40px"}
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
          </HStack>
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
        </HStack>
        <Box display={{ base: showMenu ? "initial" : "none", lg: "initial" }}>
          <Stack
            spacing={{ base: 1, lg: 3 }}
            direction={{ base: "column", lg: "row" }}
          >
            <Link href="/claim">
              <Button w={"full"} variant={"outline"} leftIcon={<ShredIcon />}>
                Claim
              </Button>
            </Link>
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
              <Button w={"full"} variant={"outline"} leftIcon={<FaPlay />}>
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
                    {isConnected && address ? (
                      <AvatarWallet address={address} />
                    ) : (
                      <Text>Connect Wallet</Text>
                    )}
                  </Button>
                )
              }}
            </ConnectKitButton.Custom>
          </Stack>
        </Box>
      </Stack>
    </Center>
  )
}
