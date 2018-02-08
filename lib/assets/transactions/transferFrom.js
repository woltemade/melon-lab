// @flow
import BigNumber from 'bignumber.js';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getTokenContract from '../contracts/getTokenContract';
import toProcessable from '../utils/toProcessable';
import sendTransaction from '../../utils/parity/sendTransaction';

import type { Address } from '../schemas/Address';
import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * Transfers `quantity` amount of token with `symbol` from `fromAddress` to
 * `toAddress`
 *
 * @throws {EnsureError}
 * @returns `true` if successful, otherwise it throws
 */
const transferFrom = async (
  environment,
  { symbol, toAddress, quantity },
): Promise<boolean> => {
  const tokenContract = await getTokenContract(environment, symbol);
  const fromAddress = environment.account.address;
  const args = [fromAddress, toAddress, toProcessable(quantity, symbol)];
  const receipt = await sendTransaction(
    tokenContract,
    'transferFrom',
    args,
    environment,
  );
  const transferLogEntry = findEventInLog('Transfer', receipt);
  return !!transferLogEntry;
};

export default transferFrom;
