// @flow
import BigNumber from "bignumber.js";
import getDataFeedContract from "../contracts/getDataFeedContract";
import getAddress from "../../assets/utils/getAddress";
import toReadable from "../../assets/utils/toReadable";

import type { TokenSymbol } from "../../assets/schemas/TokenSymbol";

/**
 * Gets price of `tokenSymbol` against MLN-T
 */
const getPrice = async (tokenSymbol: TokenSymbol): BigNumber => {
  const dataFeedContract = await getDataFeedContract();
  const assetAddress = getAddress(tokenSymbol);

  const price: BigNumber = await dataFeedContract.getPrice(assetAddress);
  return toReadable(price, "MLN-T");
};

export default getPrice;
