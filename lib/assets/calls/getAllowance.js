import contract from "truffle-contract";
import ERC20Json from "@melonproject/protocol/build/contracts/ERC20.json";
import setup from "../../utils/setup";
import getAddress from "../utils/getAddress";
import addDecimals from "../utils/addDecimals";

/*
  @param: ownerAddress is the address who owns the funds; spenderAddress is the address who is approved to spend it
  @post: returns the amount which spender is still allowed to withdraw from owner (as Big Number)
*/

const getAllowance = async (tokenSymbol, ownerAddress, spenderAddress) => {
  const Token = contract(ERC20Json);
  Token.setProvider(setup.currentProvider);
  const tokenAddress = getAddress(tokenSymbol);
  const tokenContract = Token.at(tokenAddress);
  const approvedAmount = await tokenContract.allowance(
    ownerAddress,
    spenderAddress
  );

  return approvedAmount
    ? {
        approvedAmount: addDecimals(approvedAmount, tokenSymbol),
        owner: ownerAddress,
        spender: spenderAddress
      }
    : null;
};

export default getAllowance;
