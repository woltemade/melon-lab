import getTokenContract from "../contracts/getTokenContract";
import addDecimals from "../utils/addDecimals";

const getBalance = async (symbol, ofAddress) => {
  const tokenContract = await getTokenContract(symbol);
  const result = await tokenContract.balanceOf(ofAddress);

  return addDecimals(result.balanceOf, symbol);
};

export default getBalance;
