type Query = {
  [key: string]: string | number | undefined
};

export const stringify = (query: Query) => {
  const keyValuePairs: string[] = [];

  Object.keys(query).forEach(key => {
    if (query[key] !== undefined) {
      keyValuePairs.push(`${key}=${query[key]}`);
    }
  });

  return encodeURI(`?${keyValuePairs.join("&")}`);
};

const fetch = (base: string, path: string, query: Query) => new Promise((resolve, reject) => {
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

type ClientOptions = {
  base: string | null;
  token: string | null;
  defaultResults?: boolean;
};

class Client {
  private base: string;
  private token: string;
  private defaultResults: boolean;

  constructor({ base, token, defaultResults }: ClientOptions) {
    this.base = base || "https://api.tenor.com/v1";
    this.token = token || "LIVDSRZULELA";
    this.defaultResults = defaultResults || false;
  }

  autocomplete(search: string) {
    return fetch(this.base, "/autocomplete", {
      key: this.token,
      q: search,
      limit: 1,
      locale: "en_US"
    });
  }

  search(search: string, pos = undefined) {
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

  suggestions(search: string) {
    return fetch(this.base, "/search_suggestions", {
      key: this.token,
      q: search,
      limit: 5,
      locale: "en_US"
    });
  }
}

export default Client;
