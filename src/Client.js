export const stringify = query => (
  encodeURI(Object.keys(query).reduce((accum, key, index) => (
    `${accum}${index === 0 ? "" : "&"}${key}=${query[key]}`
  ), "?"))
);

const fetch = uri => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.status >= 200 && xhr.status < 300) {
      resolve(JSON.parse(xhr.responseText));
    } else {
      reject(new Error(xhr.responseText));
    }
  };

  xhr.open("GET", uri);
  xhr.send();
});

class Client {
  constructor(options = {}) {
    this.base = options.base || "https://api.tenor.com/v1";
    this.token = options.token || "LIVDSRZULELA";
    this.defaultResults = options.defaultResults || false;
  }

  autocomplete(search) {
    return fetch(`${this.base}/autocomplete${this.autocompleteQueryFor(search)}`)
      .then(({ results }) => results[0]);
  }

  search(search, params = {}) {
    let searchQuery = `${this.base}/search${this.searchQueryFor(search, params)}`;

    if (this.defaultResults && !search) {
      searchQuery = `${this.base}/trending${this.searchQueryFor(search, params)}`;
    }

    return fetch(searchQuery);
  }

  suggestions(search) {
    return fetch(`${this.base}/search_suggestions${this.suggestionsQueryFor(search)}`)
      .then(({ results }) => results);
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
