// @flow
import BigNumber from "bignumber.js";
import getTokenContract from "../contracts/getTokenContract";
import toReadable from "../utils/toReadable";

/**
 * @returns total supply of a token by its symbol
 */
const getTotalSupply: BigNumber = async (symbol: string) => {
  const tokenContract = await getTokenContract(symbol);
  const totalSupply = await tokenContract.totalSupply();

  return toReadable(totalSupply, symbol);
};

export default getTotalSupply;
