import contract from "truffle-contract";
import ERC20Json from "@melonproject/protocol/build/contracts/ERC20.json";
import { currentProvider } from "../../utils/setup";

const getBalance = async (tokenAddress, ofAddress) => {
  const Token = contract(ERC20Json);
  Token.setProvider(currentProvider);
  const tokenContract = Token.at(tokenAddress);
  const balance = await tokenContract.balanceOf(ofAddress);

  return balance;
};

export default getBalance;
