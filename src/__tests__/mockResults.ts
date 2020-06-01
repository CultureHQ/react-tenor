import * as TenorAPI from "../TenorAPI";

let counter = 0;

const makeId = () => {
  counter += 1;
  return counter.toString();
};

const makeResult = (): TenorAPI.Result => {
  const media = {
    preview: "https://via.placeholder.com/10x10",
    url: "https://via.placeholder.com/10x10",
    dims: [10, 10],
    size: 100
  };

  return {
    created: 12345,
    hasaudio: false,
    id: makeId(),
    media: [{ tinygif: media, gif: media, mp4: media }],
    tags: [],
    itemurl: "https://tenor.com/view/this-is-a-test-gif-12345",
    hascaption: false,
    url: "https://tenor.com/12345"
  };
};

const mockResults = { /* eslint-disable camelcase */
  autocomplete: ["test", "testing", "test2", "testingtesting", "testy testerson"],
  search_suggestions: ["test", "unit test", "acceptance test", "testing", "how to test"],
  search: [makeResult(), makeResult(), makeResult(), makeResult(), makeResult()]
};

export default mockResults;
