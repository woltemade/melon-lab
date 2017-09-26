import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

/*
  @pre: vault address retrieved from getFundForManager function.
  @returns: addresses of all modules linked to the fund.
*/

const isShutDown = async fundAddress => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const bool = await fundContract.isShutDown();

  return bool;
};

export default isShutDown;
