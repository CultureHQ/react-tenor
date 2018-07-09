# react-tenor

[![Build Status](https://travis-ci.com/CultureHQ/react-tenor.svg?branch=master)](https://travis-ci.com/CultureHQ/react-tenor)

A React component for selected GIFs from [Tenor](https://tenor.com/gifapi).

## Getting started

First, add `react-tenor` to your `package.json` `dependencies`, then install using either `npm install` or `yarn install`. Then, get your API key from tenor. Finally, you can add the selector component by adding:

```jsx
<Tenor token="your-token-here" onSelect={result => console.log(result)} />
```

You can style it appropriately for your app by overriding the CSS classes used internally. They are listed in [`styles.css`](src/styles.css).

## Running with node

This package uses the `isomorphic-fetch` package to allow `fetch` to be used when running in the `node` environment, but only in development. In production, it assumes `global.fetch` is already in place from either the browser or a polyfill of your choice.

## Testing locally

You can run the tests by running `yarn test` and lint by running `yarn lint`. You can run the local server by running `TOKEN=your-token-here yarn start` which will start the example server on `http://localhost:8080`.
