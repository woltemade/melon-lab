// @flow
import contract from "truffle-contract";
import ERC20Json from "@melonproject/protocol/build/contracts/ERC20.json";
import setup from "../../utils/setup";
import getAddress from "../utils/getAddress";

import type { TokenSymbol } from "../schemas/TokenSymbol";

/**
 * @returns the contract instance of a token by symbol
 */
const getTokenContract: contract = async (symbol: TokenSymbol) => {
  const Token = contract(ERC20Json);
  Token.setProvider(setup.currentProvider);
  const tokenAddress = getAddress(symbol);
  return Token.at(tokenAddress);
};

export default getTokenContract;
