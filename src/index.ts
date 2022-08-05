type Input = ReadonlyArray<string>;

export const cn = (input: Input): string => {
  return input.join(" ");
};
