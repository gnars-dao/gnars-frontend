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
import { MULTISIG_ADDRESS, TREASURY_ADDRESS } from "constants/gnarsDao"
import { useMemo } from "react"
import { useGnarsV2TokenBalanceOf } from "utils/sdk"
import { formatEther } from "viem"
import { useBalance } from "wagmi"
import { ShredIcon } from "./Icons"
import { useState, useEffect } from "react";
import axios from "axios";
import { set } from "lodash"

export const TreasuryBalance = () => {
  const { data: treasuryBalance } = useBalance({
    address: TREASURY_ADDRESS,
  })

  const [usdcBalance, setUsdcBalance] = useState(0);


  useEffect(() => {
    const fetchUSDCBalance = async () => {
      try {
        const address = "0xa1B74d2280966A89AC7e0F3A8bc5f0867C776d98";
        const apiKey = process.env.ETHERSCAN_API_KEY;

        const response = await axios.get(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&address=${address}&tag=latest&apikey=${apiKey}`);

        const rawUSDCBalance = response.data.result;
        const formattedUSDCBalance = rawUSDCBalance / 1e6;

        setUsdcBalance(formattedUSDCBalance);

        console.log(`USDC Balance for ${address}: ${formattedUSDCBalance} USDC`);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUSDCBalance();
  }, []);

  const abbreviatedBalance = (balance: any) => {
    const THOUSAND = 1000;
    if (Math.abs(balance) >= THOUSAND) {
      const suffixes = ["", "k", "M", "B", "T"];
      const order = Math.floor(Math.log10(Math.abs(balance)) / 3);
      const shortValue = parseFloat((balance / Math.pow(THOUSAND, order)).toFixed(2));
      return shortValue + suffixes[order];
    }
    return balance.toString();
  };

  const { data: multisigBalance } = useBalance({
    address: MULTISIG_ADDRESS,
  })

  const { data: gnarsBalance } = useGnarsV2TokenBalanceOf({
    args: [MULTISIG_ADDRESS],
  })

  const formattedBalances = useMemo(() => {
    if (!treasuryBalance || !multisigBalance) {
      return null
    }

    return {
      treasury: formatBalance(treasuryBalance.value),
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
          <SimpleGrid columns={2} columnGap={3} templateColumns={"fit-content(60%) fit-content(40%)"}>
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
            {formattedBalances ? <Text>{`Ξ ${formattedBalances.treasury}`} + ${abbreviatedBalance(usdcBalance)}</Text> : <Spinner size={"sm"} />}
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
