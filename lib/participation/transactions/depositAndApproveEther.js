import contract from "truffle-contract";
import EtherTokenJson from "@melonproject/protocol/build/contracts/EtherToken.json";

import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import getAddress from "../../assets/utils/getAddress";
import toProcessable from "../../assets/utils/toProcessable";

/*
  @param quantity: BigNumber
*/
const depositAndApproveEther = async (
  fromAddress,
  toBeApprovedAddress,
  quantity,
) => {
  const processableQuantity = toProcessable(quantity);
  const EtherToken = contract(EtherTokenJson);
  EtherToken.setProvider(setup.currentProvider);
  const etherTokenContract = EtherToken.at(getAddress("ETH-T"));
  const depositReceipt = await etherTokenContract.deposit({
    from: fromAddress,
    value: processableQuantity,
  });
  const depositLogEntry = findEventInLog("Deposit", depositReceipt);

  if (
    !depositLogEntry ||
    !processableQuantity.eq(depositLogEntry.args.amount)
  ) {
    console.error("depositReceipt", JSON.stringify(depositReceipt, null, 4));
    throw new Error("Deposit failed");
  }

  const approveReceipt = await etherTokenContract.approve(
    toBeApprovedAddress,
    processableQuantity,
    {
      from: fromAddress,
    },
  );
  const approveLogEntry = findEventInLog("Approval", approveReceipt);

  if (
    !approveLogEntry ||
    // eslint-disable-next-line no-underscore-dangle
    !processableQuantity.eq(approveLogEntry.args._value)
  ) {
    console.log("approveReceipt", JSON.stringify(approveReceipt, null, 4));
    throw new Error("Deposit failed");
  }

  return true;
};

export default depositAndApproveEther;
