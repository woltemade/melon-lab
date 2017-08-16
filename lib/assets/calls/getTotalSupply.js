import getTokenContract from "../contracts/getTokenContract";
import addDecimals from "../utils/addDecimals";

/*
  @post: returns totalSupply of the token as Big Number
*/

const getTotalSupply = async symbol => {
  const tokenContract = await getTokenContract(symbol);
  const totalSupply = await tokenContract.totalSupply();

  return addDecimals(totalSupply, symbol);
};

export default getTotalSupply;
