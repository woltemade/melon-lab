// @flow
import BigNumber from 'bignumber.js';
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
const approve = async (environment, { symbol, spender, quantity }): boolean => {
  const tokenContract = await getTokenContract(environment, symbol);
  const args = [spender, toProcessable(quantity, symbol)];

  const allowance = await tokenContract.instance.allowance.call({}, [
    environment.account.address,
    spender,
  ]);
  if (allowance.gt(new BigNumber(0))) {
    await sendTransaction(tokenContract, 'approve', [spender, 0], environment);
  }
  const receipt = await sendTransaction(
    tokenContract,
    'approve',
    args,
    environment,
  );
  const approvalLogEntry = findEventInLog('Approval', receipt);
  return !!approvalLogEntry;
};

export default approve;
