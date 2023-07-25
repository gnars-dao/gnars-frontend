import { AbiFunction } from "abitype"
import { getSignature } from "./functionUtils"

describe("getSignature", () => {
  test.each([
    {
      func: {
        name: "test",
        inputs: [
          { name: "stringInput", type: "string" },
          { name: "uintInput", type: "uint256" },
          { name: "boolInput", type: "bool" },
          { name: "addressInput", type: "address" },
          { name: "bytesInput", type: "bytes" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      signature: "test(string,uint256,bool,address,bytes)",
    },
    {
      func: {
        inputs: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "uint64", name: "editionSize", type: "uint64" },
          { internalType: "uint16", name: "royaltyBPS", type: "uint16" },
          {
            internalType: "address payable",
            name: "fundsRecipient",
            type: "address",
          },
          { internalType: "address", name: "defaultAdmin", type: "address" },
          {
            components: [
              { internalType: "uint104", name: "publicSalePrice", type: "uint104" },
              {
                internalType: "uint32",
                name: "maxSalePurchasePerAddress",
                type: "uint32",
              },
              { internalType: "uint64", name: "publicSaleStart", type: "uint64" },
              { internalType: "uint64", name: "publicSaleEnd", type: "uint64" },
              { internalType: "uint64", name: "presaleStart", type: "uint64" },
              { internalType: "uint64", name: "presaleEnd", type: "uint64" },
              {
                internalType: "bytes32",
                name: "presaleMerkleRoot",
                type: "bytes32",
              },
            ],
            internalType: "struct IERC721Drop.SalesConfiguration",
            name: "saleConfig",
            type: "tuple",
          },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "string", name: "animationURI", type: "string" },
          { internalType: "string", name: "imageURI", type: "string" },
        ],
        name: "createEdition",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      signature:
        "createEdition(string,string,uint64,uint16,address,address,(uint104,uint32,uint64,uint64,uint64,uint64,bytes32),string,string,string)",
    },
    {
      func: {
        inputs: [
          {
            internalType: "address",
            name: "t",
            type: "address",
          },
          {
            internalType: "address",
            name: "ah",
            type: "address",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "maxBid",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "minBid",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "bidWindow",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tip",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "receiver",
                type: "address",
              },
            ],
            internalType: "struct IBidder.Config",
            name: "cfg",
            type: "tuple",
          },
        ],
        name: "clone",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      signature: "clone(address,address,address,(uint256,uint256,uint256,uint256,address))",
    },
    {
      func: {
        inputs: [
          { internalType: "address", name: "payer", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "tokenAmount", type: "uint256" },
          { internalType: "address", name: "tokenAddress", type: "address" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "stopTime", type: "uint256" },
          { internalType: "uint8", name: "nonce", type: "uint8" },
        ],
        name: "createStream",
        outputs: [{ internalType: "address", name: "stream", type: "address" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      signature: "createStream(address,address,uint256,address,uint256,uint256,uint8)",
    },
  ] as { func: AbiFunction; signature: string }[])(
    "generates the correct signature for function $signature",
    ({ func, signature }) => {
      expect(getSignature(func)).toBe(signature)
    }
  )
})
