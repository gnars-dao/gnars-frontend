import { Badge, Card, CardBody, CardProps, HStack } from "@chakra-ui/react"
import { FC } from "react"
import { TransactionData } from "utils/governanceUtils"
import { Transaction } from "./Transaction"

export interface TransactionCardProps extends CardProps {
  data: TransactionData
  controls?: React.ReactNode
  index: number
}

export const TransactionCard: FC<TransactionCardProps> = ({
  index,
  data,
  controls,
  ...props
}) => {
  return (
    <Card {...props} w={"full"} variant={"outline"} bgColor={"blackAlpha.100"}>
      <HStack w={"full"} justifyContent={"space-between"} alignItems={"start"}>
        <Badge
          w={"fit-content"}
          color={"whiteAlpha.600"}
          bgColor={"whiteAlpha.100"}
          px={4}
          fontSize={"md"}
          borderBottomRightRadius={"md"}
          fontWeight={"bold"}
        >
          {index}
        </Badge>
        {controls}
      </HStack>
      <CardBody p={6}>
        <Transaction data={data} />
      </CardBody>
    </Card>
  )
}
