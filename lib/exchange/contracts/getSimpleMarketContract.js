// @flow
import SimpleMarketAbi from '@melonproject/protocol/out/exchange/thirdparty/MatchingMarket.abi.json';
import getConfig from '../../version/calls/getConfig';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Get deployed SimpleMarket contract instance
 */
const getSimpleMarketContract = async (environment: Environment) => {
  const config = await getConfig(environment);
  return environment.api.newContract(SimpleMarketAbi, config.exchangeAddress);
};

export default getSimpleMarketContract;
