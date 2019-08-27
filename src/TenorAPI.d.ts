declare namespace TenorAPI {
  type MediaType = { url: string };
  type Media = { tinygif: MediaType };

  type Result = {
    id: string;
    itemurl: string;
    media: Media[]
  };

  type AutocompleteResponse = {
    results: string[];
  };

  type SearchResponse = {
    next?: number;
    results: Result[];
  };

  type SuggestionsResponse ={
    results: string[];
  };
}

export = TenorAPI;
