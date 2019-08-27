declare namespace TenorAPI {
  type MediaType = { url: string };
  type Media = { tinygif: MediaType };

  type Result = {
    itemurl: string;
    media: Media[]
  };
}

export = TenorAPI;
