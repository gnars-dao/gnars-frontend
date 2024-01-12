import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Link } from "@chakra-ui/next-js"
import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react"
import { MULTISIG_ADDRESS, TREASURY_ADDRESS, USDC_TOKEN_ADDRESS } from "constants/gnarsDao"
import { useMemo } from "react"
import { useGnarsV2TokenBalanceOf } from "utils/sdk"
import { abbreviatedBalance } from "utils/numberAbreviation"
import { formatEther } from "viem"
import { useBalance } from "wagmi"
import { ShredIcon } from "./Icons"

export const TreasuryBalance = () => {
  const { data: treasuryBalance } = useBalance({
    address: TREASURY_ADDRESS,
  })

  const { data: usdcBalance } = useBalance({
    address: TREASURY_ADDRESS,
    token: USDC_TOKEN_ADDRESS,
  })

  const { data: multisigBalance } = useBalance({
    address: MULTISIG_ADDRESS,
  })

  const { data: gnarsBalance } = useGnarsV2TokenBalanceOf({
    args: [MULTISIG_ADDRESS],
  })

  const formattedBalances = useMemo(() => {
    if (!treasuryBalance || !multisigBalance || !usdcBalance) {
      return null
    }


    return {
      treasury: formatBalance(treasuryBalance.value),
      usdcBal: formatBalance(usdcBalance?.value),
      multisig: formatBalance(multisigBalance.value),
      total: formatBalance(treasuryBalance.value + multisigBalance.value),
    }

  }, [treasuryBalance, multisigBalance])
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"} minW={40}>
          <VStack spacing={0}>
            <Text fontSize={"2xs"} opacity={0.4}>
              TREASURY
            </Text>
            {formattedBalances ? (
              <HStack whiteSpace={"nowrap"} divider={<Text px={2}>+</Text>}>
                <Text whiteSpace={"nowrap"}>{`Ξ ${formattedBalances.total}`}</Text>
                {typeof gnarsBalance === "bigint" && (
                  <Text>
                    <ShredIcon style={{ verticalAlign: "sub" }} />
                    {gnarsBalance.toString()}
                  </Text>
                )}
              </HStack>
            ) : (
              <Spinner size={"sm"} />
            )}
          </VStack>
        </Button>
      </PopoverTrigger>
      <PopoverContent w={"fit-content"}>
        <PopoverArrow />
        <PopoverBody>
          <SimpleGrid columns={2} columnGap={4} templateColumns={"fit-content(60%) fit-content(40%)"}>
            {formattedBalances ? (
              <HStack justifyContent={"start"} whiteSpace={"nowrap"} divider={<Text px={2}>+</Text>}>
                <Text whiteSpace={"nowrap"}>{`Ξ ${formattedBalances.multisig}`}</Text>
                {typeof gnarsBalance === "bigint" && (
                  <Text>
                    <ShredIcon style={{ verticalAlign: "sub" }} />
                    {gnarsBalance.toString()}
                  </Text>
                )}
              </HStack>
            ) : (
              <Spinner size={"sm"} />
            )}
            <Link
              href={`https://app.safe.global/home?safe=eth:${MULTISIG_ADDRESS}`}
              whiteSpace={"nowrap"}
              w={"fit-content"}
            >
              on Multisig <ExternalLinkIcon verticalAlign={"text-bottom"} />
            </Link>
            {formattedBalances ? <Text>{`Ξ ${formattedBalances.treasury} + ${abbreviatedBalance(usdcBalance?.formatted)} USDC`}</Text> : <Spinner size={"sm"} />}
            <Link href={`https://etherscan.io/address/${TREASURY_ADDRESS}`} whiteSpace={"nowrap"} w={"fit-content"}>
              on Treasury <ExternalLinkIcon verticalAlign={"text-bottom"} />
            </Link>
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const formatBalance = (balance: bigint) => formatEther(balance - (balance % 10000000000000000n))
