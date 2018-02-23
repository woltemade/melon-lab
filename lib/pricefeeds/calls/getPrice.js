// @flow
import BigNumber from 'bignumber.js';
import getPriceFeedContract from '../contracts/getPriceFeedContract';
import getAddress from '../../assets/utils/getAddress';
import toReadable from '../../assets/utils/toReadable';
import getQuoteAssetSymbol from './getQuoteAssetSymbol';

import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Gets price of `tokenSymbol` against MLN-T
 */
const getPrice = async (environment, tokenSymbol: TokenSymbol): BigNumber => {
  const dataFeedContract = await getPriceFeedContract(environment);
  const assetAddress = getAddress(tokenSymbol);
  const quoteAssetSymbol = await getQuoteAssetSymbol(environment);

  const price: BigNumber = await dataFeedContract.instance.getPrice.call({}, [
    assetAddress,
  ]);
  return toReadable(price[1], quoteAssetSymbol);
};

export default getPrice;
