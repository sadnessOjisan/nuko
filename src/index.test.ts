import { describe, expect, test } from "vitest";
import { cn } from ".";

// Those tests cases are imported from https://github.com/lukeed/clsx/tree/master/test.

describe("Ported from `clsx`` for compatibility checks.", () => {
  // Objects
  // cn({ foo:true, bar:false, baz:isTrue() });
  //=> 'foo baz'
  test("Objects", () => {
    const isTrue = () => true;
    const actual = cn({ foo: true, bar: false, baz: isTrue() });
    const expected = "foo baz";
    expect(actual).toBe(expected);
  });

  // Arrays
  // cn(['foo', 0, false, 'bar']);
  //=> 'foo bar'
  test("Arrays", () => {
    const actual = cn(["foo", 0, false, "bar"]);
    const expected = "foo bar";
    expect(actual).toBe(expected);
  });
});

describe("Ported from `classnames` for compatibility checks.", () => {
  test("(compat) keeps object keys with truthy values", () => {
    const actual = cn({
      a: true,
      b: false,
      c: 0,
      d: null,
      e: undefined,
      f: 1,
    });
    const expected = "a f";
    expect(actual).toBe(expected);
  });

  test("(compat) returns an empty string for an empty configuration", () => {
    const actual = cn({});
    const expected = "";
    expect(actual).toBe(expected);
  });

  test("(compat) supports an array of class names", () => {
    const actual = cn(["a", "b"]);
    const expected = "a b";
    expect(actual).toBe(expected);
  });

  test("(compat) handles arrays that include falsy and true values", () => {
    const actual = cn(["a", 0, null, undefined, false, true, "b"]);
    const expected = "a b";
    expect(actual).toBe(expected);
  });
});
