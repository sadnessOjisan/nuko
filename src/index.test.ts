import { expect, test } from "vitest";
import { cn } from ".";

test("string array", () => {
  const actual = cn(["hello", "world"]);
  expect(actual).toBe("hello world");
});
