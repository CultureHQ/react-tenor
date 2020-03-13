# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.2.0] - 2020-03-13

### Added

- The `limit` prop to support setting how many results to return.

## [2.1.1] - 2019-09-23

### Changed

- Correctly pass down the `searchPlaceholder` prop.

## [2.1.0] - 2019-09-19

### Added

- The `searchPlaceholder` prop for configuring the placeholder on the search input.

## [2.0.0] - 2019-09-13

### Changed

- Renamed the `safesearch` param on the component to `contentFilter`.

## [1.5.0] - 2019-09-12

### Added

- The `locale`, `mediaFilter`, and `safesearch` props.

### Changed

- Switch to TypeScript for development.
- Do not fire off autocomplete and suggestion requests when the search is blank but you have `defaultResults` selected.

## [1.4.0] - 2019-08-09

### Added

- The `autoFocus` prop to focus on the input when the component mounts.
- The `defaultResults` prop to display trending results in empty search.

### Changed

- No longer rely on `fetch` being available.
- [INTERNAL] Refactor Client.js to be simpler.
- Ensure `pointer` cursor on pagination controls.
- Align typeahead text with current text.

## [1.3.2] - 2019-06-07

### Changed

- Use the `prepublishOnly` npm script so that the `dist` directory does not need to be checked into the repository.

## [1.3.1] - 2019-06-07

### Changed

- Properly rebuild dist.

## [1.3.0] - 2019-06-06

### Added

- The `initialSearch` prop.

## [1.2.1] - 2019-06-05

### Changed

- Rebuilt dist with correct capitalization of file names.

## [1.2.0] - 2019-05-22

### Added

- Switched to using `@culturehq/scripts` for development.
- Added `:focus` styles for relevant components for better keyboard support.

## [1.1.0] - 2018-10-03

### Added

- Type ahead through the use of Tenor's autocomplete feature.
- Suggestions are now rendered through the user of Tenor's suggestions feature.
- Pagination is now supported. Additionally you can use the meta-key plus left arrow and right arrow to go between pages.

### Changed

- Now encoding the URI being sent to tenor to ensure it's a valid URL.
- If you click outside the component, the component now knows about that click and closes the selector.
- The search bar is now of type "search" which builds in some nicities from the browsers that support it.
- Added better accessibility support by properly naming the GIF buttons.
- Load preview GIFs in the background and then set them to fade in once they are loaded.

## [1.0.0] - 2018-09-26

### Added

- The optional `contentRef` prop to get access to the actual div that is being rendered.
- The optional `base` prop that will specify the base of the API for the search URLs that are generated.
- The `focus()` function on the main component to allow consumers to focus into the input field.

### Changed

- Removed the style import by default. It's now up to the consumers of this package to import `react-tenor/dist/styles.css` into their applications. This avoids a lot of weird webpack bugs.

## [0.2.0] - 2018-07-18

### Changed

- Don't build the final distribution with `webpack`, just use `babel`.
- Rename `example` to `docs` so we can publish to github pages.

[unreleased]: https://github.com/CultureHQ/react-tenor/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/CultureHQ/react-tenor/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/CultureHQ/react-tenor/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/CultureHQ/react-tenor/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/CultureHQ/react-tenor/compare/v1.5.0...v2.0.0
[1.5.0]: https://github.com/CultureHQ/react-tenor/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/CultureHQ/react-tenor/compare/v1.3.2...v1.4.0
[1.3.2]: https://github.com/CultureHQ/react-tenor/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/CultureHQ/react-tenor/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/CultureHQ/react-tenor/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/CultureHQ/react-tenor/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/CultureHQ/react-tenor/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/CultureHQ/react-tenor/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/CultureHQ/react-tenor/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/CultureHQ/react-tenor/compare/2d68b4...v0.2.0
