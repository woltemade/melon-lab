import Web3 from "web3";
import rawEvents from "../fixtures/dataUpdatedEvents";

let firstTimeout;
let secondTimeout;

const instance = {
  networkId: 42,
  eth: {
    accounts: ["0xMANAGER"],
    getBlock: jest.fn((block, callback) =>
      callback(null, { number: 333333333333, gasLimit: 6986338 }),
    ),
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
