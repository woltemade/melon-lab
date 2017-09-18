// @flow
import contract from "truffle-contract";
import setup from "../../utils/setup";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";

const cancelOrderFromFund = async (
  id: string,
  vaultAddress: string,
  from: string = setup.web3.eth.defaultAccount,
) => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(vaultAddress);

  const receipt = await fundContract.cancel(id, { from });
  return receipt;
};

export default cancelOrderFromFund;
