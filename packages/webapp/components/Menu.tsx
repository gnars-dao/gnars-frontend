import Link from "next/link"
import { useState } from "react"
import { useBalance } from "wagmi"
import { ChainIcon, ConnectKitButton, useModal } from "connectkit"

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
  VStack,
} from "@chakra-ui/react"
import { FaBars, FaBookOpen, FaPlay, FaUsers } from "react-icons/fa"
import { AvatarWallet } from "./AvatarWallet"
import { OGNogglesIcon, ShredIcon } from "./Icons"
import { WalletButton } from "./WalletButton"

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
        alignItems={"start"}
        w={"full"}
        spacing={6}
        p={4}
        maxW={"1116px"}
      >
        <HStack
          justifyContent={"space-between"}
          alignItems={"end"}
          w={{ base: "full", lg: "fit-content" }}
        >
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
            hideFrom={"lg"}
            justifySelf={"end"}
            onClick={() => setShowMenu(!showMenu)}
          />
        </HStack>
        <Stack
          spacing={{ base: 1, lg: 3 }}
          direction={{ base: "column", lg: "row" }}
          display={{ base: showMenu ? "flex" : "none", lg: "flex" }}
          h={"fit-content"}
          w={{ base: "full", lg: "fit-content" }}
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

          {/* <Link
              href="/dao/proposals"
            >
              <Button
                w={"full"}
                variant={"outline"}
                verticalAlign={"center"}
                leftIcon={<FaUsers size={"1em"} />}
              >
                DAO
              </Button>
            </Link> */}
          {/* @TODO change for link to DAO section */}
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
          <WalletButton hideFrom={"lg"} w="full" />
        </Stack>
        <WalletButton hideBelow={"md"} />
      </Stack>
    </Center>
  )
}
