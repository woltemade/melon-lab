// @flow
import Api from "@parity/api";
import fs from "fs";
import setup from "../../utils/setup";
import getAddress from "../utils/getAddress";

import type { TokenSymbol } from "../schemas/TokenSymbol";

/**
 * @returns the contract instance of a token by symbol
 */
const getTokenContract: contract = async (symbol: TokenSymbol) => {
  const tokenAddress = getAddress(symbol);
  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync("node_modules/@melonproject/protocol/out/ERC20.abi"),
  );
  return api.newContract(abi, tokenAddress);
};

export default getTokenContract;
