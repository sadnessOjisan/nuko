type Input = ReadonlyArray<string | number | boolean | Record<string, boolean>>;

type InputForVariadic = ReadonlyArray<Input>;

/**
 * Cat classname
 * @param input
 * @returns
 */
export const cn = (...input: Input | InputForVariadic): string => {
  const isInputVariadicArg = input.length > 1;
  if (isInputVariadicArg && Array.isArray(input)) {
    return input.filter((el) => Boolean(el)).join(" ");
  } else {
    const nonVariadicInput = input[0];
    if (Array.isArray(nonVariadicInput)) {
      return nonVariadicInput.filter((el) => Boolean(el)).join(" ");
    }
    if (typeof nonVariadicInput === "object") {
      return catForObjectInput(nonVariadicInput);
    }
  }

  return "";
};

const catForObjectInput = (input: Object): string => {
  return Object.entries(input)
    .filter((set) => {
      const key = set[0];
      const value = set[1];
      return Boolean(value);
    })
    .map((set) => set[0])
    .join(" ");
};
