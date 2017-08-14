const instance = {
  version: {
    network: 42,
  },
  accounts: ["0xUSER"],
};

const constructor = jest.fn(() => instance);

export default constructor;
