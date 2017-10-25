#Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]
### Added
- .eslintignore file instead of --ignore-path --> Ignores docs/
- Documentation.js build command: `npm run docs`
- Adding flow types & jsdocs to all library functions
- Retrieve all assets from Datafeed contract in getConfig
- Toggle Subscription and Toggle Redemption
- ConvertUnclaimedRewards
- shutDownFund

### Changed
- Integrate protocol@0.3.8-alpha.5
- getFundById and getFundByManager
- Refactor getOrderbook
- Fix get recent trades / fund recent trades

### Fixed
- Fix #61
- Fix #60

## [0.3.2]

### Added
- getRecentTrades
- getFundRecentTrades

### Changed
- Integrate protocol@0.3.6-alpha.6
