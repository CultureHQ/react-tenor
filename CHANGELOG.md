# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2018-09-26
### Added
- The optional `contentRef` prop to get access to the actual div that is being rendered.
- The optional `base` prop that will specify the base of the API for the search URLs that are generated.

### Changed
- Removed the style import by default. It's now up to the consumers of this package to import `react-tenor/dist/styles.css` into their applications. This avoids a lot of weird webpack bugs.

## [0.2.0] - 2018-07-18
### Changed
- Don't build the final distribution with `webpack`, just use `babel`.
- Rename `example` to `docs` so we can publish to github pages.

[Unreleased]: https://github.com/CultureHQ/components/compare/v0.2.0...HEAD
[0.0.2]: https://github.com/CultureHQ/components/compare/v0.1.0...v0.2.0
