// @flow
import BigNumber from 'bignumber.js';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../../fund/contracts/getFundContract';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import toReadable from '../../assets/utils/toReadable';

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
};

export default getLastOpenRequest;
