import { expect, test } from "vitest";
import { isEmpty } from "./util";

test("0 is empty", () => {
  const actual = isEmpty(0);
  const expected = true;
  expect(actual).toBe(expected);
});

test("'' is empty", () => {
  const actual = isEmpty("");
  const expected = true;
  expect(actual).toBe(expected);
});

test("false is empty", () => {
  const actual = isEmpty(false);
  const expected = true;
  expect(actual).toBe(expected);
});

test("null is empty", () => {
  const actual = isEmpty(null);
  const expected = true;
  expect(actual).toBe(expected);
});

test("{} is empty", () => {
  const actual = isEmpty({});
  const expected = true;
  expect(actual).toBe(expected);
});

test("[] is empty", () => {
  const actual = isEmpty([]);
  const expected = true;
  expect(actual).toBe(expected);
});
