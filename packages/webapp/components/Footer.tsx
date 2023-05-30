import { HStack, Link } from "@chakra-ui/react"

export default function Footer() {
  return (
    <HStack
      spacing={3}
      py={8}
      justifyContent={"center"}
      fontSize={{ base: "xs", sm: "lg" }}
      color={"chakra-body-text"}
    >
      <Link
        href="https://discord.gg/XBeZuMxmst"
        target="_blank"
        rel="noopener noreferrer"
      >
        Discord
      </Link>
      <Link
        href="https://twitter.com/gnars_dao"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </Link>
      <Link
        href="https://etherscan.com/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C"
        target="_blank"
        rel="noopener noreferrer"
      >
        Etherscan
      </Link>
    </HStack>
  )
}
