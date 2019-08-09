# react-tenor

[![Package Version](https://img.shields.io/npm/v/react-tenor.svg)](https://www.npmjs.com/package/react-tenor)

A React component for selected GIFs from [Tenor](https://tenor.com/gifapi).

## Getting started

First, add `react-tenor` to your `package.json` `dependencies`, then install using either `npm install` or `yarn install`. Then, get your API key from tenor. Finally, you can add the selector component by adding:

```jsx
<Tenor token="your-token-here" onSelect={result => console.log(result)} />
```

To get the styles, be sure it import `react-tenor/dist/styles.css` into your application. You can style it appropriately for your app by overriding the CSS classes used internally. They are listed in [`styles.css`](src/styles.css).

### `base`

If you need to change the API endpoint that this component hits, you can set the `base` prop on the component to a valid URL.

### `contentRef`

If you need access to the actual `div` that `Tenor` renders, you can pass any valid `React` ref to the `contentRef` prop.

### `initialSearch`

If you want the search bar to start pre-populated with a specific value, you can pass an `initialSearch` prop.

### `defaultResults`

If you need to show trending results in an initial rendering without any initialSearch, you can pass `defaultResults` prop.

### `focus()`

The `Tenor` component has a `focus()` member function that can be called to request focus be placed on the search input.

## Testing locally

You can run the tests by running `yarn test` and lint by running `yarn lint`. You can run the local server by running `yarn start` which will start the docs server on `http://localhost:8080`.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/CultureHQ/react-tenor.

## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
