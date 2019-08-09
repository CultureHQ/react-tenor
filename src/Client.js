export const stringify = query => (
  encodeURI(Object.keys(query).reduce((accum, key, index) => (
    `${accum}${index === 0 ? "" : "&"}${key}=${query[key]}`
  ), "?"))
);

const fetch = (base, path, query) => new Promise((resolve, reject) => {
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

  xhr.open("GET", `${base}${path}${stringify(query)}`);
  xhr.send();
});

class Client {
  constructor(options = {}) {
    this.base = options.base || "https://api.tenor.com/v1";
    this.token = options.token || "LIVDSRZULELA";
    this.defaultResults = options.defaultResults || false;
  }

  autocomplete(search) {
    return fetch(this.base, "/autocomplete", {
      key: this.token,
      q: search,
      limit: 1,
      locale: "en_US"
    });
  }

  search(search, pos = null) {
    const searchQuery = (this.defaultResults && !search) ? "/trending" : "/search";

    return fetch(this.base, searchQuery, {
      key: this.token,
      q: search,
      limit: 12,
      locale: "en_US",
      safesearch: "mild",
      media_filter: "minimal",
      ar_range: "all",
      pos
    });
  }

  suggestions(search) {
    return fetch(this.base, "/search_suggestions", {
      key: this.token,
      q: search,
      limit: 5,
      locale: "en_US"
    });
  }
}

export default Client;
