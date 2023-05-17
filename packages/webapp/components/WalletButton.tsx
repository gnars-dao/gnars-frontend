"use client"

import { Button, ButtonProps, Text } from "@chakra-ui/react"
import { ConnectKitButton } from "connectkit"
import { AvatarWallet } from "./AvatarWallet"

export const WalletButton = (props: ButtonProps) => (
  <ConnectKitButton.Custom>
    {({ isConnected, address, show }) => {
      return (
        <Button
          h={12}
          w={"fit-content"}
          py={"6px"}
          px={"6px"}
          onClick={show}
          borderRadius={"full"}
          {...props}
        >
          {isConnected && address ? (
            <AvatarWallet address={address} />
          ) : (
            <Text px={4}>Connect Wallet</Text>
          )}
        </Button>
      )
    }}
  </ConnectKitButton.Custom>
)
