import getExchangeAdapterContract from "../contracts/getExchangeAdapterContract";
import getConfig from "../../version/calls/getConfig";
/**
  * @returns number (not bignumber)
  */
const getLastOrderId = async () => {
  const config = await getConfig();
  const exchangeAdapterContract = await getExchangeAdapterContract();
  const lastOrderIdBigNumber = await exchangeAdapterContract.getLastOrderId(
    config.exchangeAddress,
  );
  return lastOrderIdBigNumber.toNumber();
};

export default getLastOrderId;
