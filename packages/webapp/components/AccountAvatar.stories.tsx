import type { Meta, StoryObj } from "@storybook/react"
import { AccountAvatar } from "./AccountAvatar"
type Story = StoryObj<typeof AccountAvatar>

const meta: Meta<typeof AccountAvatar> = {
  component: AccountAvatar,
}

export default meta

export const WithImage: Story = {
  args: {
    avatarImg:
      "https://metadata.ens.domains/mainnet/avatar/volky.eth?timestamp=1685019159316",
  },
}

export const Blockiescon: Story = {
  args: {
    address: "0x558bfff0d583416f7c4e380625c7865821b8e95c",
  },
}

export const Placeholder: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
