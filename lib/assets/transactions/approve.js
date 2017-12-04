// @flow
import BigNumber from "bignumber.js";
import setup from "../../utils/setup";
import trace from "../../utils/generic/trace";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import getTokenContract from "../contracts/getTokenContract";
import toProcessable from "../utils/toProcessable";
import sendTransaction from "../../utils/parity/sendTransaction";

import type { Address } from "../schemas/Address";
import type { TokenSymbol } from "../schemas/TokenSymbol";

/**
 * Approves `spender` to spend `quantity` of token with `symbol`
 * `from` given address
 *
 * @returns {true} if approval was succesfull
 */
const approve = async (
  symbol: TokenSymbol,
  spender: Address,
  quantity: BigNumber,
  from: Address = setup.defaultAccount,
): boolean => {
  trace("Approve", { quantity, from, symbol });
  const tokenContract = await getTokenContract(symbol);
  const args = [spender, toProcessable(quantity, symbol)];
  const receipt = await sendTransaction(tokenContract, "approve", args);
  const approvalLogEntry = findEventInLog("Approval", receipt);
  return !!approvalLogEntry;
};

export default approve;
