import contract from "truffle-contract";
import EtherTokenJson from "@melonproject/protocol/build/contracts/EtherToken.json";

import setup from "../../utils/setup";
import ensure from "../../utils/ensure";
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
  tokenAddress,
) => {
  const processableQuantity = toProcessable(quantity, tokenAddress);
  const EtherToken = contract(EtherTokenJson);
  EtherToken.setProvider(setup.currentProvider);
  const etherTokenContract = EtherToken.at(getAddress("ETH-T"));

  const depositArgs = {
    from: fromAddress,
    value: processableQuantity,
  };
  const depositGasEstimation = await etherTokenContract.deposit.estimateGas(
    depositArgs,
  );
  depositArgs.gas = Math.ceil(depositGasEstimation * 1.5);
  const depositReceipt = await etherTokenContract.deposit(depositArgs);

  const depositLogEntry = findEventInLog("Deposit", depositReceipt);
  ensure(
    processableQuantity.eq(depositLogEntry.args.amount),
    "Deposited amount inequal requested quantity",
    { depositReceipt },
  );

  const approveArgs = [toBeApprovedAddress, processableQuantity];
  const approveGasEstimation = await etherTokenContract.approve.estimateGas(
    ...approveArgs,
  );
  approveArgs.push({
    from: fromAddress,
    gas: approveGasEstimation,
  });
  const approveReceipt = await etherTokenContract.approve(...approveArgs);

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
