import React, { createContext, useContext, useState } from "react"
import { DetailedProposalData, TransactionData } from "utils/governanceUtils"

export type ProposalCreationData = ReturnType<typeof getProposalCreationData>

const ProposalCreationContext = createContext<ProposalCreationData | undefined>(
  undefined
)

interface ProposalCreationProviderProps {
  children: React.ReactNode
}

export const ProposalCreationContextProvider: React.FC<
  ProposalCreationProviderProps
> = ({ children }) => {
  const proposalCreationData = getProposalCreationData()

  return (
    <ProposalCreationContext.Provider value={proposalCreationData}>
      {children}
    </ProposalCreationContext.Provider>
  )
}

export const useProposalCreationContext = ():
  | ProposalCreationData
  | undefined => {
  return useContext(ProposalCreationContext)
}

const getProposalCreationData = () => {
  const [title, setTitle] = useState("Proposal title")
  const [description, setDescription] = useState(
    "Describe your proposal here\n\n**Markdown supported**"
  )
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
