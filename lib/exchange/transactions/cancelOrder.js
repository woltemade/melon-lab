// @flow

import getExchangeContract from "../contracts/getExchangeContract";

const cancelOrder = async id => {
  const exchangeContract = await getExchangeContract();
  const receipt = await exchangeContract.cancel(id);
  return receipt;
};

export default cancelOrder;
