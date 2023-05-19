// const ProposalCreationContext = createContext<ProposalCreationContextType>({

import { createContext, useContext, useState } from "react"
import { TransactionData } from "utils/governanceUtils"

export type ProposalCreationState = ReturnType<
  typeof getInitialProposalCreationState
>

export const getInitialProposalCreationState = () => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [transactions, setTransactions] = useState<TransactionData[]>([])

  return {
    title,
    setTitle,
    description,
    setDescription,
    transactions,
    setTransactions,
  }
}

const ProposalCreationContext = createContext<ProposalCreationState | null>(
  null
)

export const ProposalCreationContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const state = getInitialProposalCreationState()

  return (
    <ProposalCreationContext.Provider value={state}>
      {children}
    </ProposalCreationContext.Provider>
  )
}

export const useProposalCreationContext = () => {
  const context = useContext(ProposalCreationContext)
  if (!context) {
    throw new Error(
      "useProposalCreationContext must be used within a ProposalCreationContextProvider"
    )
  }
  return context
}
