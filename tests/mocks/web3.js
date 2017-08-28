const instance = {
  version: {
    network: 42,
  },
  eth: {
    accounts: ["0xUSER"],
    getBlockNumber: callback => callback(null, 333333333333),
  },
};

const constructor = jest.fn(() => instance);

export default constructor;
