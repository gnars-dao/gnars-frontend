import { Link } from "@chakra-ui/next-js"
import {
  ButtonGroup,
  Container,
  HStack,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"
import { GnarsLogo } from "./GnarsLogo"

const links = [
  {
    title: "Gnars DAO",
    links: [
      { label: "Auction", href: "/" },
      { label: "Claim OG Gnars", href: "/claim" },
      { label: "Gnars Playground", href: "/playground" },
      { label: "Proposals", href: "/dao" },
      { label: "Propose", href: "/dao/proposals/new" },
    ],
  },
  {
    title: "Contracts",
    links: [
      {
        label: "Gnars OG NFT",
        href: "https://etherscan.io/address/0x494715b2a3c75dadd24929835b658a1c19bd4552",
      },
      {
        label: "Gnars NFT",
        href: "https://etherscan.io/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C",
      },
      {
        label: "Gnars Auction House",
        href: "https://etherscan.io/address/0xC28e0d3c00296dD8c5C3F2E9707361920f92a209",
      },
      {
        label: "Gnars Treasury",
        href: "https://etherscan.io/address/0xa1b74d2280966a89ac7e0f3a8bc5f0867c776d98",
      },
      {
        label: "Gnars DAO",
        href: "https://etherscan.io/address/0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3",
      },
    ],
  },
  {
    title: "Gnars ecosystem",
    links: [
      { label: "Settle.wtf", href: "https://www.settle.wtf" },
      { label: "Gnars.com", href: "https://gnars.com/" },
      { label: "That's Gnarly", href: "https://thatsgnar.ly/" },
    ],
  },
]

export default function Footer() {
  return (
    <Container
      maxW={"container.lg"}
      as="footer"
      role="contentinfo"
      bg="bg.surface"
      color={"chakra-body-text"}
      w={"full"}
      px={{ base: 4, md: 8 }}
    >
      <Stack
        w={"full"}
        justify="space-between"
        align="start"
        direction={{ base: "column", lg: "row" }}
        py={{ base: "6", md: "10" }}
        spacing="16"
      >
        <SimpleGrid
          flexGrow={1}
          as={"nav"}
          // px={{ base: 10, sm: 0 }}
          columns={{ base: 2, sm: 3 }}
          justifyItems={"start"}
          gap="8"
          width={{ base: "full", lg: "auto" }}
        >
          {links.map((group, idx) => (
            <Stack key={idx} spacing="4" minW={{ lg: "40" }}>
              <Text fontSize="md" fontWeight="bold" color="fg.subtle">
                {group.title}
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                {group.links.map((link, idx) => (
                  <Link
                    key={idx}
                    variant="text"
                    colorScheme="gray"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
        <VStack
          w={{ base: "full", lg: "fit-content" }}
          spacing={{ base: "4", md: "5" }}
        >
          <HStack
            w={{ base: "full", lg: "fit-content" }}
            justify={{ base: "space-between", lg: "start" }}
            spacing="16"
            align="center"
          >
            <GnarsLogo />
            <ButtonGroup variant="tertiary" as={"nav"}>
              <IconButton
                as="a"
                rel="external noopener"
                href="https://discord.gg/XBeZuMxmst"
                aria-label="Discord"
                icon={<FaDiscord fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                rel="external noopener"
                href="https://github.com/gnarsdao"
                aria-label="GitHub"
                icon={<FaGithub fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                rel="external noopener"
                href="https://twitter.com/gnars_dao"
                aria-label="Twitter"
                icon={<FaTwitter fontSize="1.25rem" />}
              />
            </ButtonGroup>
          </HStack>
          <Text fontSize="sm" color="fg.subtle">
            CC0 {new Date().getFullYear()} Gnars DAO
          </Text>
        </VStack>
      </Stack>
    </Container>
  )
}
