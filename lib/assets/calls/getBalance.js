import getTokenContract from "../contracts/getTokenContract";
import toReadable from "../utils/toReadable";

const getBalance = async (symbol, ofAddress) => {
  const tokenContract = await getTokenContract(symbol);
  const result = await tokenContract.balanceOf(ofAddress);
  console.log("FROM MELONJS ", result);
  return toReadable(result, symbol);
};

export default getBalance;
