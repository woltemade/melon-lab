import BigNumber from "bignumber.js";

export const toBigNumber = value => new BigNumber(value || 0);

export const multiply = (base, ...args) =>
  args.reduce((acc, current) => acc.times(current), toBigNumber(base));

export const add = (base, ...args) =>
  args.reduce((acc, current) => acc.add(current), toBigNumber(base));

export const divide = (base, ...args) =>
  args.reduce((acc, current) => acc.div(current), toBigNumber(base));

export const isZero = number => toBigNumber(number).eq(0);
