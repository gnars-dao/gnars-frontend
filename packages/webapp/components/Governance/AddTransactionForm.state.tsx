import { AbiFunction, AbiParameter } from "abitype"
import { produce } from "immer"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TransactionKind = "Send ETH" | "Call contract"

export type ParameterValue = string | string[] | ParameterValue[]

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
  func: AbiFunction | undefined
  setFunc: (func: AbiFunction) => void
  funcParams: ParameterValue[]
  setFuncParam: (indices: number[], value: string | string[]) => void
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
      func: undefined,
      setFunc: (func) => set({ func, funcParams: func.inputs.map(getDefaultParamValue) }),
      funcParams: [],
      setFuncParam: (indices, value) =>
        set(
          produce((state) => {
            let curr: any = state.funcParams
            for (let i = 0; i < indices.length; i++) {
              if (i === indices.length - 1) {
                curr[indices[i]] = value
              } else {
                curr = curr[indices[i]]
              }
            }
            return state
          })
        ),
      txKind: undefined,
      pickKind: (txKind) => set({ txKind }),
      clear: () =>
        set({
          accountQuery: "",
          ethValue: "",
          abi: "",
          func: undefined,
          txKind: undefined,
        }),
    }),
    { name: "add-tx-form-state" }
  )
)

const getDefaultParamValue = (param: AbiParameter): ParameterValue => {
  if ("components" in param) {
    return param.components.map(getDefaultParamValue)
  }

  return ""
}

export const getFuncParam = (funcParams: ParameterValue[], indices: number[]) => {
  let curr: ParameterValue = funcParams
  for (let i = 0; i < indices.length; i++) {
    curr = curr[indices[i]]
  }
  return curr
}
