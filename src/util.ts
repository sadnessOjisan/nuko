export const isEmpty = (input: unknown): boolean => {
  const isTruthy = Boolean(input);
  if (!isTruthy) return true;
  if (typeof input === "object") {
    if (input === null) return true;
    const isEmptyObject = Object.keys(input).length === 0;
    return isEmptyObject;
  }
  return false;
};
