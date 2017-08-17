import getTokenContract from "../contracts/getTokenContract";
import toReadable from "../utils/toReadable";

const getBalance = async (symbol, ofAddress) => {
  const tokenContract = await getTokenContract(symbol);
  const result = await tokenContract.balanceOf(ofAddress);

  return toReadable(result.balanceOf, symbol);
};

export default getBalance;
