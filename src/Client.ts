import * as TenorAPI from "./TenorAPI";

type Query = {
  [key: string]: string | number | undefined;
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

const fetch = <T extends object>(base: string, path: string, query: Query): Promise<T> => (
  new Promise((resolve, reject) => {
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
  })
);

type ClientOptions = {
  base?: string;
  token?: string;
  defaultResults?: boolean;
};

class Client { /* eslint-disable @typescript-eslint/camelcase */
  private base: string;

  private token: string;

  private defaultResults: boolean;

  constructor({ base, token, defaultResults }: ClientOptions) {
    this.base = base || "https://api.tenor.com/v1";
    this.token = token || "LIVDSRZULELA";
    this.defaultResults = defaultResults || false;
  }

  autocomplete(search: string) {
    return fetch<TenorAPI.AutocompleteResponse>(this.base, "/autocomplete", {
      key: this.token,
      q: search,
      limit: 1,
      locale: "en_US"
    });
  }

  search(search: string, pos?: number) {
    const searchQuery = (this.defaultResults && !search) ? "/trending" : "/search";

    return fetch<TenorAPI.SearchResponse>(this.base, searchQuery, {
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
    return fetch<TenorAPI.SuggestionsResponse>(this.base, "/search_suggestions", {
      key: this.token,
      q: search,
      limit: 5,
      locale: "en_US"
    });
  }
}

export default Client;
