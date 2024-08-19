import { useMemo } from "react";
import { Abi, AbiFunction } from "abitype";

export const useFunctions = (abi: string) => {
  return useMemo(() => {
    if (abi === "") return null;
    try {
      const parsedAbi = JSON.parse(abi) as Abi;
      return parsedAbi.filter((item) => item.type === "function") as AbiFunction[];
    } catch {
      return null;
    }
  }, [abi]);
};
