import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
  forwardRef,
} from "@chakra-ui/react"
import {
  ContractInfo,
  getProxyAndImplementations,
  isProxy,
} from "hooks/useEtherscanContractInfo"

export interface ContractBreadcrumbsProps extends BreadcrumbProps {
  contractInfo: ContractInfo
}

export const ContractBreadcrumbs = forwardRef<ContractBreadcrumbsProps, "div">(
  ({ contractInfo, ...props }, ref) => (
    <Breadcrumb ref={ref} color={"gray.500"} {...props}>
      {getProxyAndImplementations(contractInfo).map((contractInfo, i) => (
        <BreadcrumbItem key={contractInfo.address}>
          <BreadcrumbLink
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
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
)
