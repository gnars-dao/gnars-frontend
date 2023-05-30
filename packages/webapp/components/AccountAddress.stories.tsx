import type { Meta, StoryObj } from "@storybook/react"
import { AccountAddress } from "./AccountAddress"
type Story = StoryObj<typeof AccountAddress>

const meta: Meta<typeof AccountAddress> = {
  component: AccountAddress,
}

export default meta

export const Default: Story = {
  args: {
    address: "0x92EC13d7498d7A38174FEe5f89f757A725662280",
  },
}
