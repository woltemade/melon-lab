import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

/*
  @returns: all the subscribe/redeem requests this fund received from participants
*/

const getRequestsHistory = async fundAddress => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const requests = await fundContract.requests();

  return requests;
};

export default getRequestsHistory;
