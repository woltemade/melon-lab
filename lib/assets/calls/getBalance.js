// @flow
import BigNumber from "bignumber.js";
import getTokenContract from "../contracts/getTokenContract";
import toReadable from "../utils/toReadable";
import setup from "../../utils/setup";

/**
 * @returns the balance of a token for an address
 */
const getBalance: BigNumber = async (
  tokenSymbol: string,
  ofAddress: string = setup.defaultAccount,
) => {
  const tokenContract = await getTokenContract(tokenSymbol);
  const result = await tokenContract.balanceOf(ofAddress);
  return toReadable(result, tokenSymbol);
};

export default getBalance;
