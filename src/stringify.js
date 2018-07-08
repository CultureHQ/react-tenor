const stringifyQuery = query => (
  Object.keys(query).reduce((accum, key, index) => (
    `${accum}${index === 0 ? "" : "&"}${key}=${query[key]}`
  ), "?")
);

export default stringifyQuery;
