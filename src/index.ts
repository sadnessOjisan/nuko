import { isEmpty } from "./util";

type ArrayInput =
  | ReadonlyArray<ArrayInput>
  | Record<string, unknown>
  | null
  | number
  | string
  | undefined
  | boolean;

type Input =
  | Record<string, unknown>
  | null
  | ReadonlyArray<ArrayInput>
  | number
  | string
  | undefined
  | boolean;

type InputForVariadic = ReadonlyArray<Input>;

/**
 * Simple catting function mainly for class name.
 * This is only for variadic.
 * And this is not support for Object and Array.
 * If you want support those, you should use {@link clsx} function.
 * Our {@link clsx} is compatible for {@link https://github.com/JedWatson/classnames classnames} and {@link https://github.com/lukeed/clsx clsx} version.
 * @param input Variadic input. This doesn't accept array and object.
 * @return Joined string.
 * @example cn("a", "b")
 * // "a b"
 * @example cn("a", "b", false, 0, null, undefined, "")
 * // "a b"
 */
export const cn = (
  ...input: ReadonlyArray<string | boolean | number | null | undefined>
): string => {
  return input.filter((el) => Boolean(el)).join(" ");
};

/**
 * catting function mainly for class name.
 * This has compatible for {@link https://github.com/JedWatson/classnames classnames} and {@link https://github.com/lukeed/clsx clsx}.
 * But this is slower and heavier than {@link cn}.
 * @param input
 * @returns Joined string.
 */
export const clsx = (...input: InputForVariadic): string => {
  let userInput: Input;
  if (input.length === 1) {
    userInput = input[0];
  } else {
    // variadic
    userInput = input;
  }
  return noVariadicCn(userInput);
};

const noVariadicCn = (input: Input): string => {
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

const arrayCat = (input: ReadonlyArray<ArrayInput>) => {
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
      const value = set[1];
      // Check truthy not empty. This is compatible for classnames.
      return Boolean(value);
    })
    .map((set) => set[0])
    .join(" ");
};
