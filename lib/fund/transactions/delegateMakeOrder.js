// @flow
import ensure from '../../utils/generic/ensure';
import callOnExchange from './callOnExchange';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getExchangeIndex from '../calls/getExchangeIndex';
import getFundContract from '../contracts/getFundContract';
import getMethodNameSignature from '../../exchange/utils/getMethodNameSignature';
import getOrder from '../../exchange/calls/getOrder';
import preflightMakeOrder from '../preflights/preflightMakeOrder';
import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const delegateMakeOrder = async (
  environment: Environment,
  {
    fundAddress,
    exchangeAddress,
    orderAddresses: [maker, taker, makerAsset, takerAsset, feeRecipient],
    orderValues: [
      makerQuantity,
      takerQuantity,
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
  const fundContract = await getFundContract(environment, fundAddress);
  const preflightCheck = await preflightMakeOrder(environment, {
    fundContract,
    exchangeAddress,
    makerAsset,
    takerAsset,
    makerQuantity,
    takerQuantity,
  });

  ensure(
    preflightCheck,
    'One of the pre-conditions of the function makeOrder failed on pre-flight.',
  );

  const method = await getMethodNameSignature(environment, 'makeOrder');

  const exchangeIndex = await getExchangeIndex(
    environment,
    exchangeAddress,
    fundAddress,
  );

  const updateLog = await callOnExchange(environment, {
    exchangeIndex,
    method,
    orderAddresses: [maker, taker, makerAsset, takerAsset, feeRecipient],
    orderValues: [
      makerQuantity,
      takerQuantity,
      makerFee,
      takerFee,
      timestamp,
      salt,
      fillTakerTokenAmount,
      dexySignatureMode,
    ],
    identifier,
    signature,
  });

  {
    /* const orderId = updateLog.params.id.value;

  const createdOrder = await getOrder(environment, { id: orderId });
  return createdOrder; */
  }
};

export default delegateMakeOrder;
