# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[unreleased]: https://github.com/CultureHQ/react-tenor/compare/v1.3.1...HEAD
[1.3.1]: https://github.com/CultureHQ/react-tenor/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/CultureHQ/react-tenor/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/CultureHQ/react-tenor/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/CultureHQ/react-tenor/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/CultureHQ/react-tenor/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/CultureHQ/react-tenor/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/CultureHQ/react-tenor/compare/2d68b4...v0.2.0
