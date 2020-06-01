import Client from "../Client";
import mockResults from "./mockResults";
import testServer from "./testServer";

test("sets sane defaults", () => {
  const client = new Client({});

  expect(client.base).toContain("api.tenor.com");
  expect(typeof client.token).toEqual("string");
});

test("fetches the expected results", async () => {
  const client = new Client({ base: `http://localhost:${testServer.port}`, token: "token" });
  const response = await client.search("Happy");

  expect(response.results).toEqual(mockResults.search);
});
