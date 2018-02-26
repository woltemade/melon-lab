// @flow
import BigNumber from 'bignumber.js';

import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getAddress from '../../assets/utils/getAddress';
import getBalance from '../../assets/calls/getBalance';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../contracts/getFundContract';
import getOrder from '../../exchange/calls/getOrder';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import isMakePermitted from '../../riskManagement/calls/isMakePermitted';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';

import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const makeOrder = async (
  environment: Environment,
  {
    fundAddress,
    sellWhichToken,
    buyWhichToken,
    sellHowMuch,
    buyHowMuch,
    exchangeNumber = 0,
  },
): Promise<Order> => {
  const config = await getConfig(environment);

  const sellTokenBalance = await getBalance(environment, {
    tokenSymbol: sellWhichToken,
    ofAddress: fundAddress,
  });
  ensure(
    sellTokenBalance.gte(sellHowMuch),
    `Insufficient balance of ${sellWhichToken}`,
  );

  const priceFeedContract = await getPriceFeedContract(environment);

  const ExistsPriceOnAssetPair = await priceFeedContract.instance.existsPriceOnAssetPair.call(
    {},
    [getAddress(config, sellWhichToken), getAddress(config, buyWhichToken)],
  );
  ensure(
    ExistsPriceOnAssetPair,
    'Price not provided on this asset pair by your datafeed.',
  );

  const [
    isRecent,
    referencePrice,
  ] = await priceFeedContract.instance.getReferencePrice.call({}, [
    getAddress(config, sellWhichToken),
    getAddress(config, buyWhichToken),
  ]);

  ensure(isRecent, 'Pricefeed data is outdated :( Please try again.');
  const fundContract = await getFundContract(environment, fundAddress);

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');

  const owner = await fundContract.instance.owner.call();
  ensure(
    owner.toLowerCase() === environment.account.address.toLowerCase(),
    'Not owner of fund',
  );

  const quantityHeldInCustodyOfExchange = await fundContract.instance.quantityHeldInCustodyOfExchange.call(
    {},
    [getAddress(config, sellWhichToken)],
  );

  ensure(
    quantityHeldInCustodyOfExchange.eq(new BigNumber(0)),
    `Only one open order is allowed per asset. Please wait or cancel your existing open order on ${sellWhichToken}`,
  );

  const isAllowed = await isMakePermitted(environment, {
    referencePrice,
    sellWhichToken,
    buyWhichToken,
    sellHowMuch,
    buyHowMuch,
    fundContract,
  });

  ensure(isAllowed, "Risk Management module doesn't allow this trade");

  const args = [
    exchangeNumber,
    getAddress(config, sellWhichToken),
    getAddress(config, buyWhichToken),
    toProcessable(config, sellHowMuch, sellWhichToken),
    toProcessable(config, buyHowMuch, buyWhichToken),
  ];
  const receipt = await sendTransaction(
    fundContract,
    'makeOrder',
    args,
    environment,
    {},
  );
  const updateLog = findEventInLog('OrderUpdated', receipt);
  const orderId = updateLog.params.id.value;

  const createdOrder = await getOrder(environment, { id: orderId });
  return createdOrder;
};

export default makeOrder;
