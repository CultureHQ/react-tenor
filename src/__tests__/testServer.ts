import { createServer } from "http";

import mockResults from "./mockResults";

type TestServer = ReturnType<typeof createServer> & {
  port: number;
  requests: Record<keyof typeof mockResults, number>;
};

const testServer = createServer() as TestServer;

testServer.port = 8080;
testServer.requests = {
  autocomplete: 0,
  search_suggestions: 0,
  search: 0
};

const getRequestKey = (url: string) => url.slice(1).substring(0, url.indexOf("?") - 1);

export const startTestServer = (): Promise<void> => new Promise(resolve => {
  testServer.on("request", (request, response) => {
    const requestKey = getRequestKey(request.url) as keyof typeof mockResults;
    testServer.requests[requestKey] += 1;

    response.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET"
    });

    response.write(JSON.stringify({ results: mockResults[requestKey], next: "12" }));
    response.end();
  });

  testServer.on("error", () => {
    testServer.close(() => {
      testServer.port += 1;
      testServer.listen(testServer.port);
    });
  });

  testServer.on("listening", resolve);

  testServer.listen({ port: testServer.port, host: "localhost", exclusive: true });
});

export const stopTestServer = (): Promise<void> => (
  new Promise(resolve => testServer.close(() => resolve()))
);

export default testServer;
