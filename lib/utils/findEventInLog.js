// @flow
import ensure from "./ensure";

const findEventInLog = (
  nameOrIndex: string | number,
  receipt: Object,
  message: string = "No transaction logs found in receipt",
) => {
  ensure(
    !!(receipt && receipt.logs && receipt.logs.length),
    "Transaction has no logs at all.",
    {
      nameOrIndex,
      receipt,
    },
  );

  const log =
    typeof nameOrIndex === "string"
      ? receipt.logs.find(l => l.event === nameOrIndex)
      : receipt.logs[nameOrIndex];

  ensure(!!log, message, {
    nameOrIndex,
    receipt,
  });

  return log;
};

export default findEventInLog;
