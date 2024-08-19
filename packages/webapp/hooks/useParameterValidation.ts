import { AbiParameter } from "abitype";
import { useEffect, useState } from "react";
import { parseArrayParameter } from "utils/parseArrayParameter";
import { BaseError, encodeAbiParameters } from "viem";

export const useParameterValidation = (param: AbiParameter, value: string) => {
  const [error, setError] = useState<string | null>(null);
  const [decodedParam, setDecodedParam] = useState<any | null>(null);
  const isArrayParam = param.type.endsWith("[]");
  const isValidArray = isArrayParam && value.startsWith("[") && value.endsWith("]");

  useEffect(() => {
    if (!value) {
      setError(param.name + " is required");
      setDecodedParam(null);
      return;
    }
    try {
      setDecodedParam(
        encodeAbiParameters([param], [isArrayParam && isValidArray ? parseArrayParameter(value) : value])[0]
      );
      setError(null);
    } catch (e: any) {
      if (!(e instanceof BaseError)) throw e;
      setError(e.shortMessage);
      setDecodedParam(null);
    }
  }, [param, value]);

  return { isValid: !error, error, decodedParam };
};
