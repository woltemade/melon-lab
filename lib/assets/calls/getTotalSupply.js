import getTokenContract from "../contracts/getTokenContract";
import toReadable from "../utils/toReadable";

/*
  @post: returns totalSupply of the token as Big Number
*/

const getTotalSupply = async symbol => {
  const tokenContract = await getTokenContract(symbol);
  const totalSupply = await tokenContract.totalSupply();

  return toReadable(totalSupply, symbol);
};

export default getTotalSupply;
