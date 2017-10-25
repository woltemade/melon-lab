// @flow
import BigNumber from "bignumber.js";
import findEventInLog from "../../utils/findEventInLog";
import getTokenContract from "../contracts/getTokenContract";
import toProcessable from "../utils/toProcessable";
import setup from "../../utils/setup";
import gasBoost from "../../utils/gasBoost";

/**
 * Transfer `quantity` amount of tokens with symbol `symbol` from `from`
 * account to `toAddress`. In contrast to _transferFrom_, this function can
 * be called without approving the quantity/tokens first, if `from` can sign
 * the transaction (i.e. unlocked node or the account of logged in user)
 *
 * @throws {EnsureError}
 * @returns `true` if transfer is successful
 */
const transferTo = async (
  symbol: string,
  toAddress: string,
  quantity: BigNumber,
  from: string = setup.defaultAccount,
): boolean => {
  const tokenContract = await getTokenContract(symbol);
  const args = [toAddress, toProcessable(quantity, symbol)];
  const receipt = await gasBoost(tokenContract.transfer, args, { from });
  const transferLogEntry = findEventInLog("Transfer", receipt);

  return !!transferLogEntry;
};

export default transferTo;
