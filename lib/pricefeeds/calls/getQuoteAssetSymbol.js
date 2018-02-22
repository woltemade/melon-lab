// @flow
import getPriceFeedContract from '../contracts/getPriceFeedContract';
import getSymbol from '../../assets/utils/getSymbol';

import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Gets the quote asset of the current PriceFeed
 */
const getQuoteAssetSymbol = async (environment): Promise<TokenSymbol> => {
  const dataFeedContract = await getPriceFeedContract(environment);

  const address = await dataFeedContract.instance.getQuoteAsset.call();

  return getSymbol(address);
};

export default getQuoteAssetSymbol;
