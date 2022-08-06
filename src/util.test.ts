import { expect, test } from "vitest";
import { isEmpty } from "./util";

test("0", () => {
  const actual = isEmpty(0);
  const expected = true;
  expect(actual).toBe(expected);
});
