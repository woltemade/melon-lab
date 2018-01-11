// @flow
import BigNumber from "bignumber.js";
import getTokenContract from "../contracts/getTokenContract";
import toReadable from "../utils/toReadable";

import type { TokenSymbol } from "../schemas/TokenSymbol";

/**
 * @returns total supply of a token by its symbol
 */
const getTotalSupply = async (symbol: TokenSymbol): Promise<BigNumber> => {
  const tokenContract = await getTokenContract(symbol);
  const totalSupply = await tokenContract.instance.totalSupply.call({}, []);

  return toReadable(totalSupply, symbol);
};

export default getTotalSupply;
