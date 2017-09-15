import Web3 from "web3";
import rawEvents from "../fixtures/dataUpdatedEvents";

let firstTimeout;
let secondTimeout;

const instance = {
  version: {
    network: 42,
  },
  eth: {
    accounts: ["0xUSER"],
    getBlockNumber: callback => callback(null, 333333333333),
    filter: jest.fn(() => ({
      watch: jest.fn(callback => {
        global.clearTimeout(firstTimeout);
        global.clearTimeout(secondTimeout);
        firstTimeout = global.setTimeout(() => {
          callback(null, rawEvents[0]);
        }, 50);
        secondTimeout = global.setTimeout(() => {
          callback(null, rawEvents[1]);
        }, 100);
      }),
      stopWatching: jest.fn(() => {
        global.clearTimeout(firstTimeout);
        global.clearTimeout(secondTimeout);
      }),
    })),
  },
  BigNumber: new Web3().BigNumber,
};

const constructor = jest.fn(() => instance);

export default constructor;
