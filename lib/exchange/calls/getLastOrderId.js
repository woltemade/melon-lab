import getExchangeContract from "../contracts/getExchangeContract";

/**
  * @returns number (not bignumber)
  */
const getLastOrderId = async () => {
  const exchangeContract = await getExchangeContract();
  const lastOrderIdBigNumber = await exchangeContract.getLastOfferId();
  return lastOrderIdBigNumber.toNumber();
};

export default getLastOrderId;
