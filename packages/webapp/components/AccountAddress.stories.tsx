import { AccountAddress } from "./AccountAddress";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof AccountAddress>;

const meta: Meta<typeof AccountAddress> = {
  component: AccountAddress
};

export default meta;

export const Default: Story = {
  args: {
    address: "0x92EC13d7498d7A38174FEe5f89f757A725662280"
  }
};
