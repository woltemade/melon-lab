// @flow
import tokenInfo from '@melonproject/protocol/utils/info/tokenInfo';
import getVersionContract from '../contracts/getVersionContract';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import getExchangeAdapterContract from '../../exchange/contracts/getExchangeAdapterContract';
import getSimpleMarketContract from '../../exchange/contracts/getSimpleMarketContract';
import getWhiteListedAssets from '../../assets/utils/getWhiteListedAssets';

import type { Address } from '../../assets/schemas/Address';
import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Asset config
 */
type AssetConfig = {
  address: Address,
  symbol: TokenSymbol,
  name: string,
  decimal: number,
  url: string,
};

/**
 * Config retrieved from the version
 */
export type Config = {
  versionAddress: Address,
  dataFeedAddress: Address,
  exchangeAdapterAddress: Address,
  referenceAsset: TokenSymbol,
  assets: Array<AssetConfig>,
};

let config: Config;

/**
 * Get config from deployed version contract
 */
const getConfig = async (environment): Promise<Config> => {
  if (config) return config;

  config = {
    versionAddress: (await getVersionContract(environment)).address,
    dataFeedAddress: (await getPriceFeedContract(environment)).address,
    exchangeAdapterAddress: (await getExchangeAdapterContract(environment))
      .address,
    simpleMarketAddress: (await getSimpleMarketContract(environment)).address,
    referenceAsset: 'MLN-T',
    assets: await getWhiteListedAssets(environment, 'kovan'),
  };
  return config;
};

export default getConfig;
