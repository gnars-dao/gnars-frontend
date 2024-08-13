// TODO: Replace rainbowkit modal
// import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'

// import { useBridgeModal } from '@hooks/useBridgeModal'
import { useChainStore } from 'stores/useChainStore'

interface ContractButtonProps extends ButtonProps {
  handleClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const ContractButton = ({
  children,
  handleClick,
  ...rest
}: ContractButtonProps) => {
  const { address: userAddress } = useAccount()
  const { chain: userChain } = useNetwork()
  const appChain = useChainStore((x) => x.chain)
  // const { canUserBridge, openBridgeModal } = useBridgeModal()
  const { data: userBalance } = useBalance({
    address: userAddress,
    chainId: appChain.id,
  })

  // const { openConnectModal } = useConnectModal()
  const { switchNetwork } = useSwitchNetwork()

  const handleSwitchNetwork = () => switchNetwork?.(appChain.id)

  const handleClickWithValidation = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // if (!userAddress) return openConnectModal?.()
    // if (canUserBridge && userBalance?.decimals === 0) return openBridgeModal()
    if(!userAddress) return 
    if (userChain?.id !== appChain.id) return handleSwitchNetwork()
    handleClick(e)
  }

  return (
    <Button onClick={handleClickWithValidation} {...rest}>
      {children}
    </Button>
  )
}
