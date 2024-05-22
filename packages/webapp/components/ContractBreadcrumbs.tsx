import {
  Badge,
  forwardRef,
  HStack,
  Link,
  StackProps,
  Text,
} from "@chakra-ui/react"
import {
  ContractInfo,
  getProxyAndImplementations,
  isProxy,
} from "hooks/useExplorerContractInfo"

export interface ContractBreadcrumbsProps extends StackProps {
  contractInfo: ContractInfo
}

export const ContractBreadcrumbs = forwardRef<ContractBreadcrumbsProps, "div">(
  ({ contractInfo, ...props }, ref) => {
    return (
      <HStack
        ref={ref}
        wrap={"wrap"}
        divider={
          <Text color={"gray.300"} fontSize={"xs"} px={2}>
            {">"}
          </Text>
        }
        spacing={2}
        color={"gray.500"}
        {...props}
      >
        {getProxyAndImplementations(contractInfo).map((contractInfo, i) => (
          <HStack key={contractInfo.address}>
            <Link
              color={i > 0 ? "gray.500" : "white"}
              href={`https://basescan.org/address/${contractInfo.address}#code`}
            >
              <Text>{contractInfo.name}</Text>
            </Link>
            {isProxy(contractInfo) && (
              <Badge
                fontSize={"2xs"}
                fontWeight={"regular"}
                colorScheme={"purple"}
              >
                Proxy
              </Badge>
            )}
          </HStack>
        ))}
      </HStack>
    )
  }
)
