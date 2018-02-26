// @flow
import getPriceFeedContract from '../contracts/getPriceFeedContract';
import getSymbol from '../../assets/utils/getSymbol';
import getConfig from '../../version/calls/getConfig';

import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';
import type { Environment } from '../../utils/environment/Environment';

/**
 * Gets the quote asset of the current PriceFeed
 */
const getQuoteAssetSymbol = async (
  environment: Environment,
): Promise<TokenSymbol> => {
  const config = await getConfig(environment);
  const dataFeedContract = await getPriceFeedContract(environment);
  const address = await dataFeedContract.instance.getQuoteAsset.call();

  return getSymbol(config, address);
};

export default getQuoteAssetSymbol;
