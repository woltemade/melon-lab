import contract from "truffle-contract";
import ERC20Json from "@melonproject/protocol/build/contracts/ERC20.json";

import web3 from "../helpers/web3";

/*
  @param quantity: BigNumber
*/

const approve = async (
  tokenAddress,
  fromAddress,
  toBeApprovedAddress,
  quantity,
) => {
  const Token = contract(ERC20Json);
  Token.setProvider(web3.currentProvider);
  const tokenContract = Token.at(tokenAddress);
  const approved = await tokenContract.approve(toBeApprovedAddress, quantity, {
    from: fromAddress,
  });

  return approved
    ? {
        amountApproved: quantity,
        to: toBeApprovedAddress,
        approved,
      }
    : null;
};

export default approve;
