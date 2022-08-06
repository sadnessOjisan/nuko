import { expect, test } from "vitest";
import { cn } from ".";

test("variadic", () => {
  const actual = cn("hello", "world");
  expect(actual).toBe("hello world");
});
test("string array", () => {
  const actual = cn(["hello", "world"]);
  expect(actual).toBe("hello world");
});
test("array including falsy value", () => {
  const actual = cn(["hello", 0, "world", "", false && "hello world"]);
  expect(actual).toBe("hello world");
});

test("array including truthy value", () => {
  const actual = cn(["hello", 0, "world", "", true && "hello world"]);
  expect(actual).toBe("hello world hello world");
});

test("object", () => {
  const actual = cn({ foo: true, bar: false, baz: true });
  expect(actual).toBe("foo baz");
});

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
