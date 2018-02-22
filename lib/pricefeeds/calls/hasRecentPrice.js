// @flow
import getPriceFeedContract from '../contracts/getPriceFeedContract';
import getAddress from '../../assets/utils/getAddress';
import getQuoteAssetSymbol from './getQuoteAssetSymbol';

import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

const hasRecentPrice = async (
  environment,
  tokenSymbol: TokenSymbol,
): Promise<Boolean> => {
  const symbol = tokenSymbol || (await getQuoteAssetSymbol(environment));
  const tokenAddress = getAddress(symbol);
  const dataFeedContract = await getPriceFeedContract(environment);
  return dataFeedContract.instance.hasRecentPrice.call({}, [tokenAddress]);
};

export default hasRecentPrice;
