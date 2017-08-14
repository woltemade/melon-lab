const setup = {
  init({ web3, daemonAddress }) {
    this.web3 = web3;
    this.currentProvider = web3.currentProvider;
    this.daemonAddress = daemonAddress;
  },
};

export default setup;
