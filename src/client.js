export const stringify = query => (
  Object.keys(query).reduce((accum, key, index) => (
    `${accum}${index === 0 ? "" : "&"}${key}=${query[key]}`
  ), "?")
);

class Client {
  constructor(options = {}) {
    this.base = options.base || "https://api.tenor.com/v1";
    this.token = options.token || "LIVDSRZULELA";
  }

  search(search) {
    return fetch(`${this.base}/search${this.searchQueryFor(search)}`)
      .then(response => response.json()).then(({ results }) => results);
  }

  suggestions(search) {
    return fetch(`${this.base}/search_suggestions${this.suggestionsQueryFor(search)}`)
      .then(response => response.json()).then(({ results }) => results);
  }

  searchQueryFor(search) {
    return stringify({
      key: this.token,
      q: search,
      limit: 12,
      locale: "en_US",
      safesearch: "mild",
      media_filter: "minimal",
      ar_range: "all"
    });
  }

  suggestionsQueryFor(search) {
    return stringify({
      key: this.token,
      q: search,
      limit: 5,
      locale: "en_US"
    });
  }
}

export default Client;
