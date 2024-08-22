import { ParamsTable } from "./ParamsTable";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof ParamsTable>;

const meta: Meta<typeof ParamsTable> = {
  component: ParamsTable
};

export default meta;

export const WithTuples: Story = {
  args: {
    params: [
      {
        description: "0: string",
        value: "100 Nounish Things"
      },

      { description: "1: string", value: "NOUNISH00001" },

      { description: "2: uint64", value: "18446744073709551615" },

      { description: "3: uint16", value: "0" },

      {
        description: "4: address",
        value: "0xeaE0Aede44D2Fb6da60953E4D49eB5FC61fC141d"
      },

      {
        description: "5: address",
        value: "0x021edd67d43B365a6401a5Ee704Aa6f264F3F4e4"
      },

      {
        description: "6: tuple(uint104,uint32,uint64,uint64,uint64,uint64,bytes32)",
        value: [
          { description: "0: uint104", value: "30000000000000000" },
          { description: "1: uint32", value: "4294967295" },
          { description: "2: uint64", value: "1684591200" },
          { description: "3: uint64", value: "1685714400" },
          { description: "4: uint64", value: "0" },
          { description: "5: uint64", value: "0" },
          {
            description: "6: bytes32",
            value: "0x0000000000000000000000000000000000000000000000000000000000000000"
          }
        ]
      },

      {
        description: "7: string",
        value:
          "This music video highlights some of the greatest people, places, and things that Nouns has funded in the past year and a half. From crypto infrustructure Agora to Sofubi dolls, from 3D printed fashion to Esports teams, from naming a glassfrog species to creating this music video, the breadth of amazing things the Nouns is doing is inspirational."
      },

      {
        description: "8: string",
        value: "ipfs://bafybeicn3f43pvp3t2gt6rmom3i24rvuopdgz75upgxskzflunfymgxkvm"
      },

      {
        description: "9: string",
        value: "ipfs://bafybeibocdfvyfmbi75jnz7meflvf35hluihjk6jibh4t4tnpe3qq2tdza"
      }
    ]
  }
};
