// @flow
import BigNumber from 'bignumber.js';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../../fund/contracts/getFundContract';
import toDate from '../../utils/generic/toDate';

import requestStatus from '../constants/requestStatus';
import requestTypes from '../constants/requestTypes';

import type { Environment } from '../../utils/environment/Environment';

/**
 * The participation of an investor in fund
 */
type Participation = {
  personalStake: BigNumber,
  totalSupply: BigNumber,
};

/**
 * Get the personalStake and totalSupply of an `investorAddress` in a fund at
 * fundAddress
 */
const getLastOpenRequest = async (
  environment: Environment,
  { fundAddress, investorAddress },
): Promise<Participation> => {
  const config = await getConfig(environment);
  const fundContract = await getFundContract(environment, fundAddress);

  const lastRequestId = await fundContract.instance.getLastRequestId.call();
  const [
    ,
    status,
    type,
    ,
    ,
    ,
    ,
    timestamp,
    atUpdateId,
  ] = await fundContract.instance.requests.call({}, [lastRequestId]);

  console.log(timestamp);

  const request = {
    status: requestStatus[status.toNumber()],
    type: requestTypes[type.toNumber()],
    timestamp: toDate(timestamp),
    atUpdateId: atUpdateId.toNumber(),
  };

  return request;
};

export default getLastOpenRequest;
