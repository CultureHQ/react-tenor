import "isomorphic-fetch";
import queryString from "query-string";

class Client {
  constructor(key) {
    this.key = key;
  }

  search(q) {
    const query = queryString.stringify({ key: this.key, q, limit: 12 });

    return fetch(`https://api.tenor.com/v1/search?${query}`)
      .then(response => response.json())
      .then(({ results }) => results);
  }
}

export default Client;
