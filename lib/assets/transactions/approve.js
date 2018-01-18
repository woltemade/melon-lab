// @flow
import BigNumber from 'bignumber.js';
import setup from '../../utils/setup';
import trace from '../../utils/generic/trace';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getTokenContract from '../contracts/getTokenContract';
import toProcessable from '../utils/toProcessable';
import sendTransaction from '../../utils/parity/sendTransaction';

import type { Address } from '../schemas/Address';
import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * Approves `spender` to spend `quantity` of token with `symbol`
 * `from` given address
 *
 * @returns {true} if approval was succesfull
 */
const approve = async (
  wallet,
  symbol: TokenSymbol,
  spender: Address,
  quantity: BigNumber,
): boolean => {
  const sender = wallet.address;
  trace('Approve', { quantity, sender, symbol });
  const tokenContract = await getTokenContract(symbol);
  const args = [spender, toProcessable(quantity, symbol)];
  const receipt = await sendTransaction(tokenContract, 'approve', args, wallet);
  const approvalLogEntry = findEventInLog('Approval', receipt);
  return !!approvalLogEntry;
};

export default approve;
