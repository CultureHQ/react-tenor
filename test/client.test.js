import http from "http";
import Client from "../src/client";

const server = http.createServer();

server.on("request", async (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ results: [1, 2, 3] }));
  response.end();
});

test("fetches the expected results", async () => {
  server.listen(8080);

  const results = await new Client("token").search("Happy");
  expect(results).toEqual([1, 2, 3]);

  server.close();
});
