import contract from "truffle-contract";
import ERC20Json from "@melonproject/protocol/build/contracts/ERC20.json";
import setup from "../../utils/setup";

/*
  @pre: quantity has been approved from fromAddress to toAddress with the approve function
  @param quantity: BigNumber
*/

const transferFrom = async (tokenAddress, fromAddress, toAddress, quantity) => {
  const Token = contract(ERC20Json);
  Token.setProvider(setup.currentProvider);
  const tokenContract = Token.at(tokenAddress);
  const transfered = await tokenContract.transferFrom(
    fromAddress,
    toAddress,
    quantity,
    { from: toAddress },
  );

  return transfered
    ? {
        amountTransferred: quantity,
        to: toAddress,
        transfered,
      }
    : null;
};

export default transferFrom;
