import {
  Button,
  HStack,
  StackProps,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import { TransactionData } from "utils/governanceUtils"

export interface AddTransactionFormProps extends StackProps {
  onAddTransaction: (transaction: TransactionData) => void
  onCancel: () => void
}

export const AddTransactionForm: FC<AddTransactionFormProps> = ({
  onAddTransaction,
  onCancel,
  ...props
}) => {
  const [type, setType] = useState<"Send ETH" | "Call Function">()
  return (
    <VStack borderWidth={1} borderRadius={"md"} p={2} {...props}>
      <Text size={"md"} fontWeight={"semibold"}>
        Add transaction
      </Text>
      <HStack w="full">
        <Switch />
        <Button alignSelf={"end"} onClick={onCancel}>
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}
