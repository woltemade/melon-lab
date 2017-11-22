import contract from "truffle-contract";
import EtherTokenJson from "@melonproject/protocol/build/contracts/EtherToken.json";

import setup from "../../utils/setup";
import ensure from "../../utils/generic/ensure";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import getAddress from "../../assets/utils/getAddress";
import toProcessable from "../../assets/utils/toProcessable";
import gasBoost from "../../utils/ethereum/gasBoost";

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
  const EtherToken = contract(EtherTokenJson);
  EtherToken.setProvider(setup.currentProvider);
  const etherTokenContract = EtherToken.at(getAddress("ETH-T"));

  const depositReceipt = await gasBoost(etherTokenContract.deposit, [], {
    from,
    value: processableQuantity,
  });

  const depositLogEntry = findEventInLog("Deposit", depositReceipt);
  ensure(
    processableQuantity.eq(depositLogEntry.args.amount),
    "Deposited amount inequal requested quantity",
    { depositReceipt },
  );

  const approveArgs = [toBeApprovedAddress, processableQuantity];
  const approveReceipt = await gasBoost(
    etherTokenContract.approve,
    approveArgs,
    { from },
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
