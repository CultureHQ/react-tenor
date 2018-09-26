import http from "http";

export const results = [
  { id: 1, media: [{ tinygif: { url: "https://via.placeholder.com/10x10" } }] },
  { id: 2, media: [{ tinygif: { url: "https://via.placeholder.com/10x10" } }] },
  { id: 3, media: [{ tinygif: { url: "https://via.placeholder.com/10x10" } }] },
  { id: 4, media: [{ tinygif: { url: "https://via.placeholder.com/10x10" } }] },
  { id: 5, media: [{ tinygif: { url: "https://via.placeholder.com/10x10" } }] }
];

const withTestServer = async (port, callback) => {
  const server = http.createServer();
  server.requests = 0;

  server.on("request", (request, response) => {
    server.requests += 1;
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify({ results }));
    response.end();
  });

  server.listen(port);
  await callback(server);

  server.close();
};

export default withTestServer;
