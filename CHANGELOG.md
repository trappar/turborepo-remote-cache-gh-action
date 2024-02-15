# Changelog

All notable changes to this project will be documented in this file.

## V2

### BREAKING
- Changed the `host` input from including `http://` to not including it. Default value changed from `http://127.0.0.1` to `0.0.0.0`.

### Changed
- Updated dependencies including turborepo-remote-cache (1.13.0 -> 2.0.8)
- Migrated from Typescript to Javascript (it just wasn't worth it)
- Updated action to run on node 20

### Fixed
- Updated `action.yml` to indicate that `storage-provider` and `storage-path` are required inputs. They were always required by the code.

## V1

### Added
- Initial release