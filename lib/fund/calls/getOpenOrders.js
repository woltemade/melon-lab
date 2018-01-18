// @flow
import getOrdersHistory from './getOrdersHistory';

/**
 * Returns all the order the fund has made and whose status is active
 */

const getOpenOrders = async fundAddress => {
  const orders = await getOrdersHistory(fundAddress);

  return orders.filter(o => o[1].toNumber() === 0);
};

export default getOpenOrders;
