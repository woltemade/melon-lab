// @flow

const findEventInLog = (nameOrIndex: string | number, receipt: Object) => {
  if (!receipt || !receipt.logs || !receipt.logs.length)
    throw new Error(
      `No transaction logs found in receipt: ${JSON.stringify(receipt)}`,
    );
  return typeof nameOrIndex === "string"
    ? receipt.logs.find(l => l.event === nameOrIndex)
    : receipt.logs[nameOrIndex];
};

export default findEventInLog;
