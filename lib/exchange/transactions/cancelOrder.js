// @flow
import setup from "../../utils/setup";
import getSimpleMarketContract from "../contracts/getSimpleMarketContract";
import findEventInLog from "../../utils/findEventInLog";

const cancelOrder = async (id: string, from: string = setup.defaultAccount) => {
  const simpleMarketContract = await getSimpleMarketContract();
  const receipt = await simpleMarketContract.cancel(id, { from });

  const canceled = findEventInLog(
    "LogKill",
    receipt,
    "Error during order cancelation",
  );

  return canceled;
};

export default cancelOrder;
