// @flow
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../contracts/getFundContract';
import getOrder from '../../exchange/calls/getOrder';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import isTakePermitted from '../../riskManagement/calls/isTakePermitted';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Take the order specified by id.
 * @param quantityAsked - The quantity to take from the order. If higher
 *    than the quantity of the order, the order gets executed completely and
 *    the remaining quantity is return.
 */
const takeOrder = (
  environment: Environment,
  { id, fundAddress, quantityAsked, exchangeNumber = 0 },
): Promise<any> =>
  getOrder(environment, { id }).then(async order => {
    const config = await getConfig(environment);
    const fundContract = await getFundContract(environment, fundAddress);

    ensure(
      getAddress(config, order.sell.symbol) !== fundAddress,
      'Fund buying its own fund token is forbidden.',
    );

    const isShutDown = await fundContract.instance.isShutDown.call();
    ensure(isShutDown === false, 'Fund is shut down');

    const owner = await fundContract.instance.owner.call();
    ensure(
      owner.toLowerCase() === environment.account.address.toLowerCase(),
      'Not owner of fund',
    );

    const priceFeedContract = await getPriceFeedContract(environment);

    const ExistsPriceOnAssetPair = await priceFeedContract.instance.existsPriceOnAssetPair.call(
      {},
      [
        getAddress(config, order.buy.symbol),
        getAddress(config, order.sell.symbol),
      ],
    );
    ensure(
      ExistsPriceOnAssetPair,
      'Price not provided on this asset pair by your datafeed.',
    );

    const [
      isRecent,
      referencePrice,
    ] = await priceFeedContract.instance.getReferencePrice.call({}, [
      getAddress(config, order.buy.symbol),
      getAddress(config, order.sell.symbol),
    ]);

    ensure(isRecent, 'Pricefeed data is outdated :( Please try again.');

    const isAllowed = await isTakePermitted(environment, {
      referencePrice,
      orderId: id,
      fundContract,
    });

    ensure(isAllowed, 'Risk Management module does not allow this trade.');

    // if no quantity specified OR a a specified quantity greater than the selling quantity of the
    // order, execute the full order. Otherwise, execute quantityAsked of the full order.
    const quantity =
      !quantityAsked || quantityAsked.gte(order.sell.howMuch)
        ? order.sell.howMuch
        : quantityAsked;

    ensure(
      quantity.lte(order.sell.howMuch),
      'Quantity asked too high compared to quantity for sale on the order.',
    );

    const args = [
      exchangeNumber,
      order.id,
      toProcessable(config, quantity, order.sell.symbol),
    ];

    const transaction = await sendTransaction(
      fundContract,
      'takeOrder',
      args,
      environment,
    );

    const updateLog = findEventInLog('OrderUpdated', transaction);
    const updatedOrder = await getOrder(environment, {
      id: updateLog.params.id.value,
    });

    return transaction
      ? {
          executedQuantity: quantity,
          order: updatedOrder,
        }
      : null;
  });

export default takeOrder;
