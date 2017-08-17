// @flow
import setup from "../../utils/setup";
import getExchangeContract from "../contracts/getExchangeContract";

const cancelOrder = async (
  id: string,
  from: string = setup.web3.eth.defaultAccount,
) => {
  const exchangeContract = await getExchangeContract();
  const receipt = await exchangeContract.cancel(id, { from });
  return receipt;
};

export default cancelOrder;
