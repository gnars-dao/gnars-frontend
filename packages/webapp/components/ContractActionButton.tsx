import { ConnectKitButton, useModal } from "connectkit"
import { Button, ButtonProps } from "@chakra-ui/react"
import { FC } from "react"
import { is } from "date-fns/locale"
import { c } from "@wagmi/cli/dist/config-c09a23a5"
import { useNetwork } from "wagmi"

export interface ContractActionButtonProps extends ButtonProps {}

export const ContractActionButton: FC<ContractActionButtonProps> = ({
  onClick,
  isDisabled,
  ...props
}) => {
  const { openSwitchNetworks } = useModal()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, address, show, isConnecting, unsupported }) => (
        <Button
          {...props}
          onClick={
            isConnected ? (unsupported ? openSwitchNetworks : onClick) : show
          }
          isDisabled={(isConnected && !unsupported) || isDisabled}
        />
      )}
    </ConnectKitButton.Custom>
  )
}
