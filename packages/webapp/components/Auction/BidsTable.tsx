import {
  Link,
  Table,
  TableContainer,
  TableContainerProps,
  Tbody,
  Td,
  Text,
  Tr,
  useColorMode,
} from "@chakra-ui/react"
import { formatEther } from "ethers/lib/utils"
import { FC } from "react"
import { HiExternalLink } from "react-icons/hi"
import { Bid } from "../../hooks/useGnarData"
import { AvatarWallet } from "../AvatarWallet"

export type BidsProps = {
  bids: Bid[]
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
                <AvatarWallet address={bid.bidder} justifySelf={"start"} />
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
