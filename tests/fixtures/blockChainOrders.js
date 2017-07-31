import BigNumber from "bignumber.js";

const orders = [
  {
    id: 6870,
    data: [
      new BigNumber("8555051760000000000"),
      "0x64aF87A36a407732320c4dc1852dEBC60cd81c5E", // REP-T
      new BigNumber("1000000000000000000"),
      "0x1a825E9bF3BdC8ef8B975F97c78b5208a947d0EC", // ETH-T
      123,
      "0xDAEMON",
      true,
    ],
  },
  {
    id: 1,
    data: [
      new BigNumber(1 * 10 ** 18),
      "0x2a20ff70596e431ab26C2365acab1b988DA8eCCF", // MLN-T
      new BigNumber(0.3 * 10 ** 18),
      "0x1a825E9bF3BdC8ef8B975F97c78b5208a947d0EC", // ETH-T
      123,
      "0xDAEMON",
      true,
    ],
  },
  {
    id: 2,
    data: [
      new BigNumber(1 * 10 ** 18),
      "0x2a20ff70596e431ab26C2365acab1b988DA8eCCF", // MLN-T
      new BigNumber(0.4 * 10 ** 18),
      "0x1a825E9bF3BdC8ef8B975F97c78b5208a947d0EC", // ETH-T
      123,
      "0xDAEMON",
      true,
    ],
  },
];

export default orders;
