import { AbiFunction } from "abitype"
import { BigNumber } from "ethers"
import { Interface } from "ethers/lib/utils.js"
import { NounsTransactionData } from "utils/governanceUtils"
import { encodeFunctionData, parseEther } from "viem"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TransactionKind = "Send ETH" | "Call contract"

export type ParameterValue = string | ParameterValue[]

export interface SendEthTransactionData {
  txKind: "Send ETH"
  address: `0x${string}`
  ethValue: BigNumber
}

export interface CallContractTransactionData {
  txKind: TransactionKind
  address: `0x${string}`
  ethValue: BigNumber
  abi: string
  func: AbiFunction
  funcParams: ParameterValue[]
}

export type TransactionData =
  | SendEthTransactionData
  | CallContractTransactionData

export type ProposalCreationState = {
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  transactions: NounsTransactionData[]
  setTransactions: (transactions: NounsTransactionData[]) => void
  clear: () => void
}

const emptyState = {
  title: "",
  description: "",
  transactions: [],
}

export const useProposalCreationState = create<ProposalCreationState>()(
  persist(
    (set) => ({
      ...emptyState,
      setTitle: (title) => set({ title }),
      setDescription: (description) => set({ description }),
      setTransactions: (transactions) => set({ transactions }),
      clear: () => set(emptyState),
    }),
    { name: "prop-creation-state", version: 1 }
  )
)

export const getCalldata = ({
  abi,
  func,
  funcParams,
}: CallContractTransactionData): `0x${string}` | undefined => {
  if (!func || !abi || !funcParams) return undefined

  try {
    return encodeFunctionData({
      abi: JSON.parse(abi),
      functionName: func.name,
      args: funcParams,
    })
  } catch (e) {
    return undefined
  }
}

export const toNounsTransactionData = (
  txData: TransactionData
): NounsTransactionData => ({
  calldata:
    txData.txKind === "Send ETH"
      ? "0x"
      : "0x" + getCalldata(txData)!.substring(10),
  signature:
    txData.txKind === "Send ETH"
      ? ""
      : new Interface(txData.abi)
          .getFunction(txData.func.name)
          .format("sighash"),
  target: txData.address!,
  value:
    txData.txKind === "Send ETH"
      ? txData.ethValue
      : txData.func?.stateMutability === "payable"
      ? txData.ethValue
      : parseEther("0"),
})
