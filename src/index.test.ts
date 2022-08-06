import { describe, expect, test } from "vitest";
import { cn } from ".";

describe("clsx README test", () => {
  // Strings (variadic)
  // clsx('foo', true && 'bar', 'baz');
  //=> 'foo bar baz'
  test("Strings (variadic)", () => {
    const actual = cn("foo", true && "bar", "baz");
    const expected = "foo bar baz";
    expect(actual).toBe(expected);
  });

  // Objects
  // clsx({ foo:true, bar:false, baz:isTrue() });
  //=> 'foo baz'
  test("Objects", () => {
    const isTrue = () => true;
    const actual = cn({ foo: true, bar: false, baz: isTrue() });
    const expected = "foo baz";
    expect(actual).toBe(expected);
  });

  // Objects (variadic)
  // clsx({ foo:true }, { bar:false }, null, { '--foobar':'hello' });
  //=> 'foo --foobar'
  test("Objects (variadic)", () => {
    const actual = cn({ foo: true }, { bar: false }, null, {
      "--foobar": "hello",
    });
    const expected = "foo --foobar";
    expect(actual).toBe(expected);
  });

  // Arrays
  // clsx(['foo', 0, false, 'bar']);
  //=> 'foo bar'
  test("Arrays", () => {
    const actual = cn(["foo", 0, false, "bar"]);
    const expected = "foo bar";
    expect(actual).toBe(expected);
  });

  // Arrays (variadic)
  // clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
  //=> 'foo bar baz hello there'
  test("Arrays", () => {
    const actual = cn(
      ["foo"],
      ["", 0, false, "bar"],
      [["baz", [["hello"], "there"]]]
    );
    const expected = "foo bar baz hello there";
    expect(actual).toBe(expected);
  });

  // Kitchen sink (with nesting)
  // clsx('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya');
  //=> 'foo bar hello world cya'
  test("Kitchen sink (with nesting)", () => {
    const actual = cn(
      "foo",
      [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]],
      "cya"
    );
    const expected = "foo bar hello world cya";
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

  test("(compat) joins arrays of class names and ignore falsy values", () => {
    const actual = cn("a", 0, null, undefined, true, 1, "b");
    const expected = "a 1 b";
    expect(actual).toBe(expected);
  });

  test("(compat) supports heterogenous arguments", () => {
    const actual = cn({ a: true }, "b", 0);
    const expected = "a b";
    expect(actual).toBe(expected);
  });

  test("(compat) should be trimmed", () => {
    const actual = cn("", "b", {}, "");
    const expected = "b";
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

  test("(compat) joins array arguments with string arguments", () => {
    const actual1 = cn(["a", "b"], "c");
    const actual2 = cn("c", ["a", "b"]);
    const expected1 = "a b c";
    const expected2 = "c a b";
    expect(actual1).toBe(expected1);
    expect(actual2).toBe(expected2);
  });

  test("(compat) handles multiple array arguments", () => {
    const actual = cn(["a", "b"], ["c", "d"]);
    const expected = "a b c d";
    expect(actual).toBe(expected);
  });

  test("(compat) handles arrays that include falsy and true values", () => {
    const actual = cn(["a", 0, null, undefined, false, true, "b"]);
    const expected = "a b";
    expect(actual).toBe(expected);
  });

  test("(compat) handles arrays that include arrays", () => {
    const actual = cn(["a", ["b", "c"]]);
    const expected = "a b c";
    expect(actual).toBe(expected);
  });

  test("(compat) handles arrays that include objects", () => {
    const actual = cn(["a", { b: true, c: false }]);
    const expected = "a b";
    expect(actual).toBe(expected);
  });

  test("(compat) handles deep array recursion", () => {
    const actual = cn(["a", ["b", ["c", { d: true }]]]);
    const expected = "a b c d";
    expect(actual).toBe(expected);
  });

  test("(compat) handles arrays that are empty", () => {
    const actual = cn("a", []);
    const expected = "a";
    expect(actual).toBe(expected);
  });

  test("(compat) handles nested arrays that have empty nested arrays", () => {
    const actual = cn("a", [[]]);
    const expected = "a";
    expect(actual).toBe(expected);
  });

  test("(compat) handles all types of truthy and falsy property values as expected", () => {
    const actual = cn({
      // falsy:
      null: null,
      emptyString: "",
      noNumber: NaN,
      zero: 0,
      negativeZero: -0,
      false: false,
      undefined: undefined,

      // truthy (literally anything else):
      nonEmptyString: "foobar",
      whitespace: " ",
      function: Object.prototype.toString,
      emptyObject: {},
      nonEmptyObject: { a: 1, b: 2 },
      emptyList: [],
      nonEmptyList: [1, 2, 3],
      greaterZero: 1,
    });
    const expected =
      "nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero";
    expect(actual).toBe(expected);
  });
});
