// @flow
import BigNumber from "bignumber.js";
import findEventInLog from "../../utils/findEventInLog";
import getTokenContract from "../contracts/getTokenContract";
import toProcessable from "../utils/toProcessable";
import gasBoost from "../../utils/gasBoost";

/**
 * Transfers `quantity` amount of token with `symbol` from `fromAddress` to
 * `toAddress`
 *
 * @throws {EnsureError}
 * @returns `true` if successful, otherwise it throws
 */
const transferFrom = async (
  symbol: string,
  fromAddress: string,
  toAddress: string,
  quantity: BigNumber,
): boolean => {
  const tokenContract = await getTokenContract(symbol);
  const args = [fromAddress, toAddress, toProcessable(quantity, symbol)];
  const options = { from: toAddress };
  const receipt = await gasBoost(tokenContract.transferFrom, args, options);
  const transferLogEntry = findEventInLog("Transfer", receipt);
  return !!transferLogEntry;
};

export default transferFrom;
