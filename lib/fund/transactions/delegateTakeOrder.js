// @flow
import BigNumber from 'bignumber.js';
import ensure from '../../utils/generic/ensure';
import callOnExchange from './callOnExchange';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getExchangeIndex from '../calls/getExchangeIndex';
import getFundContract from '../contracts/getFundContract';
import getMethodNameSignature from '../../exchange/utils/getMethodNameSignature';
import getOrder from '../../exchange/calls/getOrder';
import preflightTakeOrder from '../preflights/preflightTakeOrder';
import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const delegateTakeOrder = async (
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
    quantityToGive,
  },
): Promise<Order> => {
  const fillTakerQuantity =
    !quantityToGive || quantityToGive.gte(makerQuantity)
      ? new BigNumber(makerQuantity)
      : new BigNumber(quantityToGive);

  const fillMakerQuantity = fillTakerQuantity
    .times(new BigNumber(makerQuantity))
    .div(new BigNumber(takerQuantity));

  ensure(
    fillMakerQuantity.lte(makerQuantity),
    'Quantity asked too high compared to quantity for sale on the order.',
  );

  const fundContract = await getFundContract(environment, fundAddress);
  const preflightCheck = await preflightTakeOrder(environment, {
    fundContract,
    exchangeAddress,
    makerAsset,
    takerAsset,
    fillMakerQuantity,
    fillTakerQuantity,
  });

  ensure(
    preflightCheck,
    'One of the pre-conditions of the function takeOrder failed on pre-flight.',
  );

  const method = await getMethodNameSignature(environment, 'takeOrder');

  const transactionReceiptLog = await callOnExchange(environment, {
    fundContract,
    exchangeAddress,
    method,
    orderAddresses: [maker, taker, makerAsset, takerAsset, feeRecipient],
    orderValues: [
      makerQuantity,
      takerQuantity,
      makerFee,
      takerFee,
      timestamp,
      salt,
      fillTakerQuantity,
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

export default delegateTakeOrder;
