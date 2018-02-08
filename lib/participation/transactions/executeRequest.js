// @flow
import BigNumber from 'bignumber.js';

import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import toReadable from '../../assets/utils/toReadable';
import sendTransaction from '../../utils/parity/sendTransaction';
import getFundContract from '../../fund/contracts/getFundContract';
import getParticipation from '../../participation/calls/getParticipation';
import toProcessable from '../../assets/utils/toProcessable';

import type { Address } from '../../assets/schemas/Address';

/**
 * Execute subscription/redemption request by `requestId` on fund at `fundAddress`
 * @returns number of allocated shares
 */
const executeRequest = async (
  environment,
  { requestId, fundAddress },
): Promise<BigNumber> => {
  const fundContract = await getFundContract(environment, fundAddress);
  const request = await fundContract.instance.requests.call({}, [requestId]);
  const [
    participant,
    ,
    requestType,
    ,
    shareQuantity,
  ] = await fundContract.instance.requests.call({}, [requestId]);
  let executeRequestLogEntry;
  let receipt;

  /* Pre conditions
      1/ isShutDown
      2/ pre_cond(requests[id].status == RequestStatus.active)
      3/ pre_cond(requests[id].requestType != RequestType.redeem || requests[id].shareQuantity <= balances[requests[id].participant])
      4/ pre_cond(totalSupply == 0 || now >= add(requests[id].timestamp, mul(uint(2), module.pricefeed.getInterval())))
  */

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');

  if (requestType.eq(new BigNumber(0))) {
    receipt = await sendTransaction(
      fundContract,
      'executeRequest',
      [requestId],
      environment,
    );
    executeRequestLogEntry = findEventInLog('Created', receipt);
  } else if (requestType.eq(new BigNumber(1))) {
    const participation = await getParticipation(environment, {
      fundAddress,
      investorAddress: participant,
    });
    const participantStake = participation.personalStake;
    ensure(
      shareQuantity.lte(toProcessable(participantStake)),
      'Number of shares requested exceed actual balance',
    );
    receipt = await sendTransaction(
      fundContract,
      'executeRequest',
      [requestId],
      environment,
      {},
    );
    executeRequestLogEntry = findEventInLog('Annihilated', receipt);
  }

  return toReadable(executeRequestLogEntry.params.shareQuantity.value);
};

export default executeRequest;
