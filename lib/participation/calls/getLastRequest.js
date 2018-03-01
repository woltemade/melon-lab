// @flow
import BigNumber from 'bignumber.js';

import getFundContract from '../../fund/contracts/getFundContract';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import toDate from '../../utils/generic/toDate';

import requestStatus from '../constants/requestStatus';
import requestTypes from '../constants/requestTypes';

import type { Address } from '../../assets/schemas/Address';
import type { Environment } from '../../utils/environment/Environment';
import type { RequestStatus } from '../constants/requestStatus';
import type { RequestType } from '../constants/requestTypes';

/**
 * The participation of an investor in fund
 */
type Request = {
  participant: Address,
  status: RequestStatus,
  totalSupply: BigNumber,
  type: RequestType,
  timestamp: date,
  atUpdateId: number,
  maxRemainingWaitSeconds: number,
};

/**
 * Get's the last request and its estimated remaining wait time
 */
const getLastRequest = async (
  environment: Environment,
  { fundAddress },
): Promise<Request> => {
  const fundContract = await getFundContract(environment, fundAddress);
  const priceFeedContract = await getPriceFeedContract(environment);

  const interval = (await priceFeedContract.instance.getInterval.call()).toNumber();
  const lastUpdateId = (await priceFeedContract.instance.getLastUpdateId.call()).toNumber();

  const totalSupply = await fundContract.instance.totalSupply.call();
  const lastRequestId = await fundContract.instance.getLastRequestId.call();
  const [
    participant,
    status,
    type,
    ,
    ,
    ,
    ,
    timestamp,
    atUpdateId,
  ] = await fundContract.instance.requests.call({}, [lastRequestId]);

  /*
    // Corresponding code on protocol
    now >= add(requests[id].timestamp, module.pricefeed.getInterval()) &&
    module.pricefeed.getLastUpdateId() >= add(requests[id].atUpdateId, 2);
  */

  const remainingWaitIntervals = Math.max(
    atUpdateId.toNumber() + 2 - lastUpdateId,
    0,
  );

  const maxRemainingWaitSeconds = totalSupply.eq(0)
    ? 0
    : remainingWaitIntervals * interval;

  const request = {
    participant,
    status: requestStatus[status.toNumber()],
    type: requestTypes[type.toNumber()],
    timestamp: toDate(timestamp),
    atUpdateId: atUpdateId.toNumber(),
    maxRemainingWaitSeconds,
  };

  return request;
};

export default getLastRequest;
