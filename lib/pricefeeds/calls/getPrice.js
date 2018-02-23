// @flow
import BigNumber from 'bignumber.js';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getPriceFeedContract from '../contracts/getPriceFeedContract';
import getQuoteAssetSymbol from './getQuoteAssetSymbol';
import toReadable from '../../assets/utils/toReadable';

import type { Environment } from '../../utils/environment/Environment';
import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Gets price of `tokenSymbol` against MLN-T
 */
const getPrice = async (
  environment: Environment,
  tokenSymbol: TokenSymbol,
): BigNumber => {
  const config = await getConfig(environment);
  const dataFeedContract = await getPriceFeedContract(environment);
  const assetAddress = getAddress(config, tokenSymbol);
  const quoteAssetSymbol = await getQuoteAssetSymbol(environment);

  const price: BigNumber = await dataFeedContract.instance.getPrice.call({}, [
    assetAddress,
  ]);
  return toReadable(config, price[1], quoteAssetSymbol);
};

export default getPrice;
