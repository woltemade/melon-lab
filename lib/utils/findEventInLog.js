// @flow
import ensure from "./ensure";

const findEventInLog = (nameOrIndex: string | number, receipt: Object) => {
  ensure(
    receipt && receipt.logs && receipt.logs.length,
    "No transaction logs found in receipt",
    { nameOrIndex, receipt },
  );
  return typeof nameOrIndex === "string"
    ? receipt.logs.find(l => l.event === nameOrIndex)
    : receipt.logs[nameOrIndex];
};

export default findEventInLog;
