// @flow
import BigNumber from "bignumber.js";
import getExchangeAdapterContract from "../contracts/getExchangeAdapterContract";
import getConfig from "../../version/calls/getConfig";

/**
 * gets last order id
 */
const getLastOrderId = async (): number => {
  const config = await getConfig();
  const exchangeAdapterContract = await getExchangeAdapterContract();
  const lastOrderIdBigNumber: BigNumber = await exchangeAdapterContract.getLastOrderId(
    config.exchangeAddress,
  );
  return lastOrderIdBigNumber.toNumber();
};

export default getLastOrderId;
