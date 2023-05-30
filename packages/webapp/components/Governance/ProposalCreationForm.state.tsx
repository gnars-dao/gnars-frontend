import { TransactionData } from "utils/governanceUtils"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ProposalCreationState = {
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  transactions: TransactionData[]
  setTransactions: (transactions: TransactionData[]) => void
}

export const useProposalCreationState = create<ProposalCreationState>()(
  persist(
    (set) => ({
      title: "",
      setTitle: (title) => set({ title }),
      description: "",
      setDescription: (description) => set({ description }),
      transactions: [],
      setTransactions: (transactions) => set({ transactions }),
    }),
    { name: "prop-creation-state" }
  )
)
