import { Badge, Card, CardBody, CardProps, HStack } from "@chakra-ui/react"
import { FC } from "react"
import { NounsTransactionData } from "utils/governanceUtils"
import { Transaction } from "./Transaction"

export interface TransactionCardProps extends CardProps {
  data: NounsTransactionData
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
    <Card
      {...props}
      w={"full"}
      variant={"outline"}
      bgColor={"blackAlpha.100"}
      overflowX={"scroll"}
    >
      <HStack
        w={"full"}
        position={"sticky"}
        left={0}
        justifyContent={"space-between"}
        alignItems={"start"}
      >
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
      <CardBody w={"fit-content"} p={6}>
        <Transaction data={data} />
      </CardBody>
    </Card>
  )
}
