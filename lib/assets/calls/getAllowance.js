import getTokenContract from "../contracts/getTokenContract";
import addDecimals from "../utils/addDecimals";

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

  return approvedAmount
    ? {
        approvedAmount: addDecimals(approvedAmount, tokenSymbol),
        owner: ownerAddress,
        spender: spenderAddress,
      }
    : null;
};

export default getAllowance;
