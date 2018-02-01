import BigNumber from "bignumber.js";

const displayNumber = number =>
  number === "..." ? "..." : new BigNumber(number || 0).toFixed(4);

export default displayNumber;
