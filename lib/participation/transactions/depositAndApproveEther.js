import Api from "@parity/api";
import fs from "fs";
import setup from "../../utils/setup";
import ensure from "../../utils/ensure";
import findEventInLog from "../../utils/findEventInLog";
import getAddress from "../../assets/utils/getAddress";
import toProcessable from "../../assets/utils/toProcessable";
import sendTransaction from "../../utils/sendTransaction";

/**
 * @deprecated
 */
const depositAndApproveEther = async (
  from,
  toBeApprovedAddress,
  quantity,
  tokenAddress,
) => {
  console.warn("depositAndApproveEther possibly deprecated");

  const processableQuantity = toProcessable(quantity, tokenAddress);

  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync("node_modules/@melonproject/protocol/out/EtherToken.abi"),
  );
  const etherTokenContract = api.newContract(abi, getAddress("ETH-T"));

  const depositReceipt = await sendTransaction(
    etherTokenContract,
    "deposit",
    [],
    {
      value: processableQuantity,
    },
  );

  const depositLogEntry = findEventInLog("Deposit", depositReceipt);
  ensure(
    processableQuantity.eq(depositLogEntry.args.amount),
    "Deposited amount inequal requested quantity",
    { depositReceipt },
  );

  const approveArgs = [toBeApprovedAddress, processableQuantity];
  const approveReceipt = await sendTransaction(
    etherTokenContract,
    "approve",
    approveArgs,
  );

  const approveLogEntry = findEventInLog("Approval", approveReceipt);
  ensure(
    // eslint-disable-next-line no-underscore-dangle
    processableQuantity.eq(approveLogEntry.args._value),
    "Approved amount inequal requested quantity",
    { approveReceipt },
  );

  return true;
};

export default depositAndApproveEther;
