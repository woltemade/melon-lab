import getTokenContract from "../contracts/getTokenContract";
import toReadable from "../utils/toReadable";

/*
  @param: ownerAddress is the address who owns the funds; spenderAddress is the address who is approved to spend it
  @post: returns the amount which spender is still allowed to withdraw from owner (as Big Number)
*/

const getAllowance = async (tokenSymbol, ownerAddress, spenderAddress) => {
  const tokenContract = await getTokenContract(tokenSymbol);
  const approvedAmount = await tokenContract.allowance(
    ownerAddress,
    spenderAddress,
  );

  return toReadable(approvedAmount, tokenSymbol);
};

export default getAllowance;
