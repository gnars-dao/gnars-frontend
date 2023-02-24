import { Box, Link } from "@chakra-ui/react"

export default function Footer() {
  return (
    <Box
      color={"chakra-body-text"}
      className="flex gap-3 font-primary text-xs sm:text-lg justify-center py-8"
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
    </Box>
  )
}
