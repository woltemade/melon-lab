import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

/*
  @returns: all the orders this fund placed on exchanges
*/

const getOrdersHistory = async fundAddress => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const requests = await fundContract.orders();

  return requests;
};

export default getOrdersHistory;
