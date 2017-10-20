import getTokenContract from "../contracts/getTokenContract";
import toReadable from "../utils/toReadable";
import setup from "../../utils/setup";

/**
 *
 */
const getBalance = async (symbol, ofAddress = setup.defaultAccount) => {
  const tokenContract = await getTokenContract(symbol);
  const result = await tokenContract.balanceOf(ofAddress);
  return toReadable(result, symbol);
};

export default getBalance;
