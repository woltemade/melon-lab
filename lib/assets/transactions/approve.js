// @flow
import BigNumber from "bignumber.js";
import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import getTokenContract from "../contracts/getTokenContract";
import addDecimals from "../utils/addDecimals";

const approve = async (
  symbol: string,
  exchange: string,
  quantity: BigNumber,
  from: string = setup.web3.eth.accounts[0],
) => {
  const tokenContract = await getTokenContract(symbol);
  const receipt = await tokenContract.approve(
    exchange,
    addDecimals(quantity, symbol),
    { from },
  );
  const approvalLogEntry = findEventInLog("Approval", receipt);
  return !!approvalLogEntry;
};

export default approve;
