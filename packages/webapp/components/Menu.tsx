import { useState } from "react";
import { GnarsLogo } from "./GnarsLogo";
import { ShredIcon } from "./Icons";
import { TreasuryBalance } from "./TreasuryBalance";
import { WalletButton } from "./WalletButton";
import { Button, Center, CenterProps, Link as ExternalLink, HStack, IconButton, Stack, ButtonGroup } from "@chakra-ui/react";
import Link from "next/link";
import { FaBars, FaBookOpen, FaPlay, FaUsers, FaDiscord } from "react-icons/fa";

export type MenuProps = CenterProps;

export default function Menu(props: MenuProps) {
  const [showMenu, setShowMenu] = useState(false);

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
        <HStack justifyContent={"space-between"} alignItems={"end"} w={{ base: "full", lg: "fit-content" }}>
          <HStack flexShrink={0} spacing={6}>
            <Link href="/">
              <GnarsLogo filter={"drop-shadow(0 0 1px #0005)"} />
            </Link>
            <TreasuryBalance />
          </HStack>
          <IconButton
            variant={"outline"}
            icon={<FaBars style={{ marginLeft: "auto", marginRight: "auto" }} />}
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
          <Link href="/dao">
            <Button w={"full"} variant={"outline"} verticalAlign={"center"} leftIcon={<FaUsers size={"1em"} />}>
              DAO
            </Button>
          </Link>

          <ExternalLink href="https://gnars.com" isExternal rel="noopener noreferrer">
            <Button w={"full"} variant={"outline"} leftIcon={<FaBookOpen />}>
              About
            </Button>
          </ExternalLink>
          <Link href="/playground">
            <Button w={"full"} variant={"outline"} leftIcon={<FaPlay />}>
              {showMenu ? "Playground" : "Play"}
            </Button>
          </Link>
          <ExternalLink href="https://discord.gg/gnars" isExternal rel="noopener noreferrer" aria-label="Discord">
            <Button w={"full"} variant={"outline"} leftIcon={<FaDiscord fontSize="1.25rem" />}>
              Discord
            </Button>
          </ExternalLink>
          <WalletButton hideFrom={"lg"} w="full" />

        </Stack>

        <WalletButton hideBelow={"lg"} />
      </Stack>
    </Center>
  );
}
