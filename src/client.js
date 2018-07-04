import "isomorphic-fetch";
import queryString from "query-string";

const BASE =
  process.env.NODE_ENV === "test" ?
    "http://localhost:8080" :
    "https://api.tenor.com/v1";

class Client {
  constructor(token) {
    this.token = token;
  }

  search(q) {
    const query = queryString.stringify({ key: this.token, q, limit: 12 });

    return fetch(`${BASE}/search?${query}`)
      .then(response => response.json())
      .then(({ results }) => results);
  }
}

export default Client;
