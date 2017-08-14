const instance = {
  version: {
    network: 42,
  },
  eth: {
    accounts: ["0xUSER"],
  },
};

const constructor = jest.fn(() => instance);

export default constructor;
