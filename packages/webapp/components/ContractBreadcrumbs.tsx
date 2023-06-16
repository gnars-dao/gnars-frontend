import {
  Badge,
  forwardRef,
  HStack,
  Link,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react"
import {
  ContractInfo,
  getProxyAndImplementations,
  isProxy,
} from "hooks/useEtherscanContractInfo"

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
          <Text color={"gray.300"} style={{ margin: "auto 6px" }}>
            {">"}
          </Text>
        }
        spacing={2}
        color={"gray.500"}
        {...props}
      >
        {getProxyAndImplementations(contractInfo).map((contractInfo, i) => (
          <Link
            key={contractInfo.address}
            color={i > 0 ? "gray.500" : "white"}
            href={`https://etherscan.io/address/${contractInfo.address}#code`}
          >
            {contractInfo.name}{" "}
            {isProxy(contractInfo) && (
              <Badge
                fontSize={"2xs"}
                fontWeight={"regular"}
                colorScheme={"purple"}
              >
                Proxy
              </Badge>
            )}
          </Link>
        ))}
      </HStack>
    )
  }
)
