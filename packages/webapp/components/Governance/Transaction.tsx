import { FC, useMemo } from "react";
import { StackProps, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { AbiFunction, AbiParameter } from "abitype";
import { AccountAddress } from "@components/AccountAddress";
import { AccountWithAvatar } from "@components/AccountWithAvatar";
import { ContractBreadcrumbs } from "@components/ContractBreadcrumbs";
import { ParamSpec, ParamsTable } from "@components/ParamsTable";
import { getEffectiveAbi, useEtherscanContractInfo } from "@hooks/useEtherscanContractInfo";
import { useNnsNameWithEnsFallback } from "@hooks/useNnsNameWithEnsFallback";
import { NounsTransactionData } from "@utils/governanceUtils";
import { decodeFunctionData, formatEther, getAbiItem, getFunctionSelector, parseAbiItem } from "viem";
import { useEnsAvatar } from "wagmi";

export interface TransactionProps extends StackProps {
  data: NounsTransactionData;
}

export const Transaction: FC<TransactionProps> = ({ data: { calldata, signature, target, value }, ...props }) => {
  const { data: contractInfo, isLoading: isLoadingContractInfo } = useEtherscanContractInfo(target);
  const { data: nnsOrEnsName, isLoading: isLoadingNnsOrEnsName } = useNnsNameWithEnsFallback(target);
  const { data: ensAvatar, isLoading: isLoadingEnsAvatar } = useEnsAvatar({
    name: nnsOrEnsName
  });

  const truncateAddress = useBreakpointValue({ base: true, md: false });

  const effectiveAbi = contractInfo ? getEffectiveAbi(contractInfo) : undefined;

  const partialFunc = useMemo(
    () => (signature ? (parseAbiItem(`function ${signature}`) as AbiFunction) : undefined),
    [signature]
  );

  const decodedCall = useMemo(
    () =>
      partialFunc
        ? decodeFunctionData({
            abi: [partialFunc],
            data: (getFunctionSelector(signature) + calldata.substring(2)) as `0x${string}`
          })
        : undefined,
    [partialFunc, calldata, signature]
  );

  if (!partialFunc || !decodedCall) {
    return (
      <VStack alignItems={"start"} {...props}>
        <Text>
          Transfer <strong>{formatEther(value)}</strong> ETH to
        </Text>
        <AccountWithAvatar
          isLoading={isLoadingContractInfo || isLoadingNnsOrEnsName || isLoadingEnsAvatar}
          address={target}
          avatarImg={ensAvatar ?? undefined}
        >
          {nnsOrEnsName && <Text>{nnsOrEnsName}</Text>}
          <AccountAddress address={target} truncate={truncateAddress} />
        </AccountWithAvatar>
        {contractInfo && <ContractBreadcrumbs contractInfo={contractInfo} />}
      </VStack>
    );
  }

  const fullFunc = effectiveAbi
    ? (getAbiItem({ abi: effectiveAbi, name: decodedCall.functionName }) as AbiFunction)
    : undefined;

  return (
    <VStack alignItems={"start"} spacing={4} {...props}>
      <Text>
        Call <strong>{decodedCall.functionName}</strong> {value > 0n ? ` with ${formatEther(value)} ETH on` : " on"}
      </Text>
      <AccountWithAvatar
        isLoading={isLoadingContractInfo || isLoadingNnsOrEnsName || isLoadingEnsAvatar}
        address={target}
        avatarImg={ensAvatar ?? undefined}
      >
        {nnsOrEnsName && <Text>{nnsOrEnsName}</Text>}
        <AccountAddress address={target} truncate={truncateAddress} />
      </AccountWithAvatar>
      {contractInfo && <ContractBreadcrumbs contractInfo={contractInfo} />}

      <ParamsTable params={(fullFunc ?? partialFunc).inputs.map((p, i) => toParamSpec(p, i, decodedCall.args!))} />
    </VStack>
  );
};

const toParamSpec = (param: AbiParameter, i: number, decodedData: readonly unknown[]): ParamSpec => ({
  description: `${param.name ?? i} (${param.type})`,
  value:
    "components" in param && param.components !== null
      ? param.components.map((c, j) => toParamSpec(c, j, decodedData[i] as unknown[]))
      : decodedData[i]!.toString()
});
