import { Badge, Card, CardBody, CardProps } from "@chakra-ui/react"
import { FC } from "react"
import { TransactionData } from "utils/governanceUtils"
import { Transaction } from "./Transaction"

export interface TransactionCardProps extends CardProps {
  data: TransactionData
  index: number
}

export const TransactionCard: FC<TransactionCardProps> = ({
  index,
  data,
  ...props
}) => {
  return (
    <Card {...props} w={"full"} variant={"outline"} bgColor={"blackAlpha.100"}>
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
      <CardBody>
        <Transaction data={data} />
      </CardBody>
    </Card>
  )
}
