#Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [unreleased]

### Changed

* Breaking: getParityProvider is now async and tries to connect to local node first
* onBlock does not query the blocknumber anymore. See ipfs-frontend#212

## [0.6.37]

### Changed

* Use new datafeed.hasRecentPrice in onBlock instead of isValid
* walkLib ' instead of "

### Fixed

* Changed promise detection in resolvePromiseObject to fix Firefox Bug: melonproject/ipfs-frontend#116
* Catch last order from new fund --> Added isValidId helper

## [0.6.0]

### Refactored

### Added

* sendTransaction function
* constructTransactionObject function
* getPastEvents (unused as of now; prepared it for later)
* getRankingContract function
* getRanking function
* createWallet function
* importWallet function
* signTermsAndConditions function
* parity and wallet folder in utils folder
* getParityProvider function
* getHoldingsAndPrices function
* getOpenOrders
* isRedeemRequestPermittedAndAllowed
* isSubscribeRequestPermittedAndAllowed
* isMakePermitted
* isTakePermitted

### Changed

* Switch from web3 to parity.js (parityfy all transactions/calls to the contracts)
* gasBoost function adjusted to parity.js
* getRecentTrades for an asset pair and getFundRecentTrades, using rpc call getLogs
* awaitDataFeedUpdate -used only for integration test
* Upgrade to protocol v0.5.2-alpha.1
* [labeling] Renamed 'creationDate' and 'timestamp' in setupFund an getFundInformations to 'inception'
* [labeling] Renamed 'timestamp' in convertUnclaimedRewards to 'date'
* [labeling] Harmonized in subscribe/redeem from atTimeStamp/atTimeStamp to timestamp
* onBlock function adjusted to parity.js
* getFundInformations also returns owner
* Pass in decrypted wallet instance as first argument to ALL functions performing an on-chain transaction
* Integrate protocol 0.6.2-deploy.9

### Removed

* depositAndApproveEther
* filterByAssetPair
* sortByPrice

### Deprecated

* "from" argument in functions; now uses wallet.address

### Fixed

* #69
* #76
* #86
* #87
* #89
* #90
* #91
* #92
* #94
* #113
* #129
* #130
* #131

## [0.3.5]

### Refactored

* Refactored /utils folder into subfolders: generic, ethereum and constants

### Added

* getWeb3 functionality
* onBlock function to query some status everyblock
* .eslintignore file instead of --ignore-path --> Ignores docs/
* Documentation.js build command: `npm run docs`
* Adding flow types & jsdocs to all library functions
* Retrieve all assets from Datafeed contract in getConfig
* Toggle Subscription and Toggle Redemption
* ConvertUnclaimedRewards
* shutDownFund

### Changed

* Renamed and refactored getNetworkName
* takeMultipleOrdersFromFund return value changed to remainingQuantity only
* Integrate protocol@0.3.8-alpha.5
* getFundById and getFundByManager
* Refactor getOrderbook
* Fix get recent trades / fund recent trades

### Deprecated

* awaitDataFeedUpdates
* depositAndApproveEther (needs more investigation)

### Fixed

* Fix #61
* Fix #60

## [0.3.2]

### Added

* getRecentTrades
* getFundRecentTrades

### Changed

* Integrate protocol@0.3.6-alpha.6
