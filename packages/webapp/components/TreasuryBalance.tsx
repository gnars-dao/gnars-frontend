import { Link } from "@chakra-ui/next-js"
import {
  Button,
  Divider,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react"
import {
  BASE_MULTISIG_ADDRESS,
  BASE_SENDIT_TOKEN_ADDRESS,
  BASE_TREASURY_ADDRESS,
  BASE_USDC_TOKEN_ADDRESS,
} from "constants/gnarsDao"
import { useMemo } from "react"
import { formatUsdcBalance } from "utils/formatUsdcBalance"
import { useGnarsV2TokenBalanceOf } from "utils/sdk"
import { useBalance } from "wagmi"
import { formatEtherBalance } from "../utils/formatEtherBalance"
import { ShredIcon } from "./Icons"

export const TreasuryBalance = () => {
  const { data: treasuryBalance } = useBalance({
    address: BASE_TREASURY_ADDRESS,
  })

  const { data: usdcBalance } = useBalance({
    address: BASE_TREASURY_ADDRESS,
    token: BASE_USDC_TOKEN_ADDRESS,
  })

  const { data: senditBalance } = useBalance({
    address: BASE_TREASURY_ADDRESS,
    token: BASE_SENDIT_TOKEN_ADDRESS,
  })

  const { data: multisigBalance } = useBalance({
    address: BASE_MULTISIG_ADDRESS,
  })

  const { data: gnarsBalance } = useGnarsV2TokenBalanceOf({
    args: [BASE_MULTISIG_ADDRESS],
  })

  const formattedBalances = useMemo(() => {
    if (!treasuryBalance || !multisigBalance || !usdcBalance || !senditBalance) {
      return null
    }

    return {
      treasuryEth: formatEtherBalance(treasuryBalance.value),
      treasuryUsdc: formatUsdcBalance(usdcBalance?.value),
      treasurySendit: formatEtherBalance(senditBalance?.value),
      multisigEth: formatEtherBalance(multisigBalance.value),
      total: formatEtherBalance(treasuryBalance.value + multisigBalance.value),
    }
  }, [treasuryBalance, multisigBalance, usdcBalance, senditBalance])

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
          {formattedBalances && (
            <VStack>
              <Text fontSize={"sm"}>Multisig</Text>
              <Tooltip label="Ether">
                <Button size={"sm"} w={"100%"} variant={"outline"}>
                  <Link
                    href={`https://app.safe.global/home?safe=base:${BASE_MULTISIG_ADDRESS}`}
                    target="_blank"
                    whiteSpace={"nowrap"}
                  >{`Ξ ${formattedBalances.multisigEth}`}</Link>
                </Button>
              </Tooltip>
              {typeof gnarsBalance === "bigint" && (
                <Tooltip label="Gnars">
                  <Button size={"sm"} w={"100%"} variant={"outline"}>
                    <Link
                      href={`https://app.safe.global/home?safe=base:${BASE_MULTISIG_ADDRESS}`}
                      target="_blank"
                      whiteSpace={"nowrap"}
                    >
                      <ShredIcon style={{ verticalAlign: "sub" }} />
                      {gnarsBalance.toString()}
                    </Link>
                  </Button>
                </Tooltip>
              )}
              <Divider />
              <Text fontSize={"sm"}>Treasury</Text>
              <Tooltip label="Ether">
                <Button size={"sm"} w={"100%"} variant={"outline"}>
                  <Link
                    href={`https://basescan.org/address/${BASE_TREASURY_ADDRESS}`}
                    target="_blank"
                    whiteSpace={"nowrap"}
                  >{`Ξ ${formattedBalances.treasuryEth}`}</Link>
                </Button>
              </Tooltip>
              <Tooltip label="USDC">
                <Button size={"sm"} w={"100%"} variant={"outline"}>
                  <Link
                    href={`https://basescan.org/address/${BASE_TREASURY_ADDRESS}`}
                    target="_blank"
                    whiteSpace={"nowrap"}
                  >{`$ ${formattedBalances.treasuryUsdc}`}</Link>
                </Button>
              </Tooltip>
              <Tooltip label="Send it">
                <Button size={"sm"} w={"100%"} variant={"outline"}>
                  <Link
                    href={`https://basescan.org/address/${BASE_TREASURY_ADDRESS}`}
                    target="_blank"
                    whiteSpace={"nowrap"}
                  >{`↗ ${formattedBalances.treasurySendit}`}</Link>
                </Button>
              </Tooltip>
            </VStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
