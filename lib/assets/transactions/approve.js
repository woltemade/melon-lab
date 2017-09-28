// @flow
import BigNumber from "bignumber.js";
import setup from "../../utils/setup";
import trace from "../../utils/trace";
import findEventInLog from "../../utils/findEventInLog";
import getTokenContract from "../contracts/getTokenContract";
import toProcessable from "../utils/toProcessable";

const approve = async (
  symbol: string,
  spender: string,
  quantity: BigNumber,
  from: string = setup.defaultAccount,
) => {
  const tokenContract = await getTokenContract(symbol);
  const args = [spender, toProcessable(quantity, symbol)];

  const gasEstimation = await tokenContract.approve.estimateGas(...args);
  args.push({ from, gas: Math.ceil(gasEstimation * 1.2) });

  trace("Approve", { quantity, from, symbol });
  const receipt = await tokenContract.approve(...args);
  const approvalLogEntry = findEventInLog("Approval", receipt);
  return !!approvalLogEntry;
};

export default approve;
