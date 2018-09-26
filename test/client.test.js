import Client from "../src/client";
import withTestServer, { results } from "./test-server";

test("fetches the expected results", () => (
  withTestServer(8081, async () => {
    const client = new Client({ base: "http://localhost:8081", token: "token" });
    const response = await client.search("Happy");

    expect(response).toEqual(results);
  })
));
