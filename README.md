# react-tenor

[![Build Status](https://github.com/CultureHQ/react-tenor/workflows/Push/badge.svg)](https://github.com/CultureHQ/react-tenor/actions)
[![Package Version](https://img.shields.io/npm/v/react-tenor.svg)](https://www.npmjs.com/package/react-tenor)

A React component for selected GIFs from [Tenor](https://tenor.com/gifapi).

## Getting started

First, add `react-tenor` to your `package.json` `dependencies`, then install using either `npm install` or `yarn install`. Then, get your API key from tenor. Finally, you can add the selector component by adding:

```jsx
<Tenor token="your-token-here" onSelect={result => console.log(result)} />
```

### Styles

To get the styles, be sure it import `react-tenor/dist/styles.css` into your application. You can style it appropriately for your app by overriding the CSS classes used internally. They are listed in [`styles.css`](src/styles.css).

### Props

Below is a list of all of the props you can pass to the `Tenor` component.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `autoFocus` | `boolean` | `false` | Indicates that the search bar of the component should request focus when it first mounts. |
| `base` | `string` | `"api.tenor.com/v1"` | The base of the API that this component hits. |
| `contentRef` | `Ref` | `null` | A ref to the `div` that the `Tenor` component renders. |
| `defaultResults` | `boolean` | `false` | Indicates that the component should automatically search for trending results if the search input is empty. |
| `initialSearch` | `string` | `""`  | The starting value of the search bar. |
| `locale` | `string` | `"en_US"` | The locale that gets passed up to tenor. See the [tenor API docs](https://tenor.com/gifapi/documentation) for details. |
| `mediaFilter` | `string` | `"minimal"`  | The media filter that gets passed up to tenor. See the [tenor API docs](https://tenor.com/gifapi/documentation) for details. |
| `onSelect` | `Result => void` | | A callback for when the user selects a GIF. |
| `safesearch` | `string` | `"mild"` | The safe search that gets passed up to tenor. See the [tenor API docs](https://tenor.com/gifapi/documentation) for details. |
| `token` | `string` | | The tenor API token. See the [tenor API docs](https://tenor.com/gifapi/documentation) for details. |

### Functions

The `Tenor` component additionally has a `focus()` member function that can be called to request focus be placed on the search input.

## Testing locally

You can run the tests by running `yarn test` and lint by running `yarn lint`. You can run the local server by running `yarn start` which will start the docs server on `http://localhost:8080`.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/CultureHQ/react-tenor.

## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
