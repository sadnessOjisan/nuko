type Value = string | boolean | number | null | undefined;

// FIXME: Use ReadonlyArray after https://github.com/microsoft/TypeScript/issues/17002 is resolved.
type ArrayInput = Array<Value>;

type ObjectInput = Record<string, Value>;

/**
 * Join class name.
 * This is only support for Object and Array input.
 * And this is not support for nest inoput.
 * If you want support for variadic input, nest input, and so on, you should use {@link https://github.com/lukeed/clsx clsx}.
 * @param input
 * @return Joined string.
 * @example cn(["a", "b"])
 * // "a b"
 * @example cn(["a", "b" && false, "c", 0])
 * // "a c"
 * @example cn({a: true, b: false, c: true})
 * // "a c"
 */
export const cn = (input: ArrayInput | ObjectInput): string => {
  if (Array.isArray(input)) {
    return catForObjectArray(input);
  } else if (typeof input === "object") {
    if (input === null) {
      throw new Error("Input type should be array or object.");
    }
    return catForObjectInput(input);
  } else {
    throw new Error("Input type should be array or object.");
  }
};

const catForObjectArray = (input: ArrayInput): string => {
  return input.filter((el) => Boolean(el)).join(" ");
};

const catForObjectInput = (input: ObjectInput): string => {
  return Object.entries(input)
    .filter((set) => {
      const value = set[1];
      // Check truthy not empty. This is compatible for classnames.
      return Boolean(value);
    })
    .map((set) => set[0])
    .join(" ");
};
