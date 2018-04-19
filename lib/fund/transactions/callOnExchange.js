// @flow
import BigNumber from 'bignumber.js';

import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getAddress from '../../assets/utils/getAddress';
import getBalance from '../../assets/calls/getBalance';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../contracts/getFundContract';
import getOrder from '../../exchange/calls/getOrder';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';
import getMatchingMarketContract from '../../exchange/contracts/getMatchingMarketContract';
import isMakePermitted from '../../riskManagement/calls/isMakePermitted';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';

import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const callOnExchange = async (
  environment: Environment,
  {
    fundContract,
    exchangeIndex = 0,
    method,
    orderAddresses: [maker, taker, sellWhichToken, buyWhichToken, feeRecipient],
    orderValues: [
      sellHowMuch,
      buyHowMuch,
      makerFee,
      takerFee,
      timestamp,
      salt,
      fillTakerTokenAmount,
    ],
    identifier,
    signature,
  },
): Promise<Order> => {
  const config = await getConfig(environment);

  const args = [
    exchangeIndex,
    method,
    [
      maker,
      taker,
      getAddress(config, sellWhichToken),
      getAddress(config, buyWhichToken),
      feeRecipient,
    ],
    [
      toProcessable(config, sellHowMuch, sellWhichToken),
      toProcessable(config, buyHowMuch, buyWhichToken),
      makerFee,
      takerFee,
      timestamp,
      salt,
      fillTakerTokenAmount,
    ],
    identifier,
    signature,
  ];
  const receipt = await sendTransaction(
    fundContract,
    'callOnExchange',
    args,
    environment,
    {},
  );
  const updateLog = findEventInLog('OrderUpdated', receipt);
  return updateLog;
};

export default callOnExchange;
