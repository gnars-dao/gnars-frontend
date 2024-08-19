import { AbiFunction, AbiInternalType, AbiParameter } from "abitype";

export const getSignature = (func: AbiFunction) => {
  return `${func.name}(${func.inputs.map(getType).join(",")})`;
};

const getType = (parameter: AbiParameter): string =>
  isTuple(parameter) ? `(${parameter.components.map(getType).join(",")})` : parameter.type;

const isTuple = (
  parameter: AbiParameter
): parameter is {
  type: "tuple" | `tuple[${string}]`;
  name?: string | undefined;
  internalType?: AbiInternalType | undefined;
  components: readonly AbiParameter[];
} => parameter.type.startsWith("tuple");
