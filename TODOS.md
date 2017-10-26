This is only a temporary file to collect todos which will be converted to 
issues.

- [ ] Replace tokenInfo with actual Melon protocol lookup
  - [ ] Use new token info in getSymbol. Avoid duplicated code 
        with getTokenInfo
- [ ] Remove awaitDataFeedUpdates in favor of tracker based solution
- [ ] Flow types for
  - [X] Order
  - [ ] Config
  - [X] Trade
- [ ] Specify the number of get(Fund)RecentTrades by number of trades instead of recent days
- [ ] Enhance orders already in getOrder with price and type
- [ ] ensure variable name consistency.
  - [ ] tokenSymbol instead of symbol and with type TokenSymbol
- [ ] Harmonise trade schema getRecentTrades and getFundRecentTrades
- [ ] check if FilterByAssetPair is still used. If not, remove it. If yes -> extract ownerOrDameon in own query.
- [ ] Find solution for types TokenSymbol / Address
  - Make it incompatible with "string"
  - Specify length and even regex?
- [ ] Check and remove depositAndApproveEther from makeOrder.js
- [ ] Request schema for fund
- [ ] convertUnclaimedRewards --> Timestamp as date, check other params
- [ ] depositAndApproveEther: Is this function still needed? If yes, change tokenAddress to tokenSymbol
- [ ] Harmonize subscribe/redeem types. Especially atTimeStamp vs atTimestamp
- [ ] Remove daemonAddress from setup
- [ ] Transform timestamp in setupFund into date
