// @flow
import BigNumber from "bignumber.js";
import findEventInLog from "../../utils/findEventInLog";
import getTokenContract from "../contracts/getTokenContract";
import toProcessable from "../utils/toProcessable";
import setup from "../../utils/setup";

const transferTo = async (
  symbol: string,
  toAddress: string,
  quantity: BigNumber,
  from: string = setup.defaultAccount,
) => {
  const tokenContract = await getTokenContract(symbol);
  const receipt = await tokenContract.transfer(
    toAddress,
    toProcessable(quantity, symbol),
    { from },
  );
  const transferLogEntry = findEventInLog("Transfer", receipt);

  return !!transferLogEntry;
};

export default transferTo;
