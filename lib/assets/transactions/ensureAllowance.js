// @flow
import BigNumber from "bignumber.js";
import getAllowance from "../calls/getAllowance";
import approve from "../transactions/approve";

const ensureAllowance = async (
  symbol: string,
  owner: string,
  spender: string,
  quantity: BigNumber,
) => {
  const current = await getAllowance(symbol, owner, spender);
  const missing = quantity.minus(current);
  const approved = await approve(symbol, spender, missing, owner);
  return approved ? missing : false;
};

export default ensureAllowance;
