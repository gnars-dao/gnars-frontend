import { Link } from "@chakra-ui/next-js";
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
  VStack
} from "@chakra-ui/react";
import {
  BASE_MULTISIG_ADDRESS,
  BASE_SENDIT_TOKEN_ADDRESS,
  BASE_TREASURY_ADDRESS,
  BASE_USDC_TOKEN_ADDRESS,
  BASE_V2_GNAR_ADDRESS
} from "constants/gnarsDao";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useGnarsV2TokenBalanceOf } from "utils/sdk";
import { getTokensValues } from "utils/web3";
import { base } from "wagmi/chains";
import { formatSuffixedBalance } from "../utils/formatBalance";
import { ShredIcon } from "./Icons";

interface TokenData {
  value: bigint;
  formatted: string;
  label: string;
  url: string;
  icon: string | ReactNode;
}

export const TreasuryBalance = () => {
  const [treasuryBalance, setTreasuryBalance] = useState<TokenData[]>([]);
  const [multisigBalance, setMultisigBalance] = useState<TokenData[]>([]);

  useEffect(() => {
    const getTokens = async () => {
      const treasuryTokens = await getTokensValues(
        BASE_TREASURY_ADDRESS,
        [BASE_USDC_TOKEN_ADDRESS, BASE_SENDIT_TOKEN_ADDRESS],
        base.id
      );
      setTreasuryBalance((treasuryBalance) => [
        ...treasuryBalance,
        {
          value: treasuryTokens[0].value,
          formatted: formatSuffixedBalance(treasuryTokens[0].value, treasuryTokens[0].decimals),
          label: "Ether",
          icon: "Ξ",
          url: `https://basescan.org/address/${BASE_TREASURY_ADDRESS}`
        },
        {
          value: treasuryTokens[1].value,
          formatted: formatSuffixedBalance(treasuryTokens[1].value, treasuryTokens[1].decimals),
          label: "USDC",
          icon: "$",
          url: `https://basescan.org/token/${BASE_USDC_TOKEN_ADDRESS}?a=${BASE_TREASURY_ADDRESS}`
        },
        {
          value: treasuryTokens[2].value,
          formatted: formatSuffixedBalance(treasuryTokens[2].value, treasuryTokens[2].decimals),
          label: "Sendit",
          icon: "↗",
          url: `https://basescan.org/token/${BASE_SENDIT_TOKEN_ADDRESS}?a=${BASE_TREASURY_ADDRESS}`
        }
      ]);

      const multisigTokens = await getTokensValues(
        BASE_MULTISIG_ADDRESS,
        [BASE_USDC_TOKEN_ADDRESS, BASE_SENDIT_TOKEN_ADDRESS],
        base.id
      );
      setMultisigBalance((multisigBalance) => [
        ...multisigBalance,
        {
          value: multisigTokens[0].value,
          formatted: formatSuffixedBalance(multisigTokens[0].value, multisigTokens[0].decimals),
          label: "Ether",
          icon: "Ξ",
          url: `https://basescan.org/address/${BASE_MULTISIG_ADDRESS}`
        },
        {
          value: multisigTokens[1].value,
          formatted: formatSuffixedBalance(multisigTokens[1].value, multisigTokens[1].decimals),
          label: "USDC",
          icon: "$",
          url: `https://basescan.org/token/${BASE_USDC_TOKEN_ADDRESS}?a=${BASE_MULTISIG_ADDRESS}`
        },
        {
          value: multisigTokens[2].value,
          formatted: formatSuffixedBalance(multisigTokens[2].value, multisigTokens[2].decimals),
          label: "Sendit",
          icon: "↗",
          url: `https://basescan.org/token/${BASE_SENDIT_TOKEN_ADDRESS}?a=${BASE_MULTISIG_ADDRESS}`
        }
      ]);
    };
    setMultisigBalance([]);
    setTreasuryBalance([]);
    getTokens();
  }, []);

  const { data: multisigGnarsBalance } = useGnarsV2TokenBalanceOf({
    args: [BASE_MULTISIG_ADDRESS],
    chainId: base.id
  });
  useEffect(() => {
    if (multisigGnarsBalance)
      setMultisigBalance((multisigBalance) => [
        ...multisigBalance,
        {
          icon: <ShredIcon style={{ verticalAlign: "sub" }} />,
          formatted: multisigGnarsBalance.toString(),
          value: multisigGnarsBalance,
          label: "Gnars",
          url: `https://basescan.org/token/${BASE_V2_GNAR_ADDRESS}?a=${BASE_MULTISIG_ADDRESS}`
        }
      ]);
  }, [multisigGnarsBalance]);

  const { data: treasuryGnarsBalance } = useGnarsV2TokenBalanceOf({
    args: [BASE_TREASURY_ADDRESS],
    chainId: base.id
  });
  useEffect(() => {
    if (treasuryGnarsBalance)
      setTreasuryBalance((treasuryBalance) => [
        ...treasuryBalance,
        {
          icon: <ShredIcon style={{ verticalAlign: "sub" }} />,
          formatted: treasuryGnarsBalance.toString(),
          value: treasuryGnarsBalance,
          label: "Gnars",
          url: `https://basescan.org/token/${BASE_V2_GNAR_ADDRESS}?a=${BASE_TREASURY_ADDRESS}`
        }
      ]);
  }, [treasuryGnarsBalance]);

  const totalValues = useMemo(() => {
    let ethTotal = 0n;
    let gnarsTotal = 0n;

    const ethTreasury = treasuryBalance.find((token) => token.label === "Ether");
    if (ethTreasury) ethTotal += ethTreasury.value;

    const ethMultisig = multisigBalance.find((token) => token.label === "Ether");
    if (ethMultisig) ethTotal += ethMultisig.value;

    const gnarsTreasury = treasuryBalance.find((token) => token.label === "Gnars");
    if (gnarsTreasury) gnarsTotal += gnarsTreasury.value;

    const gnarsMultisig = multisigBalance.find((token) => token.label === "Gnars");
    if (gnarsMultisig) gnarsTotal += gnarsMultisig.value;

    return {
      eth: formatSuffixedBalance(ethTotal, 18),
      gnars: gnarsTotal.toString()
    };
  }, [treasuryBalance, multisigBalance]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"} minW={40}>
          <VStack spacing={0}>
            <Text fontSize={"2xs"} opacity={0.4}>
              TREASURY
            </Text>
            {multisigBalance.find((token) => token.label === "Gnars") ? (
              <HStack whiteSpace={"nowrap"} divider={<Text px={2}>+</Text>}>
                <Text whiteSpace={"nowrap"}>{`Ξ ${totalValues.eth}`}</Text>
                <Text>
                  <ShredIcon style={{ verticalAlign: "sub" }} />
                  {totalValues.gnars}
                </Text>
              </HStack>
            ) : (
              <Spinner size={"sm"} />
            )}
          </VStack>
        </Button>
      </PopoverTrigger>
      <PopoverContent w={"160px"}>
        <PopoverArrow />
        <PopoverBody>
          <VStack>
            <Text fontSize={"sm"}>Multisig</Text>
            {multisigBalance.length
              ? multisigBalance.map((token) =>
                  token.value > 1 ? (
                    <Tooltip key={token.label} label={token.label}>
                      <Button size={"sm"} w={"100%"} variant={"outline"}>
                        <Link href={token.url} target="_blank" whiteSpace={"nowrap"}>
                          {token.icon} {token.formatted}
                        </Link>
                      </Button>
                    </Tooltip>
                  ) : null
                )
              : null}
            <Divider />
            <Text fontSize={"sm"}>Treasury</Text>
            {treasuryBalance.length
              ? treasuryBalance.map((token) =>
                  token.value > 1 ? (
                    <Tooltip key={token.label} label={token.label}>
                      <Button size={"sm"} w={"100%"} variant={"outline"}>
                        <Link href={token.url} target="_blank" whiteSpace={"nowrap"}>
                          {token.icon} {token.formatted}
                        </Link>
                      </Button>
                    </Tooltip>
                  ) : null
                )
              : null}
            <Divider />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
