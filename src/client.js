export const stringify = query => (
  Object.keys(query).reduce((accum, key, index) => (
    `${accum}${index === 0 ? "" : "&"}${key}=${query[key]}`
  ), "?")
);

class Client {
  constructor({ base, token }) {
    this.base = base || "https://api.tenor.com/v1";
    this.token = token || "LIVDSRZULELA";
  }

  search(q) {
    return fetch(`${this.base}/search${this.queryFor(q)}`)
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
