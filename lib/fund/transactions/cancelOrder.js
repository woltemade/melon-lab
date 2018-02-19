// @flow
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getFundContract from '../contracts/getFundContract';
import sendTransaction from '../../utils/parity/sendTransaction';

import type { Address } from '../../assets/schemas/Address';

/**
 * Cancel the order with 'index' from fund openOrders array at `fundAddress`
 */
const cancelOrder = async (
  environment,
  { orderIndex, fundAddress, exchangeNumber = 0 },
): Promise<boolean> => {
  const fundContract = await getFundContract(environment, fundAddress);

  const isShutDown = await fundContract.instance.isShutDown.call();
  const owner = await fundContract.instance.owner.call();
  console.log(owner, environment.account.address);
  ensure(
    owner.toLowerCase() === environment.account.address.toLowerCase() ||
      isShutDown,
    'Not owner of fund',
  );

  const receipt = await sendTransaction(
    fundContract,
    'cancelOrder',
    [exchangeNumber, orderIndex],
    environment,
  );
  const canceled = findEventInLog(
    'OrderUpdated',
    receipt,
    'Error during order cancelation',
  );

  return !!canceled;
};

export default cancelOrder;
