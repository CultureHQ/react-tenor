type MediaType = { url: string };
type Media = { tinygif: MediaType };

export type Result = {
  id: string;
  itemurl: string;
  media: Media[];
};

export type AutocompleteResponse = {
  results: string[];
};

export type SearchResponse = {
  next?: number;
  results: Result[];
};

export type SuggestionsResponse = {
  results: string[];
};
