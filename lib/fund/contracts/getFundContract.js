// @flow
import Api from "@parity/api";
import fs from "fs";
import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";

/**
 * Get the contract instance of fund at `fundAddress`
 */
const getFundContract = (fundAddress: Address) => {
  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync("node_modules/@melonproject/protocol/out/Fund.abi"),
  );

  const fundContract = api.newContract(abi, fundAddress);
  return fundContract;
};

export default getFundContract;
