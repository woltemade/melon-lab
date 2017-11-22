// @flow
import BigNumber from "bignumber.js";
import findEventInLog from "../../utils/findEventInLog";
import getTokenContract from "../contracts/getTokenContract";
import toProcessable from "../utils/toProcessable";
import sendTransaction from "../../utils/sendTransaction";

import type { Address } from "../schemas/Address";
import type { TokenSymbol } from "../schemas/TokenSymbol";

/**
 * Transfers `quantity` amount of token with `symbol` from `fromAddress` to
 * `toAddress`
 *
 * @throws {EnsureError}
 * @returns `true` if successful, otherwise it throws
 */
const transferFrom = async (
  symbol: TokenSymbol,
  fromAddress: Address,
  toAddress: Address,
  quantity: BigNumber,
): Promise<boolean> => {
  const tokenContract = await getTokenContract(symbol);
  const args = [fromAddress, toAddress, toProcessable(quantity, symbol)];
  const receipt = await sendTransaction(tokenContract, "transferFrom", args);
  const transferLogEntry = findEventInLog("Transfer", receipt);
  return !!transferLogEntry;
};

export default transferFrom;
