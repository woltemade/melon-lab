// @flow
import Api from '@parity/api';

import DatafeedAbi from '../../../abi/DataFeed.json';
import cacheAwait from '../../utils/generic/cacheAwait';
import getVersionContract from '../contracts/getVersionContract';

import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import getExchangeAdapterContract from '../../exchange/contracts/getExchangeAdapterContract';
import getSimpleMarketContract from '../../exchange/contracts/getSimpleMarketContract';

import getSymbol from '../../assets/utils/getSymbol';

import setup from '../../utils/setup';
import tokenInfo from '../../assets/utils/tokenInfo';
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
  sphereAddress: Address,
  dataFeedAddress: Address,
  exchangeAddress: Address,
  referenceAsset: TokenSymbol,
  assets: Array<AssetConfig>,
};

/**
 * Get config from deployed version contract
 */
const getConfig = async (environment): Promise<Config> => {
  const config: Config = {
    versionAddress: (await getVersionContract(environment)).address,
    dataFeedAddress: (await getPriceFeedContract(environment)).address,
    exchangeAdapterAddress: (await getExchangeAdapterContract(environment))
      .address,
    simpleMarketAddress: (await getSimpleMarketContract(environment)).address,
    referenceAsset: 'MLN-T',
    assets: tokenInfo.kovan,
  };
  return config;
};

export default cacheAwait(getConfig);
