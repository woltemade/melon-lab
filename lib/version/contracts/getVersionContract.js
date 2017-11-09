import contract from "truffle-contract";
import VersionJson from "@melonproject/protocol/build/contracts/Version.json";

import setup from "../../utils/setup";

/**
 * Get deployed version contract instance
 */
const getVersionContract = async () => {
  const Version = contract(VersionJson);
  Version.setProvider(setup.currentProvider);
  return Version.deployed();
};

export default getVersionContract;
