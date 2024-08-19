import { FC } from "react";
import { Transaction } from "./Transaction";
import { Alert, AlertIcon, Badge, Card, CardBody, CardProps, HStack } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import { NounsTransactionData } from "utils/governanceUtils";

export interface TransactionCardProps extends CardProps {
  data: NounsTransactionData;
  controls?: React.ReactNode;
  index: number;
}

export const TransactionCard: FC<TransactionCardProps> = ({ index, data, controls, ...props }) => {
  return (
    <Card {...props} w={"full"} variant={"outline"} bgColor={"blackAlpha.100"} overflowX={"scroll"}>
      <HStack w={"full"} position={"sticky"} left={0} justifyContent={"space-between"} alignItems={"start"}>
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
        <ErrorBoundary
          fallback={
            <Alert status="error" bgColor={"transparent"}>
              <AlertIcon />
              There was an error parsing this transaction
            </Alert>
          }
        >
          <Transaction data={data} />
        </ErrorBoundary>
      </CardBody>
    </Card>
  );
};
