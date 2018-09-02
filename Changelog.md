# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2018-09-03
### Added
- You can define parser option in the configuration file

### Fixed
- Potential loop if the output file was in the watched folder

## [0.1.1] - 2018-09-02
### Changed
- Publish v0.1.0 under v0.1.1 (v0.1.0 was already published due to a mistake)

## [0.1.0] - 2018-09-02
### Added
- Table style

### Fixed
- Parsing was breaking with multiple delimiters

### Changed
- Create a parsers folder and refactored the parsing
- Reads the version from package.json
- Upgrade packages
- Switch unit tests to ava
