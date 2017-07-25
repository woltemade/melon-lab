import contract from "truffle-contract";
import ERC20Json from "@melonproject/protocol/build/contracts/ERC20.json";
import web3 from "../helpers/web3";

/*
  @post: returns totalSupply of the token as Big Number
*/

const getTotalSupply = async tokenAddress => {
  const Token = contract(ERC20Json);
  Token.setProvider(web3.currentProvider);
  const tokenContract = Token.at(tokenAddress);
  const totalSupply = await tokenContract.totalSupply();

  return totalSupply
    ? {
        tokenAddress,
        totalSupply,
      }
    : null;
};

export default getTotalSupply;
