import { stringify } from "../src/client";

test("works for empty objects", () => {
  const stringified = stringify({});

  expect(stringified).toEqual("?");
});

test("works for single values", () => {
  const stringified = stringify({ foo: "bar" });

  expect(stringified).toEqual("?foo=bar");
});

test("works for multiple values", () => {
  const stringified = stringify({ foo: "bar", bar: "baz" });

  expect(stringified).toEqual("?foo=bar&bar=baz");
});
