import Client from "../src/client";
import withTestServer, { results } from "./test-server";

test("sets sane defaults", () => {
  const client = new Client();

  expect(client.base).toContain("api.tenor.com");
  expect(typeof client.token).toEqual("string");
});

test("fetches the expected results", () => (
  withTestServer(8083, async () => {
    const client = new Client({ base: "http://localhost:8083", token: "token" });
    const response = await client.search("Happy");

    expect(response).toEqual(results.search);
  })
));
