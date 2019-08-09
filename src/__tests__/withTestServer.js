import http from "http";

let counter = 0;

const makeId = () => {
  counter += 1;
  return counter;
};

const makeResult = () => ({
  id: makeId(),
  itemurl: "https://tenor.com/view/this-is-a-test-gif-12345",
  media: [{ tinygif: { url: "https://via.placeholder.com/10x10" } }]
});

export const results = {
  autocomplete: ["test", "testing", "test2", "testingtesting", "testy testerson"],
  search_suggestions: ["test", "unit test", "acceptance test", "testing", "how to test"],
  search: [makeResult(), makeResult(), makeResult(), makeResult(), makeResult()]
};

const getRequestKey = url => (
  url.slice(1).substring(0, url.indexOf("?") - 1)
);

const withTestServer = (port, callback) => async () => {
  const server = http.createServer();

  server.requests = Object.keys(results).reduce((accum, key) => (
    Object.assign({}, accum, { [key]: 0 })
  ), {});

  server.on("request", (request, response) => {
    const requestKey = getRequestKey(request.url);
    server.requests[requestKey] += 1;

    response.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET"
    });

    response.write(JSON.stringify({ results: results[requestKey], next: "12" }));
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
