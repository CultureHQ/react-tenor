import Client from "../src/client";
import testServer, { results } from "./test-server";

test("fetches the expected results", async () => {
  testServer.listen(8080);

  const client = new Client({ base: "http://localhost:8080", token: "token" });
  const response = await client.search("Happy");

  expect(response).toEqual(results);

  testServer.close();
});
