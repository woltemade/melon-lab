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
    orderAddresses: [maker, taker, makerAsset, takerAsset, feeRecipient],
    orderValues: [
      makerTokenQuantity,
      takerTokenQuantity,
      makerFee,
      takerFee,
      timestamp,
      salt,
      fillTakerTokenAmount,
      dexySignatureMode,
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
      getAddress(config, makerAsset),
      getAddress(config, takerAsset),
      feeRecipient,
    ],
    [
      toProcessable(config, makerTokenQuantity, makerAsset),
      toProcessable(config, takerTokenQuantity, takerAsset),
      makerFee,
      takerFee,
      timestamp,
      salt,
      fillTakerTokenAmount,
      dexySignatureMode,
    ],
    identifier,
    signature.v,
    signature.r,
    signature.s,
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
