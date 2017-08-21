import BigNumber from "bignumber.js";

import orderBook from "../fixtures/blockChainOrders";

const instance = {
  orders: jest.fn(
    id =>
      new Promise(resolve => {
        resolve(orderBook.find(o => o.id === id).data);
      }),
  ),
  takeOrder: jest.fn(
    (/* exchange, id, quantity, objects */) =>
      new Promise(resolve => {
        resolve({ transactionHash: "0xBLUB" });
      }),
  ),
  make: jest.fn(
    () => new Promise(resolve => resolve({ logs: [{ args: { id: 1 } }] })),
  ),
  balanceOf: jest.fn(
    (/* ofAddress */) =>
      new Promise(resolve => {
        resolve(new BigNumber(10000000000000000000));
      }),
  ),
  totalSupply: jest.fn(
    () =>
      new Promise(resolve => {
        resolve(new BigNumber(1000000000000000000000));
      }),
  ),
  transfer: jest.fn(
    (/* toAddress, quantity { from: fromAddress } */) =>
      new Promise(resolve => {
        resolve({ logs: [{ event: "Transfer", args: { id: 1 } }] });
      }),
  ),
  approve: jest.fn(
    (/* toAddress, quantity, { from: fromAddress } */) =>
      new Promise(resolve => {
        resolve({ logs: [{ event: "Approval", args: { id: 1 } }] });
      }),
  ),
  transferFrom: jest.fn(
    (/* fromAddress, toAddress, quantity */) =>
      new Promise(resolve => {
        resolve({ logs: [{ event: "Transfer", args: { id: 1 } }] });
      }),
  ),
  allowance: jest.fn(
    (/* ownerAddress, spenderAddress */) =>
      new Promise(resolve => {
        resolve(new BigNumber(6000000000000000000));
      }),
  ),
  /* universe methods */
  /* **************** */
  numAssignedAssets: jest.fn(
    () => new Promise(resolve => resolve(new BigNumber(10))),
  ),
  getMelonAsset: jest.fn(() => new Promise(resolve => resolve("0xMLN"))),
  getReferenceAsset: jest.fn(() => new Promise(resolve => resolve("0xETH"))),
  assetAt: jest.fn(i => new Promise(resolve => resolve(`0xTOKEN_${i}`))),
  exchangeAt: jest.fn(() => new Promise(resolve => resolve("0xEXCHANGE"))),
  priceFeedAt: jest.fn(() => new Promise(resolve => resolve("0xPRICEFEED"))),
  createVault: jest.fn(
    () =>
      new Promise(resolve =>
        resolve({ logs: [{ event: "VaultAdded", args: { id: 1 } }] }),
      ),
  ),
  getVault: jest.fn(
    () =>
      new Promise(resolve =>
        resolve([
          "0xVAULT",
          "0xUSER",
          "TESTFUND",
          "MLN-T",
          new BigNumber(18),
          true,
          123,
        ]),
      ),
  ),
};

const contract = {
  setProvider: jest.fn(),
  at: jest.fn(() => instance),
  deployed: jest.fn(() => instance),
};

const constructor = jest.fn(() => contract);
constructor.mockInspect = { instance, contract };

export default constructor;
