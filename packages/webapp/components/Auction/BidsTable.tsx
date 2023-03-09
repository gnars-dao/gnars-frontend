import { GnarInfo } from "../../hooks/useGnarInfo"
import {
  Link,
  SimpleGrid,
  SimpleGridProps,
  Table,
  TableCaption,
  TableContainer,
  TableContainerProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  VStack,
} from "@chakra-ui/react"
import { FC } from "react"
import { AvatarWallet } from "./AvatarWallet"
import { formatEther } from "ethers/lib/utils"
import { HiExternalLink } from "react-icons/all"

export type BidsProps = {
  bids: GnarInfo["gnar"]["auction"]["bids"]
} & TableContainerProps
export const BidsTable: FC<BidsProps> = ({ bids, ...props }) => {
  const { colorMode } = useColorMode()
  const borderColor = colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300"
  const amountBids = bids.length

  return (
    <TableContainer
      // flexShrink={1}
      overflowY={"scroll"}
      borderRadius={"md"}
      borderColor={borderColor}
      borderWidth={1}
      w={"full"}
      {...props}
    >
      <Table size={"sm"} variant="simple">
        <Tbody>
          {bids.map((bid, i) => (
            <Tr key={`bid-${i}`}>
              <Td
                borderColor={borderColor}
                borderBottomWidth={i === amountBids - 1 ? 0 : 1}
              >
                <AvatarWallet
                  withLink
                  variant={"delimited"}
                  address={bid.bidder}
                  justifySelf={"start"}
                />
              </Td>
              <Td
                borderColor={borderColor}
                borderBottomWidth={i === amountBids - 1 ? 0 : 1}
                isNumeric
              >
                <Link
                  isExternal
                  justifySelf={"end"}
                  alignSelf={"center"}
                  href={`https://etherscan.io/tx/${bid.id}`}
                >
                  <Text>
                    {formatEther(bid.amount)} ETH{" "}
                    <HiExternalLink
                      style={{
                        display: "inline",
                        verticalAlign: "text-bottom",
                      }}
                    />
                  </Text>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
