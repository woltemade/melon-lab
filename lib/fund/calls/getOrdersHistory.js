// @flow
import getFundContract from '../contracts/getFundContract';
import isValidId from '../../utils/generic/isValidId';

/**
 * Get all the orders the fund has made so far, regardless of their status (active, canceled etc.)
 */

const getOrdersHistory = async (environment, { fundAddress }) => {
  const fundContract = getFundContract(environment, fundAddress);
  const lastOrderId = await fundContract.instance.getLastOrderIndex.call(
    {},
    [],
  );

  if (!isValidId(lastOrderId)) {
    return [];
  }

  const getOrdersPromises = new Array(lastOrderId.toNumber() + 1)
    .fill(undefined)
    .map(async (val, index) => {
      const order = await fundContract.instance.orders.call({}, [index]);
      order.push(index);
      return order;
    });
  return Promise.all(getOrdersPromises);
};

export default getOrdersHistory;
