// @flow
import BigNumber from 'bignumber.js';
import getPriceFeedContract from '../contracts/getPriceFeedContract';
import getAddress from '../../assets/utils/getAddress';
import toReadable from '../../assets/utils/toReadable';

import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Gets price of `tokenSymbol` against MLN-T
 */
const getPrice = async (tokenSymbol: TokenSymbol): BigNumber => {
  const dataFeedContract = await getPriceFeedContract();
  const assetAddress = getAddress(tokenSymbol);

  const price: BigNumber = await dataFeedContract.instance.getPrice.call({}, [
    assetAddress,
  ]);
  return toReadable(price, 'MLN-T');
};

export default getPrice;
