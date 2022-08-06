import { isEmpty } from "./util";

type ArrayInput = ReadonlyArray<
  string | number | boolean | Record<string, unknown>
>;

type Input =
  | ArrayInput
  | Record<string, unknown>
  | null
  | Array<unknown>
  | number
  | string;

type InputForVariadic = ReadonlyArray<Input>;

/**
 * Cat classname
 * @param input
 * @returns
 */
export const cn = (...input: InputForVariadic): string => {
  let userInput;
  if (input.length === 1) {
    userInput = input[0];
  } else {
    // variadic
    userInput = input;
  }
  return noVariadicCn(userInput);
};

const noVariadicCn = (input: unknown): string => {
  if (input === undefined) return "";
  if (isEmpty(input)) return "";

  if (Array.isArray(input)) {
    return arrayCat(input);
  } else if (typeof input === "string" || typeof input === "number") {
    return String(input);
  } else if (typeof input === "object" && input !== null) {
    return catForObjectInput(input);
  }
  return "";
};

const arrayCat = (input: unknown[]) => {
  const flat = input.flat();

  const head = flat[0];
  const rest = flat.slice(1);
  const headResult = noVariadicCn(head);
  if (rest.length === 0) {
    return headResult;
  }
  const restResult = noVariadicCn(rest);
  if (headResult === "") return restResult;
  return restResult === "" ? headResult : `${headResult} ${restResult}`;
};

const catForObjectInput = (input: Object): string => {
  return Object.entries(input)
    .filter((set) => {
      const key = set[0];
      const value = set[1];
      // Check truthy not empty. This is compatible for classnames.
      return Boolean(value);
    })
    .map((set) => set[0])
    .join(" ");
};
