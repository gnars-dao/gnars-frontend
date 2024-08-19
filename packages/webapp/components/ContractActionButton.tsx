import { Button, ButtonProps } from "@chakra-ui/react";
import { ConnectKitButton, useModal } from "connectkit";
import { FC } from "react";

export interface ContractActionButtonProps extends ButtonProps {}

export const ContractActionButton: FC<ContractActionButtonProps> = ({ onClick, isDisabled, ...props }) => {
  const { openSwitchNetworks } = useModal();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, address, show, isConnecting, unsupported }) => (
        <Button
          {...props}
          onClick={isConnected ? (unsupported ? openSwitchNetworks : onClick) : show}
          isDisabled={(isConnected && unsupported) || isDisabled}
        />
      )}
    </ConnectKitButton.Custom>
  );
};
