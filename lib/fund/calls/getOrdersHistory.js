// @flow
import getFundContract from '../contracts/getFundContract';

/**
 * Get all the orders the fund has made so far, regardless of their status (active, canceled etc.)
 */

const getOrdersHistory = async fundAddress => {
  const fundContract = getFundContract(fundAddress);
  const lastOrderId = await fundContract.instance.getLastOrderId.call({}, []);
  const getOrdersPromises = new Array(lastOrderId.toNumber() + 1)
    .fill(undefined)
    .map(async (val, index) => {
      const order = await fundContract.instance.orders.call({}, [index]);
      return order;
    });
  return Promise.all(getOrdersPromises);
};

export default getOrdersHistory;
