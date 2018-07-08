import "isomorphic-fetch";

import stringify from "./stringify";

const BASE =
  process.env.NODE_ENV === "test" ?
    "http://localhost:8080" :
    "https://api.tenor.com/v1";

class Client {
  constructor(token) {
    this.token = token;
  }

  search(q) {
    return fetch(`${BASE}/search${this.queryFor(q)}`)
      .then(response => response.json()).then(({ results }) => results);
  }

  queryFor(q) {
    return stringify({
      key: this.token,
      q,
      limit: 12,
      safesearch: "mild",
      media_filter: "minimal"
    });
  }
}

export default Client;
