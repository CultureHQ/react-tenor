import http from "http";

import Client from "../src/client";
import testServer, { results } from "./test-server";

test("fetches the expected results", async () => {
  testServer.listen(8080);

  const response = await new Client("token").search("Happy");
  expect(response).toEqual(results);

  testServer.close();
});
