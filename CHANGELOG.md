# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/enteocode/artic/compare/v2.0.0...v2.1.0) (2025-04-03)


### Features

* **health:** added health-check for testing node status ([3cf74c3](https://github.com/enteocode/artic/commit/3cf74c3638306238418c90c4e958da6429783573))


### Bug Fixes

* **artwork:** fixed cache injection ([c79c516](https://github.com/enteocode/artic/commit/c79c5166179e007c000a4fd9611dbeb9dc9a6832))
* **auth:** fixed public route validation ([c364dc1](https://github.com/enteocode/artic/commit/c364dc12057027ae7843523e147aebab44546b24))

## [2.0.0](https://github.com/enteocode/icf/compare/v1.0.0...v2.0.0) (2025-03-30)


### ⚠ BREAKING CHANGES

* upgraded dependencies to eliminate security and performance issues

### Features

* **auth:** added Token invalidation (distributed) ([670c733](https://github.com/enteocode/icf/commit/670c73377d3c9318cdc2abd2503f9710dc588e91))
* **cache:** added CacheModule according to latest NestJS standard ([69fa1c0](https://github.com/enteocode/icf/commit/69fa1c0aa64132db609e140bb0926843fb6a9daa))
* **openapi:** added OpenAPI documentation ([6a5b76f](https://github.com/enteocode/icf/commit/6a5b76f7e8ec48085b12b2ddeb9a5625892948fa))


### Bug Fixes

* **artwork:** fixed schema ([d7c9894](https://github.com/enteocode/icf/commit/d7c9894d7ed384718dd937ff5ac09e8f45f9da13))
* **artwork:** fixed service (HttpModule, CacheModule) ([5c6a307](https://github.com/enteocode/icf/commit/5c6a30739c437f59e5d784c6f125859c3d33ec7f))
* **auth:** added extra layer of security (GDPR, KeyID) ([f8dfd0e](https://github.com/enteocode/icf/commit/f8dfd0e16412cdf85f6c5d2828db60d3bc7648b1))
* **auth:** fixed cookie authority path ([9c7316c](https://github.com/enteocode/icf/commit/9c7316c1500c928b724367b7e29b1de9c6432e86))
* **auth:** fixed token persistence on response ([d397fd4](https://github.com/enteocode/icf/commit/d397fd41be9fb9c6e835c34881e26209274aa213))
* **auth:** removed email address from JWT token to increase security and match GDPR standard ([09cfd84](https://github.com/enteocode/icf/commit/09cfd8417ca1a2dc37e881d5fa172a28349ea401))
* **favorite:** fixed response schema to increase API endpoint predictability ([ba1d0e6](https://github.com/enteocode/icf/commit/ba1d0e6de1994097e1659aa8e94e07a655d27c34))
* **uuid:** added Uuid type ([f30c4a0](https://github.com/enteocode/icf/commit/f30c4a05178f847b2c411636bf9c9a00283903d3))


### Style

* changed indentation to 4-spaces to increase readability ([80b9776](https://github.com/enteocode/icf/commit/80b9776372b3d9d2a4fea1310d721ca6889cfff1))


### Setup

* added `.env` based environment variables ([2bfeae9](https://github.com/enteocode/icf/commit/2bfeae902ac367c51ee160dbb753f6623ede8bfe))
* added ClassSerializerInterceptor ([46ce5b9](https://github.com/enteocode/icf/commit/46ce5b957a81cfa486c665276c3cc714c5fa9deb))
* upgraded dependencies to eliminate security and performance issues ([99116c1](https://github.com/enteocode/icf/commit/99116c18b011b20517f56543b44d26ecb239a09c))


### Docs

* updated documentation according to new features ([4d1295e](https://github.com/enteocode/icf/commit/4d1295e01843a6a46aaa94bc3a6c2f57ec240439))

## 1.0.0 (2022-10-21)


### Features

* **artwork:** added module ([b1dc29a](https://github.com/enteocode/icf/commit/b1dc29a35664db71a3808fb84e7a88b25013712b))
* **auth:** added module ([5e23f72](https://github.com/enteocode/icf/commit/5e23f72e4a8178b0297e66270d16114427c92de8))
* **cache:** added Redis cache ([367c62d](https://github.com/enteocode/icf/commit/367c62dae77a553ff1ee79cf9933fa75459fd88d))
* **favorite:** added module ([03e7f40](https://github.com/enteocode/icf/commit/03e7f400c1950975c88bb14dccf562d2a42052c9))


### Bug Fixes

* **docker:** fixed development environment ([855d913](https://github.com/enteocode/icf/commit/855d913e88caa42b088c8dc6e3c6bfc22716caa8))
* **docker:** fixed init script for `PRODUCTION` environment ([c99c43a](https://github.com/enteocode/icf/commit/c99c43a802e82952cbf96706fec652e219feaea6))
* **docker:** fixed process for `PRODUCTION` environment ([1cfc78d](https://github.com/enteocode/icf/commit/1cfc78d00d5bca8026132d4dbdd22c62cad73b20))


### Style

* fixed code style according to Prettier configuration ([6d1ece8](https://github.com/enteocode/icf/commit/6d1ece8244e655bf90a30eb0fbcaff906976a004))


### Docs

* added API endpoints to the documentation ([75d1266](https://github.com/enteocode/icf/commit/75d1266d035c3a8de7c0cdb6984067c3458a9589))
