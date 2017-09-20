// @flow
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import contract from "truffle-contract";
import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";

const cancelOrderFromFund = async (
  id: string,
  vaultAddress: string,
  from: string = setup.web3.eth.defaultAccount,
) => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(vaultAddress);

  const receipt = await fundContract.cancel(id, { from });

  const canceled = findEventInLog(
    "LogKill",
    receipt,
    "Error during order cancelation",
  );

  return canceled;
};

export default cancelOrderFromFund;
