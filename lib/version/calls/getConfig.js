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
const getConfig = async (): Promise<Config> => {
  const config: Config = {
    versionAddress: (await getVersionContract()).address,
    dataFeedAddress: (await getPriceFeedContract()).address,
    exchangeAdapterAddress: (await getExchangeAdapterContract()).address,
    simpleMarketAddress: (await getSimpleMarketContract()).address,
    referenceAsset: 'MLN-T',
    assets: tokenInfo.kovan,
  };

  // const datafeedContract = api.newContract(DatafeedAbi, config.dataFeedAddress);

  // const referenceAssetAddress = await datafeedContract.instance.getQuoteAsset.call();
  // config.referenceAsset = getSymbol(referenceAssetAddress);

  // const numOfRegisteredAssets = await datafeedContract.instance.numRegisteredAssets.call();
  // const assets = new Array(numOfRegisteredAssets.toNumber()).fill({});

  // config.assets = await Promise.all(
  //   assets.map(async (asset, i) => {
  //     const address = await datafeedContract.instance.getRegisteredAssetAt.call(
  //       {},
  //       [i],
  //     );
  //     const assetData = await datafeedContract.instance.information.call({}, [
  //       address,
  //     ]);
  //     return {
  //       address,
  //       symbol: assetData[0],
  //       name: assetData[1],
  //       decimal: assetData[2].toNumber(),
  //       url: assetData[3],
  //     };
  //   }),
  // );

  return config;
};

export default cacheAwait(getConfig);
