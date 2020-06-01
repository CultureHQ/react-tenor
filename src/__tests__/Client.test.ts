import Client from "../Client";
import mockResults from "./mockResults";
import withTestServer from "./withTestServer";

test("sets sane defaults", () => {
  const client = new Client({});

  expect(client.base).toContain("api.tenor.com");
  expect(typeof client.token).toEqual("string");
});

test("fetches the expected results", withTestServer(8090, async () => {
  const client = new Client({ base: "http://localhost:8090", token: "token" });
  const response = await client.search("Happy");

  expect(response.results).toEqual(mockResults.search);
}));
