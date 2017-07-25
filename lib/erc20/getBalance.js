import contract from "truffle-contract";
import ERC20Json from "@melonproject/protocol/build/contracts/ERC20.json";
import web3 from "../helpers/web3";

const getBalance = async (tokenAddress, ofAddress) => {
  const Token = contract(ERC20Json);
  Token.setProvider(web3.currentProvider);
  const tokenContract = Token.at(tokenAddress);
  const balance = await tokenContract.balanceOf(ofAddress);

  return balance;
};

export default getBalance;
