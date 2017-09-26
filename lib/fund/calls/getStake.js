import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

const getSTake = async fundAddress => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const stake = await fundContract.getSTake();

  return stake;
};

export default getSTake;
