// @flow
import BigNumber from "bignumber.js";
import findEventInLog from "../../utils/findEventInLog";
import getTokenContract from "../contracts/getTokenContract";
import removeDecimals from "../utils/removeDecimals";
import setup from "../../utils/setup";

const transferTo = async (
  symbol: string,
  toAddress: string,
  quantity: BigNumber,
  from: string = setup.web3.eth.accounts[0],
) => {
  const tokenContract = await getTokenContract(symbol);
  const receipt = await tokenContract.transfer(
    toAddress,
    removeDecimals(quantity, symbol),
    { from },
  );
  const transferLogEntry = findEventInLog("Transfer", receipt);

  return !!transferLogEntry;
};

export default transferTo;
