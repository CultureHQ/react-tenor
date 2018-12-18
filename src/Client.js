export const stringify = query => (
  encodeURI(Object.keys(query).reduce((accum, key, index) => (
    `${accum}${index === 0 ? "" : "&"}${key}=${query[key]}`
  ), "?"))
);

class Client {
  constructor(options = {}) {
    this.base = options.base || "https://api.tenor.com/v1";
    this.token = options.token || "LIVDSRZULELA";
  }

  autocomplete(search) {
    return fetch(`${this.base}/autocomplete${this.autocompleteQueryFor(search)}`)
      .then(response => response.json()).then(({ results }) => results[0]);
  }

  search(search, params = {}) {
    return fetch(`${this.base}/search${this.searchQueryFor(search, params)}`)
      .then(response => response.json());
  }

  suggestions(search) {
    return fetch(`${this.base}/search_suggestions${this.suggestionsQueryFor(search)}`)
      .then(response => response.json()).then(({ results }) => results);
  }

  autocompleteQueryFor(search) {
    return stringify({
      key: this.token,
      q: search,
      limit: 1,
      locale: "en_US"
    });
  }

  searchQueryFor(search, params) {
    return stringify(Object.assign({}, {
      key: this.token,
      q: search,
      limit: 12,
      locale: "en_US",
      safesearch: "mild",
      media_filter: "minimal",
      ar_range: "all"
    }, params));
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
