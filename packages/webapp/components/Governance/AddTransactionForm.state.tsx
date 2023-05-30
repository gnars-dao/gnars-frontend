import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TransactionKind = "Send ETH" | "Call contract"

export interface AddTransactionFormState {
  isOpen: boolean
  txKind?: TransactionKind
  pickKind: (txKind?: TransactionKind) => void
  open: () => void
  close: () => void
  accountQuery: string
  setAccountQuery: (accountQuery: string) => void
  ethValue: string
  setEthValue: (ethValue: string) => void
  abi: string
  setAbi: (abi: string) => void
  clear: () => void
}

export const useAddTransactionFormState = create<AddTransactionFormState>()(
  persist(
    (set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      accountQuery: "",
      setAccountQuery: (accountQuery) => set({ accountQuery }),
      ethValue: "",
      setEthValue: (ethValue) => set({ ethValue }),
      abi: "",
      setAbi: (abi) => set({ abi }),
      txKind: undefined,
      pickKind: (txKind) => set({ txKind }),
      clear: () => set({ accountQuery: "", ethValue: "", abi: "" }),
    }),
    { name: "add-tx-form-state" }
  )
)
