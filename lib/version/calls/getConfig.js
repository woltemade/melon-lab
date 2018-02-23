// @flow
import addressBook from '@melonproject/protocol/addressBook.json';

import getNativeAssetSymbol from './getNativeAssetSymbol';
import getNetwork from '../../utils/environment/getNetwork';
import getQuoteAssetSymbol from '../../pricefeeds/calls/getQuoteAssetSymbol';
import getWhiteListedAssets from '../../assets/utils/getWhiteListedAssets';

import type { Address } from '../../assets/schemas/Address';
import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Asset config
 */
export type AssetConfig = {
  address: Address,
  decimal: number,
  name: string,
  symbol: TokenSymbol,
  url: string,
};

/**
 * Config retrieved from the version
 */
export type Config = {
  assets: Array<AssetConfig>,
  complianceAddress: Address,
  exchangeAdapterAddress: Address,
  exchangeAddress: Address,
  nativeAssetSymbol: TokenSymbol,
  priceFeedAddress: Address,
  quoteAssetSymbol: TokenSymbol,
  rankingAddress: Address,
  riskManagementAddress: Address,
  versionAddress: Address,
};

let config: Config;

/**
 * Get config from deployed version contract
 */
const getConfig = async (environment): Promise<Config> => {
  if (config) return config;

  const network = await getNetwork(environment);

  config = {
    assets: await getWhiteListedAssets(environment, network),
    complianceAddress: addressBook[network].OnlyManager,
    exchangeAdapterAddress: addressBook[network].SimpleAdapter,
    exchangeAddress: addressBook[network].MatchingMarket,
    nativeAssetSymbol: await getNativeAssetSymbol(environment),
    priceFeedAddress: addressBook[network].PriceFeed,
    quoteAssetSymbol: await getQuoteAssetSymbol(environment),
    rankingAddress: addressBook[network].FundRanking,
    riskManagementAddress: addressBook[network].RMMakeOrders,
    versionAddress: addressBook[network].Version,
  };

  return config;
};

export default getConfig;
