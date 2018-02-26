// @flow
import addressBook from '@melonproject/protocol/addressBook.json';
import exchangeInfo from '@melonproject/protocol/utils/info/exchangeInfo.js';

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
    complianceAddress: addressBook[network].OnlyManager,
    exchangeAdapterAddress: addressBook[network].SimpleAdapter,
    exchangeAddress: exchangeInfo[network][0].address,
    priceFeedAddress: addressBook[network].PriceFeed,
    rankingAddress: addressBook[network].FundRanking,
    riskManagementAddress: addressBook[network].RMMakeOrders,
    versionAddress: addressBook[network].Version,
  };

  // HACK: Define config first so that inside these next async functions,
  // getConfig() already returns the addresses to avoid an infinite loop
  config.assets = await getWhiteListedAssets(environment, network);
  config.nativeAssetSymbol = await getNativeAssetSymbol(environment);
  config.quoteAssetSymbol = await getQuoteAssetSymbol(environment);

  return config;
};

export default getConfig;
