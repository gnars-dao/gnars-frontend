export const parseArrayParameter = (value: string) => (value === "[]" ? [] : value.slice(1, -1).split(","));
