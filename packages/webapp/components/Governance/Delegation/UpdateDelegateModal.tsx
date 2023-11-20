import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useBoolean,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { AccountAddress } from "components/AccountAddress"
import { AccountWithAvatar } from "components/AccountWithAvatar"
import { AvatarWallet } from "components/AvatarWallet"
import { useAccountQuery } from "hooks/useAccountQuery"
import { delegationInfoQueryKey, useDelegationInfo } from "hooks/useDelegationInfo"
import { FC, useEffect, useState } from "react"
import { useDebounce } from "usehooks-ts"
import { useGnarsV2TokenDelegate } from "utils/sdk"
import { normalize } from "viem/ens"
import { useAccount } from "wagmi"
import { waitForTransaction } from "wagmi/actions"

export interface UpdateDelegateModalProps extends Omit<ModalProps, "children"> {}

export const UpdateDelegateModal: FC<UpdateDelegateModalProps> = ({ onClose, ...props }) => {
  const { address: userAddress } = useAccount()
  const { data: delegation } = useDelegationInfo(userAddress)
  const currentDelegate = delegation?.account?.delegate?.id
  const { invalidateQueries } = useQueryClient()
  const [accountQuery, setAccountQuery] = useState<string>("")
  const [isValidName, setIsValidName] = useBoolean(false)
  const debouncedAccountQuery = useDebounce(accountQuery, 600)
  const { isLoading, address, ensAvatar, nnsOrEnsName } = useAccountQuery(debouncedAccountQuery)
  const toast = useToast()
  const { writeAsync: delegate, isLoading: isDelegating } = useGnarsV2TokenDelegate({
    args: [address!],
  })
  useEffect(() => {
    try {
      normalize(accountQuery)
      setIsValidName.on()
    } catch {
      setIsValidName.off()
    }
  }, [accountQuery])
  return (
    <Modal isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent w={"fit-content"} color={"chakra-body-text"}>
        <ModalHeader>Delegate votes</ModalHeader>
        <ModalBody>
          <VStack alignItems={"start"} spacing={10}>
            <FormControl>
              <FormLabel>Current delegate</FormLabel>

              <AvatarWallet address={delegation?.account?.delegate?.id} />
            </FormControl>
            <FormControl>
              <FormLabel>New delegate</FormLabel>
              <Input
                id={"destination"}
                value={accountQuery}
                onChange={(e) => setAccountQuery(e.target.value)}
                placeholder="gnars.eth / 0x558bfff0d583416f7c4e380625c7865821b8e95c"
              />
              <FormHelperText>You can use an address or an ENS name</FormHelperText>
            </FormControl>
            <AccountWithAvatar isLoading={isLoading} address={address} avatarImg={ensAvatar}>
              {!address && <Text>{!!accountQuery ? accountQuery : "Enter the destination account"}</Text>}
              {accountQuery && !address && !isLoading && (
                <Text color={"red.300"}>
                  {isValidName ? "Account not found" : "Invalid query. Use an address or ens name"}
                </Text>
              )}
              {address && <AccountAddress truncate address={address} />}
            </AccountWithAvatar>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              onClick={() => {
                setAccountQuery("")
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button
              isLoading={isDelegating}
              loadingText={"Delegating"}
              isDisabled={!address || currentDelegate.toLowerCase() === address.toLowerCase()}
              onClick={() =>
                delegate?.()
                  .then((tx) => waitForTransaction({ hash: tx.hash }))
                  .then(() => {
                    invalidateQueries(delegationInfoQueryKey(userAddress))
                    setAccountQuery("")
                    onClose()
                  })
                  .catch(() =>
                    toast({
                      status: "error",
                      title: "Error",
                      description: "Something went wrong. Check your wallet for details",
                    })
                  )
              }
            >
              Delegate
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
