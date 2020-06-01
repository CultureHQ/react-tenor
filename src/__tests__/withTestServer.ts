import { createServer } from "http";

import mockResults from "./mockResults";

const getRequestKey = (url: string) => (
  url.slice(1).substring(0, url.indexOf("?") - 1)
);

export type TestServer = ReturnType<typeof createServer> & {
  requests: {
    autocomplete: number;
    search_suggestions: number;
    search: number;
  };
};

type Callback = (server: TestServer) => void;
const withTestServer = (port: number, callback: Callback) => async (): Promise<void> => {
  const server = createServer() as TestServer;

  server.requests = {
    autocomplete: 0,
    search_suggestions: 0,
    search: 0
  };

  server.on("request", (request, response) => {
    const requestKey = getRequestKey(request.url) as ("autocomplete" | "search_suggestions" | "search");
    server.requests[requestKey] += 1;

    response.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET"
    });

    response.write(JSON.stringify({ results: mockResults[requestKey], next: "12" }));
    response.end();
  });

  server.listen(port);

  try {
    await callback(server);
  } finally {
    server.close();
  }
};

export default withTestServer;
