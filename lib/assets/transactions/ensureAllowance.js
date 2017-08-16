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
  return approve(symbol, spender, missing, { from: owner });
};

export default ensureAllowance;
