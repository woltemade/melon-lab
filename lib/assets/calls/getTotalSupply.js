import contract from "truffle-contract";
import ERC20Json from "@melonproject/protocol/build/contracts/ERC20.json";
import setup from "../../utils/setup";

/*
  @post: returns totalSupply of the token as Big Number
*/

const getTotalSupply = async tokenAddress => {
  const Token = contract(ERC20Json);
  Token.setProvider(setup.currentProvider);
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
